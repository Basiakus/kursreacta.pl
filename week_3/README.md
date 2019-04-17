# Tydzień 3

## Zadanie 1 - Uruchom odliczanie licznika w komponencie Timebox poprzez kliknięcie na przycisk `zacznij` w komponencie TimeboxEditor.

`Przeniosłem stan komponentu Timebox oraz jego metody do komponentu EditableTimebox. Dane połączyłem z komponentami poniżej poprez props-y. W ten sposób uzyskałem możliwość modyfikacji stanu w górę poprzez wszystkie komponenty będące dziećmi komponentu EditableTimebox.`

## Zadanie 2 - Zaimplementuj w inny sposób dodawanie, usuwanie i edycję elementów tablicy, bez modyfikacji starych wartości.
`Aby nie modyikować bezpośrednio pierwotnego stanu tablicy, wykorzystałem w setState dodatkową funkcję przyjmującą pierwotny stan jako argument, oraz przypisałem go to nowej zmienej na której zostały dokonane zmiany. Nastepnie zmiany te zwrócone zostały do pierwotno stanu`

## Zadanie 3 - Podaj przykład w którym przypisanie indeksu tablicy do klucza ma sens.

`Przypisanie indeksu tablicy do klucza ma sens w przypadku, kiedy liczba elementów tablicy jest stała i index tablicy zawsze odpowiada danemu elementowi. W sytuacji kiedy elementy są dodawane bądź usuwane z tablicy index się zmienia w stosunku do aktualnych elementów. Wtedy każdy element powinien mieć przypisany mu unikatowy klucz.`

##Zadanie 4 - Stwórz referencję do formularza (zamiast do pojedynczych pól) i w metodzie handleSubmit dostań się do wartości za pomocą API przeglądarki.

`Utworzyłem jedną referencje w komponencie TimeboxCreator i przypisałem ją do elementu formularza. W celu dostania się do wartości inputów odpowiadających za wpisywanie tekstu i czasu odniosłem się do obiektu "current" należącego do referencji, a następnie do indeksu danego inputa. Na koniec odniosłem się do właściwości "value". Przykład: this.formRef.current[0].value`

