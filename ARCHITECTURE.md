# Architecture

## Principy

Projekt je statická webová aplikace bez frameworku, backendu, databáze a externí runtime služby. Příběhový obsah zůstává datově řízený a bezpečně deklarativní.

~~~text
story-data.js
   -> game-engine.js -> ui.js -> index.html
   -> narrative-resolver.js
   -> chapter-five-outcome.js (Chapter V Basil outcome single source of truth)
   -> chapter-six-outcome.js (Chapter VI direct final outcome resolver)
game-state.js -> localStorage
~~~

## Příběhová data

js/story-data.js exportuje objekt STORY_DATA:

- chapters obsahují metadata dostupných i plánovaných kapitol;
- playable kapitola má available: true a firstScene;
- plánovaná kapitola může mít available: false a žádné scény;
- scenes obsahují text, typ, volby, podmínky a přechody;
- choices mají effects, nextScene a volitelný requires; narativní scény mohou mít idempotentní entry effects;
- scene requirements mohou vyžadovat dokončené choice-history v určených scénách;
- teacherNotes obsahují cíle a odlišení předlohy od herního rozšíření;
- žádná data nespouštějí JavaScript.

Chapter II je od Milestone 2C playable. Chapter III je playable od Milestone 3C a obsahuje přesně devět schválených scén `c3-*`; Chapter IV je playable od Milestone 4C a obsahuje přesně devět shared-spine scén `c4-*` a čtyři rozhodovací body. Chapter V je playable a obsahuje přesně deset shared-spine scén `c5-*` a čtyři rozhodovací body. Její entry vyžaduje dokončenou Chapter IV, `portraitLocation = "locked-schoolroom"`, `portraitStageUnlock = "stage-4"` a validní existující handoff facts. Stage 5 se idempotentně odemyká při vstupu do `c5-basil-sees`; Chapter V po dokončení zapisuje pouze `basilOutcome`. Chapter VI má foundation metadata `status: "in-preparation"`, `available: false`, bez `firstScene` a bez runtime scén; její story flow zůstává mimo playable runtime. Stage 3 portrait, Dorian's house a secret-room P0 visuals jsou integrovány deklarativně podle kontextu scény; Chapter V používá secret-room asset pouze před revealem a po revealu bezpečný fallback.

## Stav hráče a migrace

Aktuální stav má verzi 2:

~~~js
{
  version: 2,
  sceneId: "c1-opening",
  activeChapterId: "chapter-1",
  reputation: 0,
  conscience: 0,
  portrait: 0,
  flags: {},
  storyFacts: {
    sibylRelationship: null,
    sibylOutcome: null,
    c2FinalResponse: null,
    portraitLocation: null,
    basilSuspicion: null,
    portraitStageUnlock: null,
    yellowBookResponse: null,
    basilOutcome: null,
    chapterSixOutcome: null
  },
  choices: [],
  visitedScenes: [],
  completedChapters: {},
  startedAt: "...",
  updatedAt: "...",
  chapterComplete: false
}
~~~

game-state.js:

- zapisuje nové pozice pod klíčem dorian-gray-portrait-secret-save-v2;
- stále čte původní dorian-gray-portrait-secret-save-v1;
- při načtení v1 vrací bezpečně normalizovaný stav v2;
- při migraci nemaže legacy save;
- zachovává hodnoty, flags, choice history a visited scenes;
- poškozené nebo nekompatibilní pozice vrací jako null;
- clearState odstraní v2 i legacy klíč.

chapterComplete je stav aktuální scény, zatímco completedChapters je persistentní mapa dokončení jednotlivých kapitol. Tím se dokončení Chapter I nepřenese automaticky na budoucí kapitolu.

## Engine

game-engine.js poskytuje:

- kontrolu vstupních podmínek scén a dostupnosti kapitoly;
- applyEffects pro existující Reputation, Conscience, Portrait, boolean flags a allow-listed story facts;
- zpracování choice history;
- vstup do scény s aktualizací activeChapterId;
- aplikaci deklarativních scene entry effects při vstupu do scény;
- požadavky `requiredChoiceScenes` pro explicitní dokončení předchozích rozhodovacích bodů;
- samostatné označení dokončené kapitoly;
- startNewGame pro obecný chapterId;
- continueToChapter jako mechanismus handoffu po dokončení předchozí kapitoly;
- resolveChapterTwoOutcome, který při vstupu do poslední scény zapíše schválený vztah a výsledek do storyFacts;
- chapterRequirementsMet pro dokončené kapitoly a vyřešené story facts;
- getChapterStart, isChapterAvailable, isChapterComplete a nextChapterAfter;
- stabilní `portraitStageForValue` s prahy 0, 1 a 2–3;
- logický Stage 3, Stage 4, Stage 5 nebo připravený Stage 6 z `storyFacts.portraitStageUnlock`, bez požadavku na numeric Portrait threshold.

