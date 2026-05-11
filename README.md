# Terméknyilvántartó Rendszer

Ez egy modern, teljes körű (full-stack) terméknyilvántartó alkalmazás, amely lehetővé teszi termékek kezelését (CRUD műveletek) egy biztonságos felületen keresztül.

## Technológiai Stukk

- **Frontend**: Angular 19+, Angular Material
- **Backend**: Node.js, Express
- **Adatbázis**: MongoDB (beépített in-memory támogatással)
- **Hitelesítés**: JWT (JSON Web Token)

## Előfeltételek

A futtatáshoz szükséged lesz a következőkre:
- [Node.js](https://nodejs.org/) (v18 vagy újabb ajánlott)
- [npm](https://www.npmjs.com/) (általában a Node.js-szel együtt települ)

## Telepítés és Futtatás

A projekt két fő részből áll: `backend` és `frontend`. Mindkettőt külön kell elindítani.

### 1. Backend Beállítása

1. Lépj be a backend könyvtárba:
   ```bash
   cd backend
   ```
2. Telepítsd a függőségeket:
   ```bash
   npm install
   ```
3. Indítsd el a szervert:
   ```bash
   npm start
   ```
   *Az API szerver alapértelmezés szerint a `http://localhost:5000` címen fut.*
   *Megjegyzés: A backend automatikusan elindít egy memóriában futó MongoDB-t, így nem szükséges külön adatbázis telepítése.*

### 2. Frontend Beállítása

1. Egy új terminálban lépj be a frontend könyvtárba:
   ```bash
   cd frontend
   ```
2. Telepítsd a függőségeket:
   ```bash
   npm install
   ```
3. Indítsd el az alkalmazást:
   ```bash
   npm start
   ```
   *A felhasználói felület (UI) a **http://localhost:4200** címen lesz elérhető. Ezt a címet nyisd meg a böngészőben!*

## Bejelentkezési Adatok

A rendszerben előre rögzítettünk egy teszt felhasználót a könnyebb kipróbálás érdekében:

- **Felhasználónév**: `admin`
- **Jelszó**: `password123`

## Funkciók

- **Biztonságos Belépés**: JWT alapú munkamenet-kezelés.
- **Termékek Listázása**: Átlátható táblázat a rögzített adatokkal.
- **Új Termék Felvétele**: Validált űrlap, amely ellenőrzi az adatokat.
- **Módosítás**: Meglévő termékek adatainak szerkesztése.
- **Törlés**: Termékek eltávolítása megerősítő ablak után.
- **Premium Design**: Modern Angular Material felület, reszponzív kialakítás és Snackbar értesítések.

## Szerző

Bucskó Gábor
