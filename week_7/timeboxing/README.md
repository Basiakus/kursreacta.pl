# Week 7 REST API

## Lekcja 2: JSON Server

### 1. Zasoby ludzkie
* Stwórz nowy zasób w pliku json.db pod kluczem people.
* Ma być to tablica rekordów z kluczami email, first_name, last_name oraz id.
* Stwórz co najmniej 3 rekordy w pliku (nie zapomnij podać im różnych id).
* Użyj Postmana żeby połączyć się z API
* Pobierz listę wszystkich rekordów (zapytanie GET)
* Pobierz pojedynczy rekord (zapytanie GET)
* Stwórz rekordy dla co najmniej trzech różnych ludzi (zapytanie POST).
* Edytuj drugiego człowieka na liście (zapytanie PUT)
* Edytuj trzeciego człowieka na liście podając tylko dane odnośnie maila (koniecznie użyj zapytania PATCH)
* Usuń czwartego człowieka z listy (zapytanie DELETE)
### 2. Starwars API
* Użyj Postmana żeby połączyć się ze Starwars REST API
* Dowiedz się jakimi statkami latał Obi Wan Kenobi
##### `https://swapi.co/api/people/?search=obi`
```javascript
"starships": [
                "https://swapi.co/api/starships/48/",
                "https://swapi.co/api/starships/59/",
                "https://swapi.co/api/starships/64/",
                "https://swapi.co/api/starships/65/",
                "https://swapi.co/api/starships/74/"
            ]
```
* Odkryj nazwę planety i gatunek postaci „Bib Fortuna”
##### `https://swapi.co/api/people/?search=bib`
```javascript
{
     "homeworld": "https://swapi.co/api/planets/37/"
}
```
### 3. Github API
* Użyj Postmana żeby połączyć się z Github REST API
* Dowiedz się ile publicznych repozytoriów ma Dan Abramov (jego nick to gaearon)
```javascript
{
     "public_repos": 235,
}
```
* Dowiedz się ile forków, open issues i subskrybentów ma repozytorium reacta 🙂

* Pobierz trzecią stronę issues repozytorium reacta
`https://api.github.com/search/issues?q=per_page=3`

## Lekcja 4: Callback Hell

* Stwórz funkcję sleep(ms, onSuccess, onError) która ma uruchomić callback onSuccess po wybranej ilości milisekund, chyba że użytkownik zażąda mniej niż 5 ,a więcej niż 4000. W takim przypadku ma uruchomić callback onError.

