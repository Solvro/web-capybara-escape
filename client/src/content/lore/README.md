# Dialogi YAML

Poszczególne pliki .yaml opisują fragmenty rozmowy. Zasadniczo, gdy rozmowa nie zawiera opcji dialogowych lub te nie wpływają na nic innego niż pozy postaci, cały plik może stanowić monolit. W przypadku, kiedy rozdzielamy drzewka rozmów w oparciu o wybory gracza, wygodną opcją będzie stworzenie osobnego pliku dla każdego drzewka. Dobrą praktyką będzie grupowanie plików jednej rozmowy w podfolderze w `content/lore`. Umieszczono tam przykładowe dialogi, ich modyfikacja może wymagać przebudowy kontenera w przypadku wdrożenia na Dockerze.

## Podstawowy format

```yaml
pose: neutral

text: >-
  Tekst wypowiadany przez Sola.

answers:
  - text: Pierwsza odpowiedź.
    next: kolejny-dialog

  - text: Zakończ rozmowę.
```

- `pose` określa pozę postaci w danym fragmencie dialogu.
- `text` zawiera wypowiedź postaci. Zapis `>-` pozwala rozłożyć jeden akapit na
  kilka linii w pliku (taka cecha YAMLa, nie wymyśliliśmy tej konwencji).
- `answers` jest listą odpowiedzi gracza. Drzewo DOM renderuje okno dialogowe z dedykowaną  liczbą opcji, dynamicznie ustawiając ten parametr po długości listy `answers: string[]`
- `next` wskazuje kolejny plik, nazwę trzeba podać bez rozszerzenia. W przypadku nieuzupełnienia tego pola, wybór opcji po prostu na nic nie wpłynie i dialog będzie kontynuowany w tym samym pliku.
- `answers: []` oznacza fragment bez odpowiedzi i automatycznie kończy rozmowę.

Identyfikatory używane w `next` mogą zawierać małe litery, cyfry i myślniki.

## Kolor tekstu

Jeśli bawiłeś/aś się kiedyś RPG Makerem, to konwencja będzie Ci znana. Kod `\C[n]` zmienia kolor dalszego tekstu. `\C[0]` przywraca kolor biały.

```yaml
text: >-
  To jest zwykły tekst, a \C[4]ten fragment ma inny kolor\C[0].
```

Dostępne numery kolorów:

- `0` — biały
- `1` — niebieski
- `2` — czerwony
- `3` — zielony
- `4` — żółty
- `5` — fioletowy
- `6` — cyjan
- `7` — szary

Można też podać customowy kolor szesnastkowo, np. `\C[#ffb020]`.

## Pauzy

- `\.` zatrzymuje wyświetlanie tekstu na 250 ms.
- `\|` zatrzymuje wyświetlanie tekstu na 1000 ms.

Przykład użycia zamieszczamy poniżej ;)

```yaml
text: >-
  Zaczekaj chwilę.\. Już prawie.\| Gotowe.
```

## Wczytanie dialogów do bazy

Po zmianie plików można sprawdzić je i nadpisać dialogi w bazie poleceniem:

```sh
npm run import:lore --prefix server -- --force
```
