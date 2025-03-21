# ToDos

- [x] searchbar
  - [x] clear btn -> clear filteredArr
  - [x] clear input with backspace and length = 0 -> init()
- [x] load more btn
- [x] disable modal scrollbar
- [x] modal card
  - [x] heigth, weigth
  - [x] ability
  - [x] stats in lines
  - [x] closing btn
  - [x] change pokemon btns
- [ ] loading spinner
- [x] modal close
  - [x] btn for small displays < 500px
  - [x] keypress ESC

# Checkliste

Bitte erfülle alle Punkte auf dieser Liste, bevor du das Projekt einreichst. Solltest du weitere Extras eingebaut haben, erwähne das kurz, damit sich die Mentoren dies bei Bedarf anschauen können.

## Allgemein:

- [x] Es soll eine bestimmte Anzahl an Pokemon Karten direkt gerendert werden. Am besten zwischen 20 und 40. Aktuell gibt es über 1000 Pokemon. Mindestens die ersten 151 sollen dargestellt werden.
- [x] Unten gibt es einen Button, um weitere Pokemon zu laden.
- [x] Sichtbar soll auf jeder kleinen Pokemon Karte sein:
  - [x] Name
  - [x] Typ/en
  - [x] Bild des Pokemons
  - [x] Hintergrundfarbe passend zum Typ
  - [x] ID (optional)
- [x] Es sollte einen Hover-Effekt auf der kleinen Pokemon Karte geben:
  - [x] cursor-pointer
  - [x] z.B. Pokemon erscheint größer etc. (optional)

## Große Ansicht:

- [x] Beim Klicken auf Pokemonkarte soll sich diese in groß öffnen.
      Hintergrund leicht gräulich und beim Klicken schließt sich die Karte wieder. Wie beim Dialog Fenster. Der Hintergrund ist nicht scrollbar in der großen Ansicht.
- [x] Oben auf Karte sind die gleichen Infos wie bei der kleinen zu sehen (Name, Typ/en und Bild ggf. ID)
- [x] Unten gibt es zusätzliche Informationen. Wie du diese gestaltet und welche du hier alle anzeigen lässt, ist dir überlassen, jedoch sollten hier mindestens gewisse Werte wie z.B. hp/ attack/ defense etc. des Pokemon angezeigt werden, weiteres ist Optional.
- [x] Es gibt Pfeile oder ähnliches, um zwischen den Karten in der großen Ansicht zu wechseln (wie bei der Fotogalerie).

## Code

- [x] Aussagekräftige Namen für Funktionen und Variablen
- [x] camelCase für die Benennung
- [x] Code ist formatiert
- [x] Höchstens 14 Zeilen pro Funktion
- [x] Gleicher Abstand zwischen Funktionen (1 oder 2 Leerzeilen)
- [x] Lagere HTML Templates aus in extra-Funktionen

## Responsive

- [x] Bis 320px Breite alles responsive ohne Scrollbalken

## Sonstiges

- [x] Allgemein kannst du bei diesem Projekt auch gerne etwas kreativ werden, die Bilder hier dienen als Beispiele die gut funktionieren, jedoch kann man mit ein paar Kniffen sicher auch einen sehr schönen individuellen Pokedex erstellen.
- [x] Favicon
- [x] Dokumenten Titel
- [x] Header mit:
  - [x] Logo
  - [x] Titel
  - [x] Suchleiste (man soll mindestens 3 Buchstaben eingeben bevor gesucht werden kann, wenn diese Buchstaben Teil des Namens eines Pokemons sind, sollten diese Pokemon angezeigt werden. Es sollte eine begrenzte Anzahl an Pokemon mit den Suchkriterien angezeigt werden, z.B. 10 stück)
- [x] Footer (optional)
