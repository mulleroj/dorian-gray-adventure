# Architecture

## Principy

Projekt je statická webová aplikace bez frameworku, backendu, databáze a externí runtime služby. Příběhový obsah zůstává datově řízený a bezpečně deklarativní.

~~~text
story-data.js
   -> game-engine.js -> ui.js -> index.html
   -> narrative-resolver.js
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

Chapter II je od Milestone 2C playable. Chapter III je playable od Milestone 3C a obsahuje přesně devět schválených scén `c3-*`; Chapter IV je playable od Milestone 4C a obsahuje přesně devět shared-spine scén `c4-*` a čtyři rozhodovací body. Stage 3 portrait, Dorian's house a secret-room P0 visuals jsou integrovány deklarativně podle kontextu scény; Chapter IV znovu používá existující house a secret-room assets.

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
    yellowBookResponse: null
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
- logický Stage 3 nebo Stage 4 z `storyFacts.portraitStageUnlock`, bez požadavku na numeric Portrait threshold.

Chapter II je dostupná pouze po `completedChapters["chapter-1"] === true`; Chapter III stejným mechanismem vyžaduje dokončenou Chapter II a vyřešené `sibylRelationship`, `sibylOutcome` a `c2FinalResponse`. `canStartChapter` i `meetsRequirements` podporují přesné allow-listed story-fact požadavky. Chapter II ending nabízí bezpečný přechod do Chapter III a její ending už nepřesměrovává do neexistující Chapter IV. Chapter IV vyžaduje dokončenou Chapter III a všech pět schválených handoff facts. Její Stage 4 event je universal entry effect po čtyřech Chapter IV decisions; není řízen numeric hodnotami ani derived profilem. Chapter IV ending ponechává `activeChapterId = "chapter-4"` a nepřidává Chapter V metadata.

## Persistent story facts

storyFacts jsou oddělená od číselných hodnot osobnosti. Aktuální allow-listy jsou:

~~~js
storyFacts: {
  sibylRelationship: "role-first" | "mixed" | "person-first" | null,
  sibylOutcome: "dead-canonical" | "alive-estranged" | "alive-together" | null,
  c2FinalResponse: "cruel" | "listen" | "delay" | null,
  portraitLocation: "locked-schoolroom" | null,
  basilSuspicion: "uneasy" | "suspects" | "clear" | null,
  portraitStageUnlock: "stage-3" | "stage-4" | null,
  yellowBookResponse: "accepted" | "questioned" | "escape" | null
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

Budoucí datový příklad:

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

Chapter II používá warning pouze pro větev `dead-canonical`; jeho podmínka se vyhodnotí až po vyřešení výsledku. Text tedy neoznamuje osud předem. Skip odstraní jen označený citlivý segment a ponechá základní fakt o výsledku.

## Chapter-aware UI

Domovská obrazovka vykresluje story map z STORY_DATA.chapters. Po dokončení předchozí kapitoly a splnění jejích story facts se v ending summary objeví další schválený handoff. Teacher mode čte aktivní kapitolu a pro Chapter III i Chapter IV zobrazuje scénovou mapu, rozhodnutí, výukové cíle, slovní zásobu, porozumění, diskusi, kontinuitu a rozlišení kanonu od alternativ.

## Portrét

Portrétní systém zůstává nezměněn:

- Portrait 0 → stage 0;
- Portrait 1 → stage 1;
- Portrait 2–3 → stage 2.

Pokud `storyFacts.portraitStageUnlock === "stage-4"`, `portraitStage(state)` vrátí logický Stage 4; při `"stage-3"` vrátí Stage 3, v obou případech nezávisle na numeric Portrait. Stage 4 nyní používá schválený `portrait-dorian-stage-4.webp`; při chybějícím nebo vadném obrazu viewer, stavový panel i scene image bezpečně použijí CSS fallback. Numeric Portrait zůstává samostatnou pressure/context hodnotou a sám Stage 3 ani Stage 4 neodemkne.

Chapter II nemá nový obrazový soubor ani nový threshold. Chapter III a Chapter IV používají house asset v domácích scénách a secret-room asset ve scénách staré školní místnosti; samotný Portrait nikdy neurčuje SibylOutcome. Chapter IV Stage 4 je skutečný runtime WebP s bezpečným fallbackem.

## Přidání další kapitoly

1. Přidejte metadata kapitoly s unikátním id a `available`; plánovaná kapitola může bezpečně vynechat `firstScene`, dokud nemá runtime scény.
2. Nastavte requiresCompletedChapters.
3. Přidejte scény s chapterId a unikátními ID.
4. Propojte nextScene nebo deklarativní podmínky.
5. Přidejte teacherNotes, glossary a obsahová upozornění podle potřeby.
6. Přidejte migrační a branch-consistency testy.
7. Ověřte handoff, save/restore a všechny deklarované branch kombinace.
