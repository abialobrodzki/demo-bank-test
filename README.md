# Playwright TypeScript

<img src="https://logospng.org/download/visual-studio-code/visual-studio-code-4096.png" width="88" height="88"/>
<img src="https://www.testautomatisierung.org/wp-content/uploads/Playwright.png" width="88" height="88"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="88" height="88"/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="88" height="88"/>

## I. Linki testowanych stron:

- strona demo np. https://demo-bank.vercel.app/
-
- [można_podać_link_do_serwera_testowego_produkcyjnego_tag/znacznik]

## II. Konfiguracja środowiska testowego:

- pobranie IDE **'Visual Studio Code'** ->  
  https://code.visualstudio.com/
- podranie środwiska uruchomieniowego dla JavaScript, TypeScript **'Node.js'** ->  
  https://nodejs.org/en/
- wtyczka VSC: **'GitLens'** – zaawansowana kontrola wersji ->  
  https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
- wtyczka VSC: **'Prettier'** – formater kodu ->  
  https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

1. **W przypadku nowego repo:** Tworzymy katalog z repo 'Projects/repo' na dysku C:/
1. Po uruchomieniu VSC otwieramy katalog 'C:/Projects/repo' i tworzymy (inicjalizujemy) projekt node.js za pomocą komendy (w oknie terminalu):
   ```javascript
   npm init playwright@latest
   ```
   Komenda pobiera najnowszą wersję Playwright - zaakceptować domyślne ustawienia.
1. Usuwamy zawartość pliku **[example.spec.ts]** i katalog **[test-examples]**, który znajduje się w katalogu tests, który został utworzony po inicjalizacji projektu.
1. **W przypadku repo na GIT:** Pobieramy repozytorium (np. jako zip).
1. Rozpakowujemy zip z projektem w dowolnym katalogu np Projects
1. W VSC otwieramy folder, który zawiera package.json, jako nowy projekt
1. W konsoli/terminalu wykonujemy polecenie do instalacji wymaganych paczek:
   ```javascript
   npm install
   ```
   albo krócej:
   ```javascript
   npm i
   ```
   **Uwaga!** Jeśli otrzymasz błąd o nieaktualnych przeglądarkach wykonaj polecenie:
   ```javascript
   npx playwright install
   ```
1. **Instalacja zakończona** W tej chwili mamy gotowe śodowisko do uruchomienia testów
1. Modyfikacja pliku konfiguracyjnego Playwright dokonywana w pliku **[playwright.config.ts.]** (np. wybór przeglądarki)
1. Konfiguracja VSC:
   - włączenie automatycznego zapisu: **File -> Auto Save**
   - w pliku README.md możliwość włączenia podglądu pliku: **Preview**
   - podgląd zmian: **PPM na pliku -> Open Timeline**
   - formatowanie kodu: **PPM -> Menu kontekstowe -> Format Document**
   - wyszukiwanie/zmiana danych: **CTRL + F**
   - kopiowanie zaznaczonej linijki kodu: **ALT + SHIFT + :arrow_down:**
   - komentowanie/odkomentowanie: **Ctrl + /**
   - przesunięcie linii w górę: **Alt + :arrow_up:**
   - tworzenie nowej zmiennej: **PPM -> Refaktoryzuj** lub **Ctrl + Shift + R** -> 'Extract to constant in enclosing scope'
   - wyświeltenie sugestii autozupełniania: **Ctrl + Spacebar**

## III. Przydatne komendy - terminal:

1. Aby nagrać test za pomocą codegen użyj polecenia:
   ```javascript
   npx playwright codegen [adres url strony]
   ```
1. Aby uruchomić testy z katalogu **'test'** użyj polecenia:
   ```javascript
   npx playwright test
   ```
1. Aby uruchomić testy z katalogu test z widocznym oknem przeglądarki użyj polecenia:
   ```javascript
   npx playwright test --headed
   ```
1. Aby wyświetlić raport z testów użyj polecenia:
   ```javascript
   npx playwright show-report
   ```
   Zakończenie wyświetlania raportu. W konsoli użyj skrótu Ctrl + c dwukrotnie.
1. Aby sprawdzić wersję **'Node.js'** użyj polecenia:
   ```javascript
   node - v
   ```
1. Aby przerwać wykonywanie polecenia w terminalu:
   ```javascript
   hit twice Ctrl + C
   ```
1. Abu uruchomić Trace Viewer z pliku .zip:
   ```javascript
   npx playwright show-trace trace.zip //trace.zip to ścieżka do pliku .zip
   ```
1. ...

## IV. Przydatny kod:

1. Aby wyświetlić podgląd testów:
   ```javascript
   await page.pause()
   ```
1. Aby usunąć focus z elementu:
   ```javascript
   await page.blur()
   ```
1. Aby zastosować asercję typu soft (do sprawdzania mniej ważnych rzeczy, a błąd nie przerywa testu):
   ```javascript
   await expect.soft()
   ```
1. Aby zastosować zaznaczyć/odznaczyć i sprawdzić checkbox zamiast click() i asercji:
   ```javascript
   await page.check()
   await page.uncheck()
   ```
1. Aby zaczekać na pełne załadowanie strony, tzw.'inteligentne czekanie':
   ```javascript
   await page.waitForLoadState('domcontentloaded')
   ```
1. Aby uruchomić tylko 1 test:
   ```javascript
   test.only('test')
   ```
1. Import:
   ```javascript
   import { test, expect } from '@playwright/test'
   ```
1. Szablon przypadku testowego:
   ```javascript
   test('test description', async ({ page }) => {})
   ```
1. Opis dla scenariusza testów:
   ```javascript
   test.describe('Group description', () => {})
   ```
1. ...

## V. Konfiguracje pliku **[playwright.config.ts]**:

1. Wyłączenie przeglądarek Firefox i Safari

```javascript
/* Configure projects for major browsers */
// {
//   name: 'firefox',
//   use: { ...devices['Desktop Firefox'] },
// },

