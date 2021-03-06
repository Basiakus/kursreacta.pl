# Week 8

## Lekcja 2: React.forwardRef() – Przekazywanie referencji

### Zadania domowe
- [x] 1. Stwórz komponent Drawing, który rysuje jakiś obrazek na komponencie canvas o rozmiarach 200 na 200 pikseli. Wokół canvas powinna być czarna ramka z zaokrąglonymi rogami (użyj property style).
- [x] 2. Stwórz komponent Canvas, który korzysta z przekazywania referencji i może być użyty zamiast natywnego elementu canvas wewnątrz komponentu Drawing. Komponent Canvas powinien automatycznie dodawać taką ramkę jak w punkcie pierwszym.
- [x] 3. Stwórz komponent SquareCanvas, który ma property size, które przekazuje do komponentu Canvas jako szerokość i wysokość. Użyj komponentu SquareCanvas wewnątrz komponentu Drawing.

## Lekcja 3: Użycie kontekstu w Reakcie

Zadania domowe
- [x] 1. Dodaj do kontekstu funkcję onLogout, przekaż do niej odpowiednią funkcję z komponentu App a następnie wyciągnij ją z kontekstu w komponencie Header i użyj do wylogowania się.
- [ ] 2. Podaj przykład innego miejsca w aplikacji gdzie można by użyć tej funkcji do automatycznego wylogowania użytkownika.
- [ ] 3. Dodaj do kontekstu funkcję onLoginAttempt, przekaż do niej odpowiednią funkcję z komponentu App a następnie wyciągnij ją z kontekstu w komponencie LoginForm i użyj do zalogowania się. (UWAGA! Jest mały haczyk w tym zadaniu. Dlatego jest trochę trudniejsze niż zadanie 1.)

## Lekcja 4: Dzielenie kodu, React.lazy(), Suspense

Zadania domowe
- [x] 1.Zaimportuj bibliotekę axios asynchronicznie w każdej funkcji modułu AxiosTimeboxAPI i zobacz ile razy moduł zostanie zaimportowany gdy edytujesz, dodajesz i usuwasz timeboxy.
- [x] 2. Zaimportuj asynchronicznie komponent Timebox.
- [ ] 3. Zaimportuj asynchronicznie komponent LoginForm. Czy to dobry pomysł?

## Lekcja 5: Portale

Zadania domowe
- [x] 1. Spraw by w aplikacji Timeboxing komponent Header wyświetlał się na samej górze strony (nad tekstem „Tydzień 8”) bez użycia css a przy użyciu portalu.

## Lekcja 6: useState()

W aplikacji Timeboxing zmień poniższe komponenty na funkcyjne przy użyciu useState
- [x] 1. EditableTimebox
- [ ] 2. App

## Lekcja 8: useEffect()

W aplikacji Timeboxing zmień poniższe komponenty na funkcyjne przy użyciu useEffect i useState
- [x] 1. InspirationalQuote
- [x] 2. TimeboxList (pamiętaj o tym jak konsumujemy wartości kontekstu w komponentach funkcyjnych)

## Lekcja 9: useRef

W aplikacji Timeboxing zmień poniższe komponenty na funkcyjne przy użyciu hooków useRef, useEffect i useState:
- [x] 1. LoginForm
- [x] 2. TimeboxCreator
- [x] 3. CurrentTimebox (ten jest najtrudniejszy)

## Lekcja 10: useContext

W aplikacji timeboxing, przerób następujące komponenty przy użyciu useContext()
- [x] 1. UserGreeting
- [x] 2. TimeboxList
