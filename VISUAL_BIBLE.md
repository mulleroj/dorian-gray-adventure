# Visual Bible

## 1. Výtvarný směr

**Victorian Gothic · Dark Academia · classical oil painting · candlelight**

Hra má působit jako stránka z elegantního, lehce znepokojivého románu. Obrazový svět je realistický a materiálový: olejová malba, plátno, dřevo, staré sklo, pergamen, samet a měkké světlo svíček. Atmosféra vzniká světlem, kompozicí a tichem, ne herními efekty.

Vyhnout se:

- generickému fantasy vzhledu, magickým částicím a herním HUD prvkům;
- komiksové kresbě, anime proporcím a fotorealistickému AI looku;
- moderním oděvům, elektrickému osvětlení a současným interiérům;
- přehnanému hororu, krvi a monstrózním deformacím portrétu.

Alternativní herní události mohou být vizuálně znepokojivé, ale musí zůstat uvěřitelné v rámci viktoriánského literárního dramatu.

## 2. Barevná paleta

| Účel | Název | HEX | Použití |
| --- | --- | --- | --- |
| základ | Ink night | `#100D14` | pozadí aplikace |
| panel | Plum panel | `#211B25` | karty, modály, stavové panely |
| druhý panel | Aubergine light | `#2C2330` | hover a zvýraznění |
| primární akcent | Antique gold | `#C9A969` | rámečky, metadatové prvky, indikátory |
| světlý akcent | Candle gold | `#E4C887` | nadpisy a focus |
| atmosféra | Dried wine | `#703E4F` | linky, varovné prvky, hlubší akcent |
| text | Warm ivory | `#F4EAD8` | hlavní text |
| sekundární text | Dusty parchment | `#AD9F97` | popisy a podpůrný text |
| utlumený text | Ash mauve | `#756A6E` | metadata a méně důležité poznámky |

Zlatá je úsporný akcent, ne výplň celého rozhraní. Červenofialová označuje napětí, nikoli automaticky „zlo“.

## 3. Typografie

- Nadpisy: dostupné systémové `Georgia`, fallback `Times New Roman`, serif; velké, vzdušné, s lehce literárním kontrastem.
- Běžný text: `Georgia`, fallback `Times New Roman`, serif; pohodlné řádkování a délka řádku přibližně 60–75 znaků.
- Metadata a ovládací prvky: systémové sans-serif písmo, malé kapitálky a zvýšené proložení.
- Písmo se nesmí načítat z externí služby v běhové aplikaci. Pokud bude potřeba přesná typografie, vloží se licencované lokální soubory do `assets/fonts/`.
- Minimální běžná velikost textu je 16 px; pomocný text může mít 11–13 px pouze tehdy, pokud nenese hlavní význam.

## 4. Hlavní postavy

### Dorian Gray

Mladý muž s jemnými rysy, světlou pletí, tmavými vlnitými vlasy a otevřeným, ale pozorným výrazem. Jeho oděv je elegantní a relativně jednoduchý; obraz musí působit mladistvě, ne jako fantasy princ. V první kapitole se jeho tvář nemění. Proměna patří portrétu, ne živé postavě.

### Basil Hallward

Citlivý viktoriánský malíř, mírně starší než Dorian. Praktický tmavý oděv, stopy pigmentu na rukou, soustředěný pohled a ochranné držení těla. Jeho studio má být teplé a hmatatelné, jeho obava z Henryho spíše tichá než teatrální.

### Lord Henry Wotton

Vysoký, dokonale upravený muž s klidným postojem, světlým úsměvem a očima, které si všímají reakce druhých. Oděv je uhlazenější než Basilův. Nemá působit jako padouch; jeho nebezpečí spočívá v šarmu, přesnosti a pohodlné jistotě.

### Budoucí postavy

Sibyl Vane, Dorianovi známí a další postavy musí zachovat stejnou dobovou materiálovost, střídmou mimiku a realistické proporce. Každá postava má mít jeden snadno rozpoznatelný detail, ne karikaturu.

## 5. Prostředí a ilustrace

- **Basilův ateliér:** vysoká okna, malířské stojany, zakryté plátno, dřevěná podlaha, skvrny od barvy; teplé světlo vlevo, tmavší kout vpravo.
- **Zahradní dveře:** růže a soumrak jako lákavý přechod mezi bezpečím ateliéru a Henryho vlivem.
- **Viktoriánský Londýn:** kouř, mokrý kámen, kočáry a světla v dálce; žádná přeplněná fantasy panoramata.
- **Tajná místnost a Dorianův dům:** až v pozdějších kapitolách, vždy s motivem zakrytí, zrcadla nebo uzamčeného pohledu.

Kompozice má ponechávat klidný prostor pro textové překrytí. Neumisťovat hlavní obličej nebo důležitý předmět pod místo, kde může být v aplikaci nadpis.

## 6. Poměry stran a technické parametry

| Typ podkladu | Poměr | Doporučené rozlišení | Poznámka |
| --- | --- | --- | --- |
| scéna / prostředí | 3:2 | 2400 × 1600 | desktop a ořez pro tablet |
| titulní obraz | 16:9 | 2400 × 1350 | bezpečná plocha uprostřed |
| postava | 2:3 | 1600 × 2400 | izolovaná postava nebo portrét |
| Dorianův portrét | 4:5 | 1600 × 2000 | stejná kompozice ve všech stavech |
| dekorativní textura | 1:1 | 1200 × 1200 | bezešvá, nízký kontrast |

Preferovaný formát je WebP pro rastrové ilustrace a SVG pro jednoduché ornamenty. Všechny soubory musí mít statickou cestu a žádná stránka nesmí vyžadovat generátor obrázků.

## 7. Názvy souborů

Používat malá písmena, kebab-case a stabilní kategorii:

```text
{category}-{subject}-{variant}.{ext}
```

Příklady:

```text
character-dorian-gray-neutral.webp
location-basils-studio-evening.webp
portrait-dorian-stage-0.webp
portrait-dorian-stage-1.webp
portrait-dorian-stage-2.webp
title-portrait-secret.webp
texture-parchment-dark.webp
```

Číslování `stage-0`, `stage-1`, `stage-2` je součástí herní logiky a nesmí se změnit bez úpravy manifestu a datové mapy.

## 8. Systém Dorianova portrétu

Všechny stavy musí mít shodné:

- obdélný formát 4:5;
- pozici hlavy, ramen, světla a pozadí;
- kostým a identitu postavy;
- malířskou techniku a barevné ladění.

Lišit se smí pouze jemné, narativně odůvodněné změny:

0. **Untouched surface:** klidný výraz, čisté plátno, žádné nadpřirozené znamení.
1. **A troubling detail:** téměř nepostřehnutelná změna v ústech nebo pohledu, stále uvěřitelná jako malířská nedokonalost.
2. **The painted warning:** čitelnější varovný detail a napětí ve světle, bez groteskní deformace.

Budoucí stavy lze přidat jako další statické soubory, ale živý Dorian musí zůstat vizuálně stejný. V aplikaci se soubory napojí přes `STORY_DATA.assets.portraitStages`; při hodnotě `null` zůstává současný CSS placeholder.
