

Funktioner

Registrera & logga in

Sök bokinformation via OpenLibrary

Spara böcker till ditt bibliotek

Redigera och ta bort böcker du sparat

Redigera profil, byta lösenord, radera konto
Kom igång lokalt

1. Klona detta repo

git clone https://github.com/BeJo71/bokladan.git

2. Starta API-projekten

Projektet använder två backend-API:n:

UserAPI (användarhantering och auth)

BookAPI (bokbibliotek per användare)

Navigera till respektive mapp och kör:

dotnet run

Båda använder SQLite som databas.

3. Starta frontend

Gå till React-projektmappen och kör:

npm install
npm run dev

Frontend lyssnar vanligtvis på http://localhost:5173.

Obs! Backend måste vara igång för att inloggning och biblioteket ska fungera korrekt.

Tekniker som används

React + React Router

.NET 8 (ASP.NET Web API)

SQLite via Entity Framework Core

Bootstrap 5 (responsiv layout och komponenter)

JWT (autentisering)

Kontakta mig

För frågor, mejla: beeajohansson@hotmail.se
