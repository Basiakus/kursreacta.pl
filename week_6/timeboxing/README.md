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
* hasError – typu boolean
* message – typu string
`Jeśli property hasError jest prawdziwe ma wyświetlać message, w przeciwnym przypadku dzieci.`
`(czyli podobnie jak komponent Error ale bez stanu i bez logiki error boundary)`
## 2. Użyj komponentu ErrorMessage wewnątrz komponentu Error
## 3. Użyj komponentu ErrorMessage do wyświetlenia błędu między TimeboxCreator a listą Timeboxów gdy metoda addTimebox rzuci wyjątek.

## 4. Dodaj propTypes do komponentu Timebox, wszystkie propsy powinny być wymagane (łącznie z funkcjami obsługującymi eventy).
## 5. Dodaj domyślne funkcje obsługujące wydarzenia komponentu Timebox, powinny one wypisywać typ wydarzenia do konsoli.
## 6. Stwórz własny walidator do property percent w komponencie ProgressBar. 
### Powinien on akceptować tylko liczby, których wartości są pomiędzy 0 ,a 100. Nie powinien akceptować ani null ani undefined.
## 7. Znajdz w default props odpowiedni typ i użyj go w komponencie ProgressBar, tak aby opcjonalne property color akceptowało tylko wartości „red”, „green”, „blue”.

## 8. Przetestuj poniższą funkcję, pamiętaj o ładnych opisach w test/it oraz describe
```javascript
function fizzBuzz(i) {
  let result = '';
  if (i % 3 === 0) {
    result += 'Fizz';
  }
  if (i % 5 === 0) {
    result += 'Buzz';
  }
  return result || i;
}
```
### a) Jaka jest w.g. Ciebie najmniejsza liczba testów która przetestuje że ta funkcja działa poprawnie.
`Według mnie potrzebne są 3 testy. Pierwszy do sprawdzenia liczb podzielnych przez 3, kolejno przez 5 i liczbę niepodzielną przez podane dzielniki` 
### b) Dodaj podgrupy testów sprawdzające podobne przypadki.
## 9. Przetestuj poniższą funkcję
```javascript
function fib(x) {
  return x <= 1 ? x : fib(x-2) + fib(x-1)
}
```
## 10. Przetestuj tę funkcję i dowiedz się co ona robi
```javascript
function xxx(str) {
  return str.split("").reduce((xyz, abc)=> abc + xyz, '');
}
```
#### `Funkcja ta zwraca "odbicie lustrzane" podanego stringa`

## Zadanie 10.Napisz testy dla komponentu ProgressBar
* upewnij się że dostaje właściwy className
* oraz że odpowiednia szerokość paska jest ustawiana

## 11. Przetestuj edycję timeboxa przy pomocy react-testing-library.

* Klikamy w edycję
* Znajdujemy input odpowiedzialny za edycje tytułu (np. za pomocą etykiety)
* Odpalamy event change na inpucie
* Klikamy na przycisku zatwierdź zmiany
* Upewniamy się że zmieniony tytuł jest widoczny na ekranie.