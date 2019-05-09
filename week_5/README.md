# Tydzień 5

## Zadanie 1 -
### Znajdź w dokumentacji opis funkcji $x() w konsoli Dev Tools i dowiedz się do czego służy.
`Zwraca tablicę elementów DOM, których ścieżkę XPath określa pierwszy parametr funkcji np. $x(//h1[a]) zwróci wszystkie elementy h1 na stronie, które zawierają link`
### Znajdź w dokumentacji „DOM Breakpoints” i wymyśl jedno zastosowanie przy tworzeniu aplikacji Reactowej
`Za pomocą breackpoits'ów możemy oznaczyć dany element da stronie dostępny w podglądzie DevTools i rozpocząć nasłuchiwanie na modyfikacje w nim zachodzące (oraz w jego strukturalnym drzewie) czy jego usunięcie. Jeśli owe wystąpią aplikacja zatrzyma się a my będziemy mieli podgląd na zmiany, które w nim zaszły`
### Stwórz w konsoli komponent klasowy i dodaj go do aplikacji za pomocą ReactDOM.render().
`??? aktualnie brak pomysłu`
## Zadanie 2 - Stwórz funkcję prettyDir(str, obj), jako ulepszoną funcję console.dir()
### Funkcja ma wypisać wszystkie property obiektu lub tablicy wewnątrz grupy i pokolorować je w zależności od typu.
### Liczby na niebiesko.
### Stringi na czerwono.
### Obiekty na zielono.
### Tablice na różowo.
`Stworzyłem funkcję w pliku "src/addicionalFunction.js", którą zaimportowałem i wywołałem w momencie renderowania komponentu EditableTimebox. Przyjmuje ona 2 parametry. 1 odpowiada tytułowi console.group, natowiast 2 obiektu, który chcemy odpowiednio wyświetlić w konsoli. Jako 2 parametr użyłem obiektu reprezentującego początkowy stan aplikacji. W funkcji tej użyłem metody Object.values(), oraz map() w celu przekształcenia obiektu na tablicę, a następnie zmapowaniu w celu dostania się do każdej wartości klucza. Prawidłowo przypisuję kolor do typu z wyjątkiem tablicy, która jeśli występuje w podanym obiekcie, równieź konwertowana jest na obiekt.`