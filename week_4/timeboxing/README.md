# Tydzień 4

## Zadanie 1 - Stwórz nową aplikację za pomocą create-react-app

`Zastąpiłem wygenerowany poprzez ceate-react-app plik index.html moim plikiem, oraz usunąłem wszystkie domyślne pliki z katalogu ./src`
`Usunąłem skrypty z pliku index.html i zaimportowałem odpowiednie paczki do pliku index.js`

## Zadanie 2 - Wyciągnij pozostałe komponenty do osobnych plików

## Zadanie 3 
### 1. Stwórz katalog components w katalogu styles
### 2. Wyciągnij do niego pliki zawierające style komponentów (jeden komponent na jeden plik)
### 3. Zaimportuj wszystkie komponenty w pliku components.scss

## Zadanie 4 - Dodaj modyfikator elementu progress__bar zmieniający mu kolor na zielony 
`Wcześniej wykonałem zadanie dodatkowe polegające na utworzeniu progressBar-a jako 1 div, co w rezultacie wymusiło stylowanie w pliku ProgresBar.js (długość bara zależna jest od zmiennej przekazanej przez props-y i użyta  w stylowaniu pezpośrednio w ProgressBar.js - użycie linear-gradient)`.
`Zmianę koloru można uzyskać poprzez zmienną przekazaną przez propsy zawierającą "nazweKoloru" i urzyciu jej w sylowaniu znajdującym się w pliku ProgressBar.js`
## Zadanie 5 - Wystyluj komponent Clock przy pomocy metodyki BEM w taki sposób by dało się nadać rózne kolory minutom, sekundom i separatorowi (znakowi dwukropka).
## Zadanie 6 - Spróbuj znaleźć inne miejsca w naszym kodzie, w których funkcja classNames mogłaby się przydać.
`Tak jak w komponencie ProgressBar tak i w komponencie Clock można zastosować bibliotekę classnames. W komponencie CurrentTimebox (parrent) są deklarowane zmienne dotyczące koloru danego elementu i przekazywane niźej do (child) poprzez propsy.`
`Ciekawym użyciem tej funkcji byłoby zaimplementownie koloru przy tworzeniu timeboxa (np. określające jego hierarchię)`