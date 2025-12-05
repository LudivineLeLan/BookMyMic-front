
# BookMyMic - Frontend

Application React pour réserver des créneaux de karaoke.

## Installation

1. Cloner le repo :

```bash
git clone https://github.com/LudivineLeLan/BookMyMic-front.git
cd BookMyMic-front
```

2. Installer les dépendances :

```bash
npm install
```

3. Démarrage en local :

```bash
npm start
```

L'application tourne par défaut sur [http://localhost:3001](http://localhost:3001) (ou sur le port configuré).

## Structure

* `src/components` : tous les composants React (`App.js`, `Header.js`, `SlotsList.js`, `BookingForm.js`, `CalendarView.js`)
* `src/styles` : fichiers CSS par composant
* `public` : fichiers statiques (favicon, index.html, manifest)

## Fonctionnalités

* Sélectionner un créneau dans le calendrier
* Réserver un créneau avec nom et email
* Voir les créneaux disponibles
* Message de confirmation après réservation

## Liens

* [Repo back](https://github.com/LudivineLeLan/BookMyMic-back.git)
* [API déployée sur Render](https://bookmymic.onrender.com/)
