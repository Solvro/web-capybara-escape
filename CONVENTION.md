# Refactor (KISS)

Projekt się rozrasta i pojawiają się nowe foldery, helpery i stałe. To naturalne przy multiplayerze z kreatorem i backendem, ale czasem te same pojęcia lądują w kilku miejscach albo mają podobne nazwy przy różnym znaczeniu.

Żeby ułatwić sobie pracę na dłuższą metę, porządkujemy strukturę kodu: jeden wspólny kontrakt między frontem a backendem oraz jasne miejsca na rzeczy tylko klienckie / tylko serwerowe.

Nie chodzi o przepisywanie gry od zera. Docelowo to głównie przenoszenie plików i fragmentów kodu w ustalone foldery, bez zmiany zachowania aplikacji.

Dokument ma też pomóc nowym osobom w zespole: nasz układ (React + Phaser + Colyseus) różni się od typowych projektów w organizacji, więc warto mieć jedną mapę "gdzie co leży".

Przyjmujemy układ `client/` + `server/` oraz paczkę `packages/shared` na typy i helpery wspólne dla obu stron.

```
packages/
    shared/             # tutaj wrzucamy pliki stałe i funkcje formatujące (wspólne dla client i server (most))
        package.json    # konfiguracja paczki
        tsconfig.json
        src/
            types/      # podstawowe typy
                messages.ts
                levels.ts
            utils/      # funkcje formatujące, obracające itd helpery
            schemas/    # głowny json ze schematem poziomu (aktualnie jest tylko na server)
            validators/ # walidacje przy upload
client/
    public/
        data/
        fonts/
        textures/
    test/               # testy jednostkowe i integracyjne
    src/
        api/            # zapytania rest api
        app/            # tylko app.tsx i routes.tsx
        pages/          # zostaje tak jak było
        components/
            ui/         # przyciski, input, errory do reużywalnego użycia w aplikacji (ewentualnie /shared)
            creator/    # związane z kreatorem komponenty
            minigames/  # minigry w grze
        hooks/          # podział podobny jak wyżej creator, minigames, playgrounds
        game/           # folder z plikami phasera + jednym komponentem game-mount.tsx do podpięcia do reacta
            game-mount.tsx
            runtime/
            scenes/     # sceny gry (main.ts wypada rozdzielić na kilka plików)
            entities/
            mechanics/
            animators/
            ui/         # tu można wrzucić speech-bubble
        constants/      # tutaj stałe wspólne dla phasera oraz kreatora (związane tylko z frontendem)
            assets.ts
            tile-mapping.ts
            themes.ts
            layout.ts
            animators.ts
        utils/          # helpery, czyli funkcje pomocnicze
            format-level.ts
            entity-render.ts
            tileset-render.ts
        types/          # związane tylko z frontendem
        context/        # room-provider oraz ewentualnie inne reactowe contexty
        lib/            # stanowe zmiany, konfiguracja colyseus itp.
server/
    package.json        # postawowe pliki
    static/             # dane statyczne, które nie są jeszcze w bazie danych np. textLines.json, levels
        levels/
        dialogs/
    test/               # testy jednostkowe i integracyjne
    src/
        index.ts
        app.config.ts
        config/
            mongo.ts
            server.ts
        api/
            routes/
            middlewares/
        services/       # services
        models/         # modele z bazy danych
        rooms/
            game-room.ts
            loader/
            logic/      # logika biznesowa
            schemas/    # colyseus schema bez zaawansowanej logiki (logika w service)
        scripts/        # skrypty używane przez npm run np. export-levels.ts
        types/          # związane wyłącznie z endpointami i colyseus po stronie serwera
        utils/          # funkcje pomocnicze związane wyłącznie z backendem
test/                   # testy e2e dla całej aplikacji
```

Powyższy schemat został opracowany na mojej wiedzy powiązanej z frameworkami backendowymi
oraz strukturą plików dla projektów React po stronie frontend

Ze względu na to, że tworzymy grę multiplayer opartą na websockets, która dzieli typy i częściowo logikę, to proponuję stworzyć paczkę, która będzie zawierała typy wspólne (shared)

# Zasady clean-code

1. helpery, funkcje bezstanowe powinny znajdować się w folderach utils (ułatwi to tworzenie testów jednostkowych w przyszłości)
2. funkcje wymagające integracji z zewnętrznymi serwisami lub dodatkowymi bibliotekami umieszczamy w config, lib (głównie testy integracyjne)
3. typy i funkcje powiązane wyłącznie z clientem np. renderowanie obiektów, tekstury i kolory powinny znajdować się po stronie frontendu w utils i constants
4. typy i funkcje powiązane wyłącznie z serwerem powinny znajdować się w types i utils na serwerze
5. typy messages, entities, mechanics etc. oraz te zależne od frontendu i backendu powinny znaleźć się w folderze shared (osobna paczka poza client i server)
6. nazewnictwo plików w kebab-case np. (creator-tile.tsx), nazewnictwo komponentów i klas w PascalCase, nazewnictwo funkcji utils, helpers, zmiennych camelCase, stałe nazywamy dużymi literami i podkreślniki np. LAYER_MASK
7. komponenty react zawierają końcówkę .tsx reszta plików powinna mieć .ts
8. powinno stosować się ESlint z SolvroConfig (po poprawkach zostanie to zautomatyzowane)
9. unikaj duplikacji nazw (najpierw wyszukaj czy nie ma np. typu Direction, zastanów się czy nie możesz go użyć)

**_Zostaw komentarz uzasadniając dlaczego coś powinno zostać, a coś powinno zostać usunięte_**
