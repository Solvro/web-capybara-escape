# Dialogi YAML

Każdy plik `.yaml` opisuje jeden fragment rozmowy. Nazwa pliku bez rozszerzenia
jest jego identyfikatorem. Na przykład odpowiedź z `next: brama` otwiera plik
`brama.yaml`.

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
  kilka linii w pliku.
- `answers` jest listą odpowiedzi gracza.
- `next` wskazuje kolejny plik bez rozszerzenia. Jeżeli go nie podasz, kliknięcie
  odpowiedzi nie otworzy następnego dialogu.
- `answers: []` oznacza fragment bez odpowiedzi i koniec rozmowy.

Identyfikatory używane w `next` mogą zawierać małe litery, cyfry i myślniki.

## Kolor tekstu

Kod `\C[n]` zmienia kolor dalszego tekstu. `\C[0]` przywraca kolor biały.

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

Można też podać kolor szesnastkowo, np. `\C[#ffb020]`.

## Pauzy

- `\.` zatrzymuje wyświetlanie tekstu na 250 ms.
- `\|` zatrzymuje wyświetlanie tekstu na 1000 ms.

```yaml
text: >-
  Zaczekaj chwilę.\. Już prawie.\| Gotowe.
```

To są jedyne modyfikatory tekstu obsługiwane przez dialogi.

## Wczytanie dialogów do bazy

Po zmianie plików można sprawdzić je i nadpisać dialogi w bazie poleceniem:

```sh
npm run import:lore --prefix server -- --force
```
