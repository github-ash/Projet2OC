# TéléSport Olympic Games

Application Angular de consultation des médailles olympiques par pays. Le tableau de bord présente les totaux et permet d’ouvrir le détail d’un pays; la page détail présente ses indicateurs et l’évolution de ses médailles par édition.

## Sommaire

- [Prérequis](#prérequis)
- [Installation et lancement](#installation-et-lancement)
- [Pages](#pages)
- [Structure](#structure)
- [Données et décisions techniques](#données-et-décisions-techniques)
- [Captures](#captures)
- [Vérifications](#vérifications)
- [Limites](#limites)

## Prérequis

- Node.js 18.19+, 20.11+ ou 22+
- npm

Le projet utilise Angular 18. L’Angular CLI global n’est pas nécessaire; les scripts npm utilisent la version locale du projet.

## Installation et lancement

```bash
npm install
npm start
```

Ouvrir [http://localhost:4200](http://localhost:4200). Pour compiler une version de production :

```bash
npm run build
```

Les tests se lancent avec `npm test`. Pour les exécuter en mode headless, une installation de Chrome compatible avec Karma est requise :

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Pages

- `/` : indicateurs globaux et graphique interactif des médailles par pays.
- `/country/:id` : participations, médailles, athlètes et évolution pour le pays correspondant à l’ID numérique.
- Une route ou un ID inconnu affiche la page `not-found`.

Les pages affichent également les états de chargement, de données absentes et d’erreur. Sur le tableau de bord, le chargement peut être relancé; la page détail propose un retour au tableau de bord.

## Structure

```text
src/app/
	components/       # Header réutilisable et graphiques Chart.js
	models/           # Interfaces pays, participation et indicateurs
	pages/            # Pages associées aux routes
	services/         # Accès centralisé aux données
src/assets/mock/    # Jeu de données olympiques simulé
```

Voir [ARCHITECTURE.md](ARCHITECTURE.md) pour les responsabilités des composants et du service.

## Données et décisions techniques

`DataService` lit `assets/mock/olympic.json` et expose des `Observable` typés. Les pages utilisent les IDs des pays dans les routes et agrègent leurs indicateurs; les composants Chart.js se limitent à afficher les données et sont détruits avec leur composant Angular. `takeUntilDestroyed` gère les abonnements de page.

## Captures

Les captures desktop (`dashboard.png`, `country-detail.png`) et mobile (`dashboard-mobile.jpg`, `country-detail-mobile.jpg`) sont disponibles dans `captures-ui/` et regroupées dans `captures-ui.zip`.

## Vérifications

- `npm run build`
- Parcours manuel : tableau de bord, clic sur un pays, retour, ID inconnu.
- Mise en page responsive et navigation clavier.

## Limites

- Les données sont statiques; aucune API distante ni persistance n’est configurée.
- Un pays sans participations affiche un état vide.