Chapter II je dostupná pouze po `completedChapters["chapter-1"] === true`; Chapter III stejným mechanismem vyžaduje dokončenou Chapter II a vyřešené `sibylRelationship`, `sibylOutcome` a `c2FinalResponse`. `canStartChapter` i `meetsRequirements` podporují přesné allow-listed story-fact požadavky. Chapter II ending nabízí bezpečný přechod do Chapter III a její ending už nepřesměrovává do neexistující Chapter IV. Chapter IV vyžaduje dokončenou Chapter III a všech pět schválených handoff facts. Její Stage 4 event je universal entry effect po čtyřech Chapter IV decisions; není řízen numeric hodnotami ani derived profilem. Chapter IV ending ponechává `activeChapterId = "chapter-4"`. Chapter V používá jeden sdílený flow, jehož final choice nejprve zapíše choice history a poté přes `chapterFiveBasilOutcome(state)` zapíše přesně jeden `basilOutcome`. `c5-after-the-door` dokončuje Chapter V a její warning je pouze pro `dead-canonical`.

## Persistent story facts

storyFacts jsou oddělená od číselných hodnot osobnosti. Aktuální allow-listy jsou:

~~~js
storyFacts: {
  sibylRelationship: "role-first" | "mixed" | "person-first" | null,
  sibylOutcome: "dead-canonical" | "alive-estranged" | "alive-together" | null,
  c2FinalResponse: "cruel" | "listen" | "delay" | null,
  portraitLocation: "locked-schoolroom" | null,
  basilSuspicion: "uneasy" | "suspects" | "clear" | null,
  portraitStageUnlock: "stage-3" | "stage-4" | "stage-5" | "stage-6" | null,
  yellowBookResponse: "accepted" | "questioned" | "escape" | null,
  basilOutcome: "dead-canonical" | "alive-separated" | "alive-helping" | null,
  chapterSixOutcome: "portrait-destroyed" | "truth-faced" | "secret-kept" | null
}
~~~

Normalizace přijímá pouze uvedené hodnoty. Neznámé klíče a hodnoty se nepřenášejí. Chapter II zapisuje `c2FinalResponse` při posledním rozhodnutí a následně deterministicky vypočítá `sibylRelationship` a `sibylOutcome`.

## Conditional narrative

narrative-resolver.js obsahuje čisté funkce:

- matchesNarrativeCondition podporuje deklarované podmínky flag, choice, storyFact, minReputation, minConscience, minPortrait, behaviourProfile, all, any a not;
- resolveSceneParagraphs vrací základní odstavce a deklarativní conditionalText;
- podmíněný text nikdy nemění stav;
- neznámé podmínky jsou false;
- neexistuje eval, Function ani dynamické spouštění kódu.

`chapterFourBehaviourProfile(state)` je čistý derived resolver mimo save data. Čte pouze choice history, používá centrální classification contract pro 12 budoucích Chapter IV IDs a vrací přesně `self-examining`, `divided` nebo `pleasure-as-escape`. Chapter IV používá profile pouze pro krátkou conditional prose; nevytváří další route chain ani persistent fact.

Chapter V používá stejný deklarativní mechanismus pro krátkou kontinuitu `basilSuspicion`, `sibylOutcome`, `yellowBookResponse` a `behaviourProfile`; tyto varianty nemění choices, Stage 5 ani Basil outcome.

Datový příklad:

~~~js
conditionalText: [
  {
    when: { flag: "heardHenry" },
    text: "Henry's voice returns to you."
  }
]
~~~

## Content warning foundation

Stejný resolver podporuje volitelný scene.contentWarning:

~~~js
contentWarning: {
  title: "Content note",
  message: "A factual, non-graphic warning.",
  canSkip: true
}
~~~

UI drží volbu continue, skip nebo pause pouze v paměti. Není zapisována do game state:

- continue zobrazí celý text;
- skip vynechá pouze segmenty označené sensitive;
- pause vrátí hráče na titulní obrazovku bez změny postupu;
- při návratu na scénu se warning zobrazí znovu.

Chapter II používá warning pouze pro větev `dead-canonical`; Chapter V používá stejnou infrastrukturu na `c5-after-the-door` až po vyřešení `basilOutcome`. Text tedy neoznamuje osud předem. Skip odstraní jen označený citlivý přechod a ponechá základní fakt o výsledku.