// {
//   name: 'webkit',
//   use: { ...devices['Desktop Safari'] },
// },
```

1. Włączenie zapisu wideo dla testu zakończonego niepowodzeniem

```javascript
use: {
    video: {'retain-on-failure'},
},
```

1. Włączenie Trace Viewer dla testu zakończonego niepowodzeniem

```javascript
use: {
    trace: {'retain-on-failure'},
},
```

## VI. Markdown Toolbox:

https://www.markdowntoolbox.com/pl/blog/
https://github.com/markdown-templates/markdown-emojis

## VII. Lokatory i selektory(adresy elementów):

- **getByTestId** i.e. **getByTestId('login-input')** for element with data-testid="login-input"
- **getByRole** i.e. **getByRole('button', { name: 'wykonaj' })**
- **locator** i.e. **locator('#some-id')** for element with attribute id="some-id", #some-id is css selector

## VIII. Chrome - DevTools:

- open DevTools **F12** or **right click Inspect**
- get selector: **right click on element -> Copy -> Copy selector**
- testing CSS selectors in Console: **$$('selector')**
  ```
  $$('.nazwa_klasy')
  ```
- testing XPath selectors in Console: **$x('selektor_XPath')**
  ```
  $x('//*[@class="nazwa_klasy"]')
  ```
- wyszukiwanie elementów CSS/XPath:
  - po nazwie klasy:
    ```
    .nazwa_klasy  //CSS
    //*[@class="nazwa_klasy"]  //XPath
    ```
  - po ID elementu:
    ```
    #id_elementu  //CSS
    //*[@id="id_elementu"]  //XPath
    ```
  - po wartości atrybutu:
    ```
    [atrybut = "wartosc"]  //CSS
    //*[@atrybut="wartosc"]  //XPath
    ```

## IX. Aktualizacja - Playwright **[package.json]**:

- Informacje o zależnościach i wersjach paczek w projekcie znajdują się w pliku **package.json**.
- Wersja paczki np. 1.48.1 odczytywana jako **major.minor.patch**:
  - **major** jest główną wersją – zmiany, które mogą spowodować brak kompatybilności między wersjami;
  - **minor** oznacza dodatkowe funkcjonalności;
  - **patch** oznacza pomniejsze poprawki w danej bibliotece.
- W zależności od systemu przeglądarki są instalowane w różnych lokalizacjach:
  - Windows: **%USERPROFILE%\AppData\Local\ms-playwright**
  - MacOS: **~/Library/Caches/ms-playwright**
  - Linux: **~/.cache/ms-playwright**

1. Aby sprawdzić wersję danej paczki wykonaj w konsoli komendę:
   ```javascript
   npx playwright --version
   ```
1. Aby sprawdzić czy dana wersja paczki nie jest przestarzała wykonaj w konsoli komendę:
   ```javascript
   npm outdated @playwright/test
   ```
1. Aktualizacja paczki **@playwright/test**:
   ```javascript
   npm i @playwright/test
   ```
1. Aktualizacja przeglądarek:
   ```javascript
   npx playwright install
   ```

## X. Standardy kodu - **Prettier**

Formatowanie kodu wg standardu dla całego projektu realizowane przez **Prettier**.
Reguły formatowania: https://prettier.io/docs/en/options.html.

1. Zainstalowanie paczki Prettier:
   ```javascript
   npm install --save-dev --save-exact prettier
   ```
1. Konfigracja Prettier:
   - ignorowane pliki **[.prettierignore]**:
   ```
   package-lock.json
   playwright-report
   test-results
   ```
   - ustawione reguły **[.prettierrc.json]**:
   ```json
   {
     "singleQuote": true,
     "semi": false,
     "endOfLine": "auto"
   }
   ```
1. Uruchomienie formatowania z Prettier:
   ```javascript
   npx prettier --write .
   ```

## XI. Wzorzec AAA

W testach użyty został pattern AAA, gdzie:

- **Arrange**: przygotowanie danych testowych.
- **Act**: wykonanie akcji testowych.
- **Assert**: zweryfikowanie oczekiwanych rezultatów.  
  Przykład:

```javascript
// Arrange
// [kod przygotowania do testów np. wczytanie danych]
// Act
// [kod wykonania akcji]
// Assert
// [kod sprawdzenia rezultatów]
```
