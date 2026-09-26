# Architecture front-end

## Organisation

```text
src/app/
  components/
    country-medal-chart/       # Courbe des médailles par année
    medal-pie-chart/           # Répartition par pays et sélection d'un pays
    statistics-summary/        # Affichage partagé des indicateurs
  models/                      # Types des pays, participations et indicateurs
  pages/
    home/                      # Tableau de bord
    country/                   # Détail d'un pays
    not-found/                 # Route inconnue
  services/
    data.service.ts            # Chargement et recherche des données
```

## Responsabilités et données

Les composants de `pages/` orchestrent l'affichage, les indicateurs et la navigation. Les composants de `components/` sont dédiés à une présentation précise; les composants Chart.js détruisent leur instance à leur destruction ou avant de la recréer.

`DataService`, déclaré avec `providedIn: 'root'`, est le point d'accès unique aux données olympiques. Il expose des `Observable` typés; les pages ne lisent pas directement le fichier JSON. Les interfaces dans `models/` décrivent les pays et leurs participations.

## Évolution vers une API

Le service lit actuellement `assets/mock/olympic.json`. Pour connecter un back-end, son implémentation pourra appeler un endpoint REST via `HttpClient` tout en conservant les mêmes types et méthodes. Les pages continueront ainsi à dépendre du contrat du service et non de l'emplacement ou du format de stockage des données.
