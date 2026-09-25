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
- choices mají effects, nextScene a volitelný requires;
- teacherNotes obsahují cíle a odlišení předlohy od herního rozšíření;
- žádná data nespouštějí JavaScript.

Chapter II je od Milestone 2C playable. Obsahuje přesně devět schválených scén `c2-*`; Chapter III ani její unlock flow v tomto milníku neexistují.

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
    c2FinalResponse: null
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
- applyEffects pro existující Reputation, Conscience, Portrait a boolean flags;
- zpracování choice history;
- vstup do scény s aktualizací activeChapterId;
- samostatné označení dokončené kapitoly;
- startNewGame pro obecný chapterId;
- continueToChapter jako mechanismus handoffu po dokončení předchozí kapitoly;
- resolveChapterTwoOutcome, který při vstupu do poslední scény zapíše schválený vztah a výsledek do storyFacts;
- getChapterStart, isChapterAvailable, isChapterComplete a nextChapterAfter;
- stabilní portraitStageForValue s prahy 0, 1 a 2–3.

Chapter II je dostupná pouze po `completedChapters["chapter-1"] === true`; přímý vstup do jejích scén je stejným pravidlem blokovaný. Po dokončení Chapter II už engine žádný další chapter handoff nenabízí.

## Persistent story facts

storyFacts jsou oddělená od číselných hodnot osobnosti. V Milestone 2B jsou připravené allow-listy:

~~~js
storyFacts: {
  sibylRelationship: "role-first" | "mixed" | "person-first" | null,
  sibylOutcome: "dead-canonical" | "alive-estranged" | "alive-together" | null,
  c2FinalResponse: "cruel" | "listen" | "delay" | null
}
~~~

Normalizace přijímá pouze uvedené hodnoty. Neznámé klíče a hodnoty se nepřenášejí. Chapter II zapisuje `c2FinalResponse` při posledním rozhodnutí a následně deterministicky vypočítá `sibylRelationship` a `sibylOutcome`.

## Conditional narrative

narrative-resolver.js obsahuje čisté funkce:

- matchesNarrativeCondition podporuje pouze deklarované podmínky flag, choice, storyFact, minReputation, minConscience, minPortrait, all, any a not;
- resolveSceneParagraphs vrací základní odstavce a deklarativní conditionalText;
- podmíněný text nikdy nemění stav;
- neznámé podmínky jsou false;
- neexistuje eval, Function ani dynamické spouštění kódu.

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

Domovská obrazovka vykresluje story map z STORY_DATA.chapters. Po dokončení Chapter I se v ending summary objeví handoff do Chapter II; na začátku Chapter II je tato kapitola playable. Teacher mode čte aktivní kapitolu a pro Chapter II zobrazuje všech devět scén, čtyři rozhodnutí, výukové cíle, slovní zásobu, diskusi a rozlišení kanonu od alternativ.

## Portrét

Portrétní systém zůstává nezměněn:

- Portrait 0 → stage 0;
- Portrait 1 → stage 1;
- Portrait 2–3 → stage 2.

Chapter II nemá nový obrazový soubor ani nový threshold. StoryFacts mohou být použity v pozdější Chapter III, ale samotný Portrait nikdy neurčuje SibylOutcome.

## Přidání další kapitoly

1. Přidejte metadata kapitoly s unikátním id, available a firstScene.
2. Nastavte requiresCompletedChapters.
3. Přidejte scény s chapterId a unikátními ID.
4. Propojte nextScene nebo deklarativní podmínky.
5. Přidejte teacherNotes, glossary a obsahová upozornění podle potřeby.
6. Přidejte migrační a branch-consistency testy.
7. Teprve po schválení implementujte vlastní příběhové scény.
