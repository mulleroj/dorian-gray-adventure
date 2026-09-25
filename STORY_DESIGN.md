# Story design

## Literární rámec

Hra vychází z motivů románu Oscara Wildea, ale všechny alternativní reakce hráče jsou označené jako herní rozšíření. Chapter I zachovává setkání Doriana, Basila a lorda Henryho v ateliéru, Henryho argument o pomíjivosti mládí a Dorianovo první setkání s portrétem.

Hra zatím nekopíruje delší pasáže románu. Anglický text je nově napsaný pro výukový formát B1.

## Plán šesti kapitol

| Kapitola | Hlavní události | Herní důraz |
| --- | --- | --- |
| I. The Beautiful Young Man | Basilův ateliér, setkání s Henrym, portrét | první hodnoty a rozhodnutí |
| II. The Actress | Sibyl Vane, divadlo, Dorianova veřejná tvář | vztahy a reputace |
| III. The Changing Portrait | první viditelná změna, tajná místnost | důsledky a práce s portrétem |
| IV. A Life of Pleasure | společenský život, volby a jejich cena | rozpor mezi reputací a svědomím |
| V. The Confrontation | návraty minulosti, Basilův tlak | odhalení a odpovědnost |
| VI. The Final Choice | poslední rozhodnutí a uzavření příběhu | více možných zakončení |

## Implementovaná Chapter I

1. **A Quiet Studio** — Dorian přichází k Basilovi; je stanoven vztah mezi obrazem a jeho modelem.
2. **The Painter's Friend** — Basil dokončuje portrét a žádá Doriana o důvěru.
3. **A New Voice** — přichází lord Henry; hráč rozhoduje, zda naslouchat jeho pohledu, nebo chránit Basilovu práci.
4. **The Price of Youth** — Dorian reaguje na myšlenku, že krása a mládí jsou dočasné.
5. **The Portrait** — Dorian poprvé vidí hotové dílo; hráč může zkoumat jeho význam, nebo se od něj odvrátit.
6. **Behind the Curtain** — nepovinná gated scéna dostupná jen po prozkoumání portrétu.
7. **A Promise in the Evening** — uzavření kapitoly a přehled skutečných rozhodnutí.

Tři hlavní rozhodovací body jsou:

- jak Dorian reaguje na Henryho vliv;
- zda přijme, nebo zpochybní Henryho představu o mládí;
- zda se postaví portrétu, nebo od něj uteče.

## Hodnoty

- `Reputation` sleduje, jak Dorian působí navenek;
- `Conscience` sleduje jeho vnitřní odpor nebo přijetí následků;
- `Portrait` sleduje obrazové napětí portrétu, nikoli morální skóre.

Hodnoty se mohou rozcházet. Například Dorian může společensky působit sebejistě a současně zvýšit napětí portrétu. UI je proto zobrazuje odděleně a nepoužívá štítky „dobrý“ nebo „špatný“.

## Implementovaná Chapter II — The Actress

Chapter II je uzavřený devítiscénový oblouk:

1. **The Theatre in the Evening** — návrat z Chapter I do divadla a čtení kontinuity předchozích voleb.
2. **Prince Charming** — volba mezi obdivem k rolím a zájmem o Sibyl jako osobu.
3. **Many Heroines** — kontrast mezi galerií postav a životem mimo jeviště.
4. **Two Stories About Sibyl** — veřejná idealizace nebo obrana soukromé osoby.
5. **When the Curtain Falls** — Sibylin vlastní hlas a volba naslouchat, snít, nebo slibovat.
6. **A Promise in Public** — zásnuby se stávají veřejnou skutečností.
7. **The Night of Romeo and Juliet** — poslední výkon a rozpad obrazu ideální herečky.
8. **After the Curtain** — poslední rozhodnutí mezi krutostí, nasloucháním a odkladem.
9. **The Morning After** — definitivní rozlišení výsledku a uzavření Sibylina oblouku.