## Chapter-aware UI

Domovská obrazovka vykresluje story map z STORY_DATA.chapters. Po dokončení předchozí kapitoly a splnění jejích story facts se v ending summary objeví další schválený handoff. Teacher mode čte aktivní kapitolu a pro Chapter III, Chapter IV i Chapter V zobrazuje scénovou mapu, rozhodnutí, výukové cíle, slovní zásobu, porozumění, diskusi, kontinuitu a rozlišení kanonu od alternativ.

## Portrét

Portrétní systém zůstává nezměněn:

- Portrait 0 → stage 0;
- Portrait 1 → stage 1;
- Portrait 2–3 → stage 2.

Pokud `storyFacts.portraitStageUnlock` obsahuje `"stage-3"`, `"stage-4"`, `"stage-5"` nebo `"stage-6"`, `portraitStage(state)` vrátí odpovídající logický Stage nezávisle na numeric Portrait. Stage 4 používá `portrait-dorian-stage-4.webp` a Stage 5 používá schválený `portrait-dorian-stage-5.webp`; Stage 6 má v této foundation pouze logický stav a bezpečný CSS fallback bez artworku. Numeric Portrait zůstává samostatnou pressure/context hodnotou a sám Stage 3 až Stage 6 neodemkne.

Chapter II nemá nový obrazový soubor ani nový threshold. Chapter III a Chapter IV používají house asset v domácích scénách a secret-room asset ve scénách staré školní místnosti; samotný Portrait nikdy neurčuje SibylOutcome. Chapter IV Stage 4 a Chapter V Stage 5 jsou skutečné runtime WebP assety s bezpečným fallbackem. Chapter V používá logickou hodnotu Stage 5 při univerzálním witness eventu `c5-basil-sees`; Basilův pohled pouze odhaluje již nashromážděné poškození a není jeho příčinou.

## Implementace Chapter V

Chapter V (`The Confrontation`) je v `STORY_DATA.chapters` vedená jako `status: "playable"`, `available: true` a `firstScene: "c5-fog-at-the-door"`. Obsahuje přesně deset scén, čtyři decisions a jeden shared spine. Entry contract vyžaduje:

- `completedChapters["chapter-4"] === true`;
- `portraitLocation === "locked-schoolroom"`;
- `portraitStageUnlock === "stage-4"`;
- vyřešené allow-listed hodnoty `basilSuspicion`, `sibylOutcome` a `yellowBookResponse`.

Save v2 nyní bezpečně normalizuje `basilOutcome` jako `null` nebo jednu z hodnot `dead-canonical`, `alive-separated`, `alive-helping`. Staré saves zůstávají kompatibilní. Stage 5 runtime artwork je mapován pouze na `assets/portraits/portrait-dorian-stage-5.webp`; review candidate PNG soubory nejsou runtime assety.

Scéna `c5-basil-sees` je univerzální a idempotentně odemyká Stage 5. Basilův outcome se neřeší dříve než v `c5-final-response`; po záznamu finální choice se vypočítá pouze přes `chapterFiveBasilOutcome(state)`. Všechny cesty končí v `c5-after-the-door`, kde se nastaví `completedChapters["chapter-5"] = true`.

`js/chapter-five-outcome.js` je pure single source of truth pro 12 Chapter V choice IDs. Čte pouze relevantní choice history, používá nejnovější validní záznam pro každé ze čtyř rozhodnutí, při neúplném nebo nevalidním stavu vrací `null` a sám nikdy nemutuje stav. Runtime engine ho volá až po záznamu Decision IV a zapíše přesně jeden persistentní `basilOutcome`.

`js/chapter-six-outcome.js` je foundation single source of truth pro 12 Chapter VI choice IDs. Čte pouze nejnovější validní volbu v každém ze čtyř rozhodnutí a mapuje Decision IV přímo na `truth-faced`, `secret-kept` nebo `portrait-destroyed`; při neúplném stavu vrací `null` a sám nikdy nemutuje state. V tomto milestone není připojený k playable runtime.

## Přidání další kapitoly

1. Přidejte metadata kapitoly s unikátním id a `available`; plánovaná kapitola může bezpečně vynechat `firstScene`, dokud nemá runtime scény.
2. Nastavte requiresCompletedChapters.
3. Přidejte scény s chapterId a unikátními ID.
4. Propojte nextScene nebo deklarativní podmínky.
5. Přidejte teacherNotes, glossary a obsahová upozornění podle potřeby.
6. Přidejte migrační a branch-consistency testy.
7. Ověřte handoff, save/restore a všechny deklarované branch kombinace.
