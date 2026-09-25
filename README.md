# The Picture of Dorian Gray: The Portrait's Secret

Statická, offline-capable textová adventura pro výuku angličtiny na úrovni B1. Hráč se ujímá role Doriana Graye, čte připravený příběh v britské angličtině a rozhoduje o svém jednání.

## Spuštění

Projekt nemá žádné závislosti ani build krok. Pro lokální spuštění použijte libovolný statický HTTP server, například:

```powershell
python -m http.server 8000
```

Poté otevřete <http://localhost:8000/>. Aplikace používá ES moduly, proto ji neotevírejte přímo přes `file://`.

## Stav první etapy

Implementováno:

- úvodní obrazovka a hlavní menu;
- plně hratelná Chapter I — *The Beautiful Young Man* se sedmi scénami a třemi hlavními rozhodovacími body;
- plně hratelná Chapter II — *The Actress* s devíti scénami, čtyřmi rozhodnutími a třemi jasně odlišenými výsledky Sibylina příběhu;
- datově řízené scény, volby, podmínky vstupu a přechody;
- hodnoty `Reputation`, `Conscience` a `Portrait`;
- uložení, obnovení a reset hry v `localStorage`;
- glossary podpora pro vybraná slova úrovně B1;
- základní Teacher mode s učebními cíli a vazbou na předlohu;
- responzivní rozhraní, viditelný focus a nastavení omezení animací;
- lokální runtime ilustrace v optimalizovaném formátu WebP pro portréty Doriana, Sibyl a prostředí Chapter II;
- multi-chapter save foundation s migrací v1 → v2;
- samostatné dokončení kapitol a chapter-aware story map;
- allow-listed persistent story facts pro budoucí pokračování;
- deklarativní podmíněné texty a znovupoužitelný content-warning mechanismus.

Text, pravidla, scény i grafické stavy jsou uloženy lokálně v projektu. Aplikace za běhu nepoužívá AI API, účet, databázi ani osobní údaje.

## Struktura

```text
index.html             vstupní HTML dokument
styles.css             vizuální systém a responzivní layout
js/story-data.js       kapitoly, scény, volby, glossary a metadata pro učitele
js/game-state.js       serializovatelný stav hry, migrace a localStorage
js/game-engine.js      pravidla přechodů a změn herního stavu
js/narrative-resolver.js bezpečné podmíněné texty a content warnings
js/ui.js               vykreslení obrazovek a obsluha událostí
tests/*.test.js        automatické regresní testy příběhu, save formátu, assetů a UI modelů
assets/README.md       pravidla pro runtime a reference-only obrazové podklady
favicon.svg            lokální favicon bez externí závislosti
ARCHITECTURE.md        technický návrh
STORY_DESIGN.md        literární a herní návrh
VISUAL_BIBLE.md        jednotný výtvarný směr
ASSET_MANIFEST.md      katalog plánovaných obrazových podkladů
```

## Ověření

Základní kontrola JavaScriptu:

```powershell
node --check js/story-data.js
node --check js/game-state.js
node --check js/game-engine.js
node --check js/ui.js
node --test tests/*.test.js
```

Regresní testy ověřují všech osm kombinací Chapter I, všech 288 kombinací Chapter I + II, tři výsledky Sibylina příběhu, migraci v1 → v2, samostatné dokončení kapitol, storyFacts, podmíněné texty, content warnings, gated scény, validitu přechodů, slovníček, portrétní prahy a poškozené nebo nekompatibilní save soubory. Chapter III není součástí tohoto milníku ani unlock flow.

## Další milník

Navazujícím milníkem je návrh a schválení Chapter III. Tento release končí po uzavření celého oblouku Sibyl v Chapter II.
