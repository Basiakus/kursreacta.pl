# Tydzień 6

## Zadanie - 1
### Załóż konto na codesandbox   
### Stwórz nowy projekt na codesandbox z szablonu create-react-a    
### Skopiuj do sandboxa rozwiązanie jednego z poprzednich zadań domowych  
### Pochwal się na grupie
### Wyeksportuj kod z CodeSandbox, zainstaluj lokalnie i uruchom  
### Stwórz projekt na CodeSandbox poprzez import repo z githuba  
<a href='https://codesandbox.io/s/week5-1kh3k'>link</a>


## Zadanie - 2 
### Stwórz komponent ProgressArc
### Powinien przyjmować te same propsy co ProgressBar
### ale zamiast prostokąta rysować łuk za pomocą canvas API
### 100% = cały okrąg
### 50% = pół okręgu
### Powinien przerysowywać się tylko podczas aktualizacji
<a href='https://codesandbox.io/s/react-curse-week6-exercise-2-87w5b'>link</a>

## Zadanie - 3
### Stwórz komponent AnimatedProgressArc
### Powinien zachowywać się tak jak ProgressArc ale coś powinno się w nim animować (kolor, wielkość grubość etc.)
### Powinien przerysowywać się około 60 razy na sekundę
### Wrzuć oba na codesandbox i pochwal się na grupie #tydzien6
<a href='https://codesandbox.io/s/react-curse-week6-exercise-2-87w5b'>link</a>

## Zadanie - 4
### Dodaj props initialDate do komponentu Datepicker z lekcji
### Jeśli to property jest ustawione, wybrana data powinna być zaznaczona po wyświetleniu komponentu.
<a href='https://codesandbox.io/s/week-6-exercise-4-vuc5u'>link</a>

## Zadanie - 5 
### Stwórz komponent ProgressBarJui
### Powinien przyjmować te same propsy co ProgressBar ale wewnątrz wyświetlać komponent "https://jqueryui.com/progressbar".

# Tydzień 5 spóżnine zadania
## 1. Stwórz komponent ErrorMessage o następujących propsach:
### hasError – typu boolean
### message – typu string
`Jeśli property hasError jest prawdziwe ma wyświetlać message, w przeciwnym przypadku dzieci.`
`(czyli podobnie jak komponent Error ale bez stanu i bez logiki error boundary)`
## 2. Użyj komponentu ErrorMessage wewnątrz komponentu Error
## 3. Użyj komponentu ErrorMessage do wyświetlenia błędu między TimeboxCreator a listą Timeboxów gdy metoda addTimebox rzuci wyjątek.

## 4. Dodaj propTypes do komponentu Timebox, wszystkie propsy powinny być wymagane (łącznie z funkcjami obsługującymi eventy).
## 5. Dodaj domyślne funkcje obsługujące wydarzenia komponentu Timebox, powinny one wypisywać typ wydarzenia do konsoli.
## 6. Stwórz własny walidator do property percent w komponencie ProgressBar. 
### Powinien on akceptować tylko liczby, których wartości są pomiędzy 0 ,a 100. Nie powinien akceptować ani null ani undefined.
## 7. Znajdz w default props odpowiedni typ i użyj go w komponencie ProgressBar, tak aby opcjonalne property color akceptowało tylko wartości „red”, „green”, „blue”.

