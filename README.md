# Creation-Api

API REST pour gérer des artistes avec support de :
- formats de réponse JSON / XML / CSV
- traduction via `Accept-Language`
- versioning HTTP simple avec header `X-API-Version`
- HATEOAS sur les ressources artiste

## Endpoints

- `GET /api/v1/artists` : liste des artistes
- `GET /api/v1/artists/:id` : détail d'un artiste
- `POST /api/v1/artists` : création d'un artiste
- `PATCH /api/v1/artists/:id` : modification partielle
- `DELETE /api/v1/artists/:id` : suppression

## Contenu et formats

- `Accept: application/json` ou `Accept: */*` → JSON
- `Accept: text/xml` ou `Accept: application/xml` → XML
- `Accept: text/csv` ou `Accept: application/csv` → CSV (collection seulement)
- `Accept-Language: fr` ou `Accept-Language: en` → traduction des champs `bio`

## Exemple JSON

```json
{
  "name": "Daft Punk",
  "genre": "Electronic",
  "bio": {
    "fr": "Un duo de musique électronique français...",
    "en": "A French electronic music duo..."
  }
}
```

## Installation

```bash
npm install
npm run dev
```

## Base de données

Le projet utilise SQLite (`database.sqlite`) et Sequelize. Le serveur crée/synchronise les tables à chaque démarrage.

## Améliorations ajoutées

- négociation de contenu basée sur `Accept`
- traduction JSON robuste
- versioning HTTP avec en-têtes `X-API-Version`, `Deprecation`, `Sunset`, `Link`
- documentation améliorée
