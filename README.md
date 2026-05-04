# Bokladan – Fullstack Web Application

Bokladan är en fullstack webbapplikation där användare kan söka efter böcker, spara dem i ett personligt bibliotek och hantera sitt konto.

## Funktioner

- Registrera konto och logga in (JWT-baserad autentisering)
- Söka bokinformation via OpenLibrary API
- Spara böcker till ett personligt bibliotek
- Redigera och ta bort sparade böcker
- Hantera profil (ändra lösenord, uppdatera uppgifter, radera konto)

## Tekniker som används

- Frontend: React + React Router
- Backend: .NET 8 (ASP.NET Web API)
- Databas: SQLite (Entity Framework Core)
- Styling: Bootstrap 5
- Autentisering: JWT

## Säkerhet och autentisering

Projektet använder ASP.NET Identity för användarhantering och JWT för autentisering. Lösenord hanteras via Identity och sparas inte manuellt i klartext.

Detta är ett utbildningsprojekt och inte en produktionssatt applikation. Vid vidareutveckling skulle jag exempelvis lägga till refresh tokens, förbättrad felhantering, e-postverifiering och mer omfattande validering.

## Projektstruktur

Projektet består av tre delar:

- **Frontend** (React)
- **UserAPI** – hantering av användare och autentisering
- **BookAPI** – hantering av användarens bokbibliotek

## Kom igång lokalt

### 1. Klona repot

```bash
git clone https://github.com/BeJo71/bokladan.git
