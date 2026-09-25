# Asset manifest

Katalog eviduje schválené runtime assety i reference-only podklady. Chybějící nebo vadný runtime obraz má stále CSS fallback.

## Nezbytné pro Chapter I

| Soubor | Účel | Poměr / rozlišení | Použití | Konzistence |
| --- | --- | --- | --- | --- |
| `portrait-dorian-stage-0.webp` | základní stav portrétu | 4:5 · 1124 × 1405 | stavový panel po startu kapitoly | stejná kompozice, klidný výraz |
| `portrait-dorian-stage-1.webp` | první narušení portrétu | 4:5 · 1600 × 2000 | při hodnotě `Portrait === 1` | pouze jemná změna, žádná deformace |
| `portrait-dorian-stage-2.webp` | zřetelnější varovný stav | 4:5 · 1600 × 2000 | při hodnotě `Portrait >= 2` | stejný model, světlo a kostým |
| `character-dorian-gray-neutral.webp` | referenční model postavy | 2:3 · 1600 × 2400 | budoucí karta postavy / učitelský režim | shodná identita s portrétem |
| `character-basil-hallward-studio.webp` | referenční Basil | 2:3 · 1600 × 2400 | budoucí detail scény nebo učitelský režim | citlivý malíř, pigment na rukou |
| `character-lord-henry-wotton-studio.webp` | referenční Henry | 2:3 · 1600 × 2400 | budoucí detail scény nebo učitelský režim | uhlazený, šarmantní, ne karikatura |
| `location-basils-studio-evening.webp` | hlavní prostředí kapitoly | 3:2 · 2400 × 1600 | pozadí scén v ateliéru | stejné okno, stojan a zakryté plátno |
| `location-basils-garden-door.webp` | přechod do zahrady | 3:2 · 2400 × 1600 | scéna The Price of Youth | soumrak, růže, návaznost na ateliér |
| `title-portrait-secret.webp` | titulní atmosférický obraz | 16:9 · 2400 × 1350 | úvodní obrazovka | bezpečný prostor pro text uprostřed |

## Chapter II runtime a budoucí kapitoly

### Hlavní postavy

| Soubor | Účel | Poměr / rozlišení | Kapitola |
| --- | --- | --- | --- |
| `character-sibyl-vane-stage.webp` | Sibyl jako herečka | 2:3 · 1024 × 1536 | II |
| `character-sibyl-vane-offstage.webp` | Sibyl mimo jeviště | 2:3 · 1024 × 1536 | II |
| `character-dorian-gray-society.webp` | Dorian ve společnosti | 2:3 · 1600 × 2400 | IV |
| `character-basil-hallward-confrontation.webp` | Basil při konfrontaci | 2:3 · 1600 × 2400 | V |

### Lokace

| Soubor | Účel | Poměr / rozlišení | Kapitola |
| --- | --- | --- | --- |
| `location-victorian-london-rain.webp` | londýnské mezihry | 3:2 · 2400 × 1600 | II–VI |
| `location-theatre-stage.webp` | Sibylino divadlo | 3:2 · 1536 × 1024 | II |
| `location-theatre-backstage.webp` | zákulisí stejného divadla | 3:2 · 1536 × 1024 | II |
| `location-dorians-house.webp` | schválený soukromý interiér | 3:2 · 1536 × 1024 | III–VI |
| `location-secret-room.webp` | schválená stará školní místnost | 3:2 · 1536 × 1024 | III–VI |

### Varianty portrétu

| Soubor | Účel | Poměr / rozlišení | Kapitola |
| --- | --- | --- | --- |
| `portrait-dorian-stage-3.webp` | první jasně znepokojivá změna | 4:5 · 1122 × 1402 | III |
| `portrait-dorian-stage-4.webp` | výrazná stopa života | 4:5 · 1600 × 2000 | IV |
| `portrait-dorian-stage-5.webp` | těsně před konfrontací | 4:5 · 1600 × 2000 | V |
| `portrait-dorian-stage-final.webp` | poslední stav | 4:5 · 1600 × 2000 | VI |

### Pozadí a dekorace

| Soubor | Účel | Poměr / rozlišení | Použití |
| --- | --- | --- | --- |
| `texture-parchment-dark.webp` | jemná textura panelů | 1:1 · 1200 × 1200 | volitelně v modálech a kartách |
| `texture-oil-canvas.webp` | velmi slabá struktura plátna | 1:1 · 1200 × 1200 | portrét a story panel |
| `ornament-victorian-corner.svg` | úsporný rámový detail | podle SVG viewBoxu | titulní a kapitální oddělovače |
| `ornament-gold-rule.svg` | horizontální linka | 8:1 · 800 × 100 | metadata a přechody |

## Napojení do aplikace

Chapter II používá schválené assety v `STORY_DATA.assets.chapterTwo` a deklarativní `scene.visual` mapování. Stage location se používá ve scénách `c2-theatre-lights`, `c2-many-heroines` a `c2-final-performance`; backstage location ve `c2-backstage-choice`; Sibyl stage/off-stage se zobrazují pouze v odpovídajících scénách.

Portréty se přidají do `STORY_DATA.assets.portraitStages`:

```js
portraitStages: {
  0: "assets/portraits/portrait-dorian-stage-0.webp",
  1: "assets/portraits/portrait-dorian-stage-1.webp",
  2: "assets/portraits/portrait-dorian-stage-2.webp",
  3: "assets/portraits/portrait-dorian-stage-3.webp"
}
```

Engine pracuje pouze s číselnou hodnotou `portrait`. UI rozhoduje, zda zobrazí cestu k obrázku, nebo CSS fallback. Formát souboru proto není součástí herních pravidel.

Milestone 3B přidal logickou podporu Stage 3 přes `storyFacts.portraitStageUnlock`; Milestone 3C ji používá po locked-schoolroom eventu. Milestone 3H přidal schválený Stage 3 WebP a dvě Chapter III location WebP. Pokud některý runtime asset chybí nebo selže, viewer, stavový panel i scene image zachovají bezpečný CSS fallback; současné Stage 0–2 cesty zůstávají beze změny. Chapter III nyní používá house asset v domácích scénách a secret-room asset pouze ve školní místnosti a bezprostředním locked-room aftermath.

## Kontrolní pravidla před přidáním obrázku

- ověřit stejnou identitu, kompozici a světelný směr u všech portrétů;
- ověřit bezpečný ořez na desktopu i mobilu;
- nepřidávat vzdálené URL ani generování za běhu;
- aktualizovat tento manifest a zachovat název souboru po publikaci;
- zkontrolovat licenční původ každého podkladu.
