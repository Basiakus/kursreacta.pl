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
`Aby rozwiązać mój problem powyżej odwołałem się do instancji tablicy jako wartość 'map-owanego elementu'.`
## Zadanie 3 - Stwórz komponent RealTimeClock, który wyświetla aktualny czas.
`Użyj metod componentDitMount() i componentWillUnmount() by zainicjalizować interwał i posprzątać po nim.`
## Zadanie 4 - Użyj metod componentDitMount() i componentWillUnmount() by zainicjalizować interwał i posprzątać po nim.
`Użyłem wyżej wymienionych metod ale wymagało to przekształcenia funkcyjnego komponentu CurrentTimebox na klasowy, oraz dodania logiki, która odmontowywała by i montowywała komponent.`
`Moim rozwiązaniem w tej sytuacji gdzie chcemy zachować komponent na stronie, jak również mieć wpływ na aktualny stan intervau jest wywołanie metody odpowiadającej za jego zatrzymanie za każdym razem kiedy chcemy edytować komponent. W rezultacie komponent pozostaje na stronie jak również mamy wpływ na stan interwału podczaj jego edycji. Nie dochodzi do 'wycieku pamięci' i nie musimy po 'nim sprzątać'.`
## Zadanie 5 - Przeczytaj w dokumentacji React.StrictMode pozostałe przypadki powodujące ostrzeżenia w trybie restrykcyjnym i spróbuj je spowodować.
## Innymi słowy użyj przestarzałego API Reacta i upewnij się, że StrictMode je wykrywa.
### Opakowałem całą aplikację w komponencie App.js w dodatkowy komponent React.StrictMode, aby mieć wglad do potencjalnych błędów całej aplikacji. W rezultacie otrzymałem błąd o treści
`Warning: Unsafe lifecycle methods were found within a strict-mode tree:`
    `in StrictMode (at App.js:8)`
    `in App (at src/index.js:9)`
`componentWillMount: Please update the following components to use componentDidMount instead: CurrentTimebox, RealTimeClock`
## Zadanie 6 Naucz się skrótów klawiszowych najważniejszych narzędzi debuggera:
step in - `F11` `wejście do ciała funkcji, która aktualnie jest wywoływana`
step over -`F10` `przejście do następnej linijki kodu, która jest aktualnie wywoływana`
step - `F9` `Przechodzenie pezposrednio do funkcji, która aktualnie jest wywoływana`
resume `F8` `wznowienie wykonywania skryptu` 

## 2. Dowiedz się do czego służą Conditional Breakpoints oraz Log Points.
`Conditional Breakpoints dodatkowo umoźliwiają podanie wyrażenia. Zatrzymanie się kodu na danym breakpoint-cie następuje, kiedy jego wyrazenie jest równe true`
`Log Points umozliwiają wypisanie wartości zmiennych w danym momencie (miejscu) kodu`