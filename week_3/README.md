# Tydzień 3

## Zadanie 1 - Uruchom odliczanie licznika w komponencie Timebox poprzez kliknięcie na przycisk `zacznij` w komponencie TimeboxEditor.

`Przeniosłem stan komponentu Timebox oraz jego metody do komponentu TimeboxEditable. Dane połączyłem z komponentami poniżej poprez props-y. W ten sposób uzyskałem możliwość modyfikacji stanu w górę.`

## Zadanie 2 - Zaimplementuj w inny sposób dodawanie, usuwanie i edycję elementów tablicy, bez modyfikacji starych wartości.
`Aby nie modyikować bezpośrednio pierwotnego stanu tablicy, wykorzystałem w setState dodatkową funkcję przyjmującą pierwotny stan jako argument, oraz przypisałem go to nowej zmienej na której zostały dokonane zmiany. Nastepnie zmiany to zwrócone zostały do pierwotno stanu`

## Zadanie 3 - Podaj przykład w którym przypisanie indeksu tablicy do klucza ma sens.

`Przypisanie indeksu tablicy do klucza ma sens w przypadku, kiedy liczba elementów tablicy jest stała i index tablicy zawsze odpowiada danemu elementowi. W sytuacji kiedy elementy są dodawane bądź usuwane z tablicy index się zmienia w stosunku do aktualnych elementów. Wtedy każdy element powinien mieć przypisany mu unikatowy klucz.`

##Zadanie 4 -