```javascript
const sleep = (ms, onSuccess, onError) => {
  if (ms < 5) {
    setTimeout(() => {
      onError("sorry is to short time to go sleep!");
    }, ms);
  } else if (ms > 4000) {
    setTimeout(() => {
      onError("sorry is to long time to go sleep!");
    }, ms);
  } else {
    setTimeout(() => {
      onSuccess("Zzzzzzz...");
    }, ms);
  }
};
sleep(4, result => console.log(result), result => console.log(result));
```
[link](https://codesandbox.io/s/callback-exemple-xdo8o)

## Lekca 5: Promises

```javascript
  function sleepPromise(n, ms) {
  return new Promise((resolve, eject) => {
    if (!(n < 5) && !(n > 4000)) {
      setTimeout(() => {
        resolve(`promise value:${n} resolve promise`);
      }, ms);
    } else {
      setTimeout(() => {
        eject(`promise value:${n} eject promise`);
      }, ms);
    }
  });
}
const test = sleepPromise(4, 1000);
console.log(test);
setTimeout(() => {
  console.log(test);
}, 2000);
test.then((result) => console.log(result), (eject) => console.log(eject));

```
* 1. Stwórz funkcję wait(ms). Ma ona zwrócić oczekującą (pending) obietnicę, która ma być dotrzymana (resolved) po wybranej ilości milisekund. Obietnica zwrócona z tej funkcji nie powinna być nigdy odrzucona (rejected).
* 2. Stwórz funkcję delayedError(ms, message), która ma zwracać oczekującą obietnicę i odrzucić ją po zadym czasie w milisekundach (ms) przekazując jej w wartości obiekt Error z zadaną wiadomością (message). Obietnica zwrócona z tej funkcji nie powinna być nigdy dotrzymana (resolved).
* 3. Stwórz funkcję isEven(num), zwracającą obietnicę, która ma natychmiast być dotrzymana jeśli przekazana została liczba. Wartością ma być true jeśli liczba jest parzysta, false jeśli nieparzysta. Obietnica ma być natychmiast odrzucona jeśli is argument funkcji nie jest liczbą całkowitą.
* 4. Stwórz funkcję slowIsEven(num, ms=1000), która robi to samo co funkcja isEven ale po zadanym czasie w milisekundach. Wykorzystaj do implementacji funkcję isEven oraz wait.
* 5. Stwórz funkcję timeout(promise, ms=3000), zwracającą obietnicę, która ma być dotrzymana gdy przekazana obietnica zostanie dotrzymana i otrzymać jej wartość. Chyba, że upłynie zadany czas w milisekundach, to obietnica ma być odrzucona. Wykorzystaj do implementacji funkcję delayedError
[link do rozwiązań](https://codesandbox.io/s/callback-exemple-xdo8o)

## Lekcja 6: Async/Await

- [x] Stwórz asynchroniczną funkcję slowIsEven(num, ms=1000), która robi to samo co funkcja z zadania domowego w poprzedniej lekcji. Wykorzystaj do implementacji funkcje isEven oraz wait oraz słowo kluczowe await.
- [ ] Dowiedz się co robi słowo await gdy jest ustawione przed stringiem?
- [x] Przerób poniższy kod tak aby nadal dwa razy używać słowa kluczowego await. Ale tak żeby operacje asynchroniczne rozpoczęły się niemal równocześnie. Nie zmieniaj opóźnień funkcji slowIsEven. W konsoli pierwszy komunikat powinien pojawić sie po około 2 sekundach a drugi po około 5.
```javascript
  const is2Even = await slowIsEven(2, 2000);
  console.log(is2Even ? „2 is even” : „2 is odd”);
  const is5Even = await slowIsEven(5, 5000);
  console.log(is5Even ? „5 is even” : „5 is odd”);


async function awaitToAsync(number, ms) {
  const is2Even = await slowIsEven(number, ms);
  console.log(is2Even ? `${number} is even ` : `${number} is odd`);
}
const multiAwaitActive = () => {
  awaitToAsync(2, 2000);
  awaitToAsync(5, 5000);
}
```

## Lekcja 7: FakeApiAdapter

###1. Dodaj funkcję partiallyUpdateTimebox(timeboxToUpdate) do modułu FakeTimeboxesAPI, która:

- [x] uaktualni tylko wybrane pola w timeboksie (np uaktualni tylko tytuł a pozostawi totalTimeInMinutes w spokoju jeśli nie przekażemy tego drugiego.
- [x] rzuci błąd jeśli przekazany obiekt nie będzie zawierał pola id.
Wykorzystaj tę funkcję w komponencie TimeboxList zamiast funkcji replaceTimebox.

###2. Konfigurowalne opóźnienie
- [ ] Stwórz funkcję createTimeboxesAPI({ delayInMiliseconds: 1000 }) i zwróć ją jako default export z modułu FakeTimeboxesAPI. Ma ona tworzyć moduł timeboxes API z konfigurowalnym opóźnieniem.

Jeśli w komponencie TimeboxList chcemy mieć api z symulowanym opóźnieniem 4 sekundy, wywołamy ją w taki sposób.
```javascript
import createTimeboxesAPI from "../api/FakeTimeboxesApi";
const TimeboxAPI = createTimeboxesAPI({ delayInMiliseconds: 4000 })
```

## Lekcja 9: Axios API adapter

### 1. Częściowe zmiany
Dodaj funkcję partiallyUpdateTimebox(timeboxToUpdate) do modułu AxiosTimeboxesAPI, która:

- [x] uaktualni tylko wybrane pola w timeboksie (np uaktualni tylko tytuł a pozostawi totalTimeInMinutes w spokoju jeśli nie przekażemy tego drugiego. Podpowiedź (json server obsługuję tę funkcjonalność za pomocą metody PATCH)
- [x] rzuci błąd jeśli przekazany obiekt nie będzie zawierał pola id.
Wykorzystaj tę funkcję w komponencie TimeboxList zamiast funkcji replaceTimebox.

### 2. Konfigurowalny url
- [x] Stwórz funkcję createTimeboxesAPI({ baseUrl: „http://localhost:4000/timeboxes” }) i zwróć ją jako default export z modułu AxiosTimeboxesAPI.
Ma ona tworzyć moduł timeboxes API z konfigurowalnym baazowym urlem.
Jeśli w komponencie TimeboxList chcemy mieć api łączące się z json serverem na porcie 5000, wywołamy ją w taki sposób.

```javascript
import createTimeboxesAPI from "../api/AxiosTimeboxesApi";
const TimeboxAPI = createTimeboxesAPI({ baseUrl: "http://localhost:5000/timeboxes" })
```
### 3. Wyszukiwanie timeboxów
- [x] Stwórz funkcję getTimeboxesByFullTextSearch(searchQuery), gdzie searchQuery jest dowolnym tekstem.
Funkcja ma działać tak jak getAllTimeboxes, ale ma wyszukiwać timeboksy za pomocą tekstu.
`Podpowiedź 1: JSON server obsługuje wyszukiwanie poprzez podanie parametru „q” do urla.`
`Podpowiedź 2: Może Ci się przydać funkcja encodeURIComponent`
Dodaj wyszukiwanie do komponentu TimeboxList (wystarczy podpiąć input z wydarzeniem onChange do funkcji getTimeboxesByFullTextSearch).

## Lekcja 14: React – Uwierzytelnianie
### Zadania:
- [ ] 1 Stwórz implementacje adaptera uwierzytelniania – AxiosAuthenticationAPI
- [ ] Skorzystaj z Local Storage API żeby zapamiętać token pomiędzy odświeżeniami strony
- [ ] Po zalogowaniu zapisz accessToken w local storage
- [ ] Po wylogowaniu usuń accessToken w local storage
- [ ] W metodzie App.componentDidMount odczytaj accessToken z local storage i uaktualnij stan
- [ ] Automatycznie wyloguj użytkownika przed upływem godziny
- [ ] Po zalogowaniu uruchom timeout z odpowiednim opóźnieniem.
- [ ] Nie zapomnij o usunięciu timeoutu w component willUnmount i po wylogowaniu przed upływem czasu.
- [ ] Jeśli zapisujesz token w localStorage możesz też zapisać tam czas wygaśnięcia tokenu i odczytać go w componentDidMount