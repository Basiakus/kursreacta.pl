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