Schválený resolver používá profily `role-first`, `person-first` a `mixed`. Kombinace `role-first` + `cruel` vede ke `dead-canonical`; `person-first` + `listen` + respektující slib vede ke `alive-together`; ostatní kombinace vedou ke `alive-estranged`. Živá Sibyl se po canonical výsledku nemůže vrátit do příběhu. Alternativy jsou v UI i teacher mode výslovně označené jako interaktivní, ne jako Wildeův původní děj.

## Schválený základ pro více kapitol

Milestone 2B připravil technický základ; Milestone 2C na něj navázal plně hratelnou Chapter II. Schválený Chapter III narrative blueprint byl v Milestone 3C převeden do přesně devítiscénového hratelného oblouku. Milestone 3H doplnil schválený Stage 3 runtime artwork a kontextové Chapter III location visuals bez změny story struktury nebo unlock logiky.

Stav hry od verze 2 rozlišuje:

- aktivní kapitolu;
- dokončení každé kapitoly v mapě completedChapters;
- původní číselné hodnoty, flags, historii voleb a navštívené scény;
- dlouhodobé storyFacts oddělené od osobnostních ukazatelů.

Schválené hodnoty použité v Chapter II jsou:

- sibylRelationship: role-first, mixed, person-first;
- sibylOutcome: dead-canonical, alive-estranged, alive-together;
- c2FinalResponse: cruel, listen, delay.

Chapter III používá následující allow-listed facts:

- portraitLocation: null nebo locked-schoolroom;
- basilSuspicion: null, uneasy, suspects nebo clear;
- portraitStageUnlock: null nebo stage-3;
- yellowBookResponse: null, accepted, questioned nebo escape.

`portraitHidden` a `secretRoomEstablished` se odvozují z `portraitLocation`; nejsou to save keys. Sibyl contact se neukládá; odvozuje se z existujícího `sibylOutcome`. Locked-schoolroom choice nastavuje `portraitLocation` a `portraitStageUnlock` atomicky, ne z numeric Portrait threshold.

## Implementovaná Chapter III — The Changing Portrait

Chapter III začíná po dokončení Chapter II a vyřešení tří jejích continuity facts. Obsahuje přesně devět scén:

1. **Morning Without an Answer** — tiché ráno po výsledku Sibylina oblouku.
2. **Basil at Breakfast** — Basilova starost a první rozhodnutí o upřímnosti.
3. **What Basil Wants to Know** — důvěra, vina a návaznost na předchozí Basilovy postoje.
4. **The Portrait Behind the Screen** — Basil žádá o obraz; změněnou tvář neuvidí.
5. **The Face That Answers** — před odemčením Stage 3 se vrací pouze existující varování Stage 2.
6. **The Room With a Key** — obraz je přesunut do locked schoolroom; tím se atomicky odemkne logický Stage 3.
7. **Rules Around the Secret** — první deklarativní popis nové Stage 3 a pravidla tajemství.
8. **The Book That Was Waiting** — Henryho žlutá kniha a čtvrté rozhodnutí.
9. **A Book for the Next Life** — uzavření Chapter III bez otevření Chapter IV.

Všechna čtyři rozhodnutí mají tři schválené odpovědi. Basil nikdy nevidí změněnou tvář a hra nezapisuje `portraitWitness`, `portraitHidden`, `secretRoomEstablished` ani `sibylContact`.

Sibylin osud se vypočítá při vstupu do poslední scény Chapter II. Žádná budoucí kapitola nesmí znovu zobrazit živou Sibyl po výsledku dead-canonical, ani automaticky zaměnit alive-estranged za smrt nebo alive-together za harmonický vztah.

Příběhové varianty budou deklarativní a krátké. Nesmějí spouštět kód ani měnit stav. Citlivý obsah bude předem označen věcným warningem s možností pokračovat, přeskočit označený popis nebo hraní přerušit bez změny postupu.

## Budoucí výukové vrstvy

Každá kapitola může přidat krátké glossary nápovědy, otázky k diskusi a později poslech. Výukové prvky mají doprovázet čtení, ne nahrazovat příběh.
