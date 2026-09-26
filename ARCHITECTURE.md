# Architecture front-end

## Organisation

```text
src/app/
  components/
    header/                    # Titre de page et indicateurs réutilisables
    country-medal-chart/       # Courbe des médailles par année
    medal-pie-chart/           # Répartition par pays et sélection d'un pays
  models/                      # Types des pays, participations et indicateurs
  pages/
    home/                      # Tableau de bord
    country/                   # Détail d'un pays
    not-found/                 # Route inconnue
  services/
    data.service.ts            # Chargement et recherche des données
```

## Responsabilités et données

Les composants de `pages/` orchestrent le chargement, les indicateurs et la navigation. `HeaderComponent` reçoit un titre et une liste d'indicateurs, et est partagé par le tableau de bord et le détail. Les graphiques reçoivent leurs données par inputs; la sélection d'un pays émet son ID au tableau de bord. Les composants Chart.js détruisent leur instance avant de la recréer et à leur destruction.

`DataService`, déclaré avec `providedIn: 'root'`, est le point d'accès unique aux données olympiques. Il expose des `Observable` typés et recherche un pays par ID; les pages ne lisent pas directement le fichier JSON. Les interfaces dans `models/` décrivent les pays, leurs participations et les indicateurs.

Les routes sont `/` et `/country/:id`. Les composants de page présentent des états de chargement, de données absentes et d'erreur; les abonnements suivent le cycle de vie Angular avec `takeUntilDestroyed`.

## Évolution vers une API

Le service lit actuellement `assets/mock/olympic.json`. Pour connecter un back-end, son implémentation pourra appeler un endpoint REST via `HttpClient` tout en conservant les mêmes types et méthodes. Les pages continueront ainsi à dépendre du contrat du service et non de l'emplacement ou du format de stockage des données.
