# Tydzień 2

## `Zadanie 1 - Malejący Progress bar z prawej strony`
### Zmień progress bar tak, żeby pasek zamiast rosnąć malał.

`Tzn jego lewy kraniec jest ruchomy. A prawy jest maksymalnie na prawo. Idealnie jeśli znajdziesz sposób na to by wpisać w CSS sam obliczył wielkość malejącego paska na podstawie ukończenia zadania. Czyli wpisuję 20% w kod i chciałbym żeby pasek był z prawej strony i zajmował 4/5 szerokości.`

## `Zadanie 2 - Progress bar jako 1 div.`
### Zastanów się jak można zrobić progress bar tylko za pomocą css.
Kod w html ma wyglądać tak:
`<div class=ProgressBar style="???? cośtam cośtam 20% cośtam" />`

## `Zadanie 3. Mistrz(yni) document.createElement`
### Zbuduj całą naszą aplikację za pomocą document.createElement
`Znacznik body ma zawierać tylko kontener <div id="root" /> do którego w javascripcie dodaj wszystkie elementy naszej aplikacji.`

## `Zadanie 4. Mistrz(yni) React.createElement`
### To samo co powyżej, tylko że za pomocą React.createElement
`UWAGA: Nie wolno używać JSX`
`Podpowiedź: W obu powyższych można uprościć sobie życie i stworzyć własne funkcje pomocnicze.`

## `Zadanie 5. Lepszy zegar`
### Spróbuj przekazać do komponentu Clock wartości jednocyfrowe `(nie jako string, ale jako liczba)`. Np 7 minut i 0 sekund. Nie wygląda to ładnie, prawda? („7:0”)
### `Dodaj kawałek kodu do komponentu Clock który skowertuje zarówno minuty i sekundy do stringa, oraz doda zero na początku jeśli string zawiera tylko jedną cyfrę.`
### W powyższym przykładzie, `zegar powinien wyświetlać „07:00”`.

## `Zadanie6. Wyświetlanie godzin`
### Rozbuduj zegar o wyświetlanie godzin. Dodaj `property hours` i spraw żeby zegar wyświetlał czas w formacie `„03:07:00”` po podaniu 3 godzin, 7 minut i zero sekund.

## `Zadanie 7. Wyświetlanie milisekund`
### Rozbuduj zegar o wyświetlanie milisekund. Dodaj property `miliseconds` i spraw żeby zegar wyświetlał czas w formacie `„03:07:00.023”` po podaniu 3 godzin, 7 minut, zero sekund i 23 milisekund.

## ` Zadanie 7. Normalizacja danych`
### Spraw żeby zegar wyświetlał czas od `„00:00:00.000” do „23:59:59.999”`.
###Jeśli ktoś poda `wartości ujemne` dla np minut to zegar ma wyświetlić `00 w polu minut, a jeśli poda 100 minut to zegar ma wyświetlić 59 minut`.
###Nie przejmuj się obsługą wartości, które nie są liczbami. Tym zajmiemy się kiedy indziej.

