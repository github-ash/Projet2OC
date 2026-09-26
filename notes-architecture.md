# Notes d'architecture

## Analyse du starter code

Les constats ci-dessous portent sur le starter code avant refactorisation. Les fichiers cités permettent de retrouver les exemples observés.

**Priorité haute - responsabilités :** les pages effectuaient elles-mêmes les requêtes HTTP et connaissaient le chemin du JSON.

**Preuves :** `src/app/pages/home/home.component.ts` (`ngOnInit`) et `src/app/pages/country/country.component.ts` (`ngOnInit`).

**Priorité haute - typage :** les réponses et les traitements de données utilisaient `any`, empêchant TypeScript de vérifier les propriétés.

**Preuves :** `src/app/pages/home/home.component.ts` et `src/app/pages/country/country.component.ts` (appels `http.get<any[]>`, puis accès aux champs des pays et participations).

**Priorité haute - flux de données :** le paramètre de route du pays était lu dans un abonnement séparé de la requête HTTP. Le nom pouvait donc ne pas être défini au moment où les données étaient traitées.

**Preuve :** `src/app/pages/country/country.component.ts` (`ngOnInit`, abonnement à `route.paramMap` puis abonnement HTTP distinct).

**Priorité moyenne - responsabilités :** les pages calculaient les statistiques et construisaient directement les graphiques Chart.js au lieu de déléguer leur affichage.

**Preuves :** `src/app/pages/home/home.component.ts` (`buildPieChart`) et `src/app/pages/country/country.component.ts` (`buildChart`).

**Priorité moyenne - gestion des erreurs :** les erreurs étaient envoyées à la console ou conservées dans une propriété, mais elles n'étaient pas présentées clairement dans les pages.

**Preuves :** les callbacks d'erreur dans `src/app/pages/home/home.component.ts` et `src/app/pages/country/country.component.ts`; les templates `src/app/pages/home/home.component.html` et `src/app/pages/country/country.component.html` n'affichaient pas ces erreurs.

**Priorité basse - tests :** les tests générés étaient minimaux et le test racine attendait encore un titre et un contenu qui n'existaient plus dans le composant racine.

**Preuves :** `src/app/app.component.spec.ts` (attentes sur `title` et l'ancien template) et `src/app/app.component.ts` (composant racine sans cette propriété).

## Structure retenue

```text
src/app/
  components/
    header/                    # Titre et indicateurs réutilisables
    country-medal-chart/       # Courbe Chart.js des médailles par année
    medal-pie-chart/           # Répartition des médailles, émet le pays sélectionné
  models/
    olympic-country.model.ts
    olympic-participation.model.ts
    statistic.model.ts
  pages/
    country/                  # Route et indicateurs d'un pays
    home/                     # Tableau de bord et navigation vers un pays
    not-found/
  services/
    data.service.ts            # Source unique des données olympiques
```

Les pages orchestrent les états, les indicateurs et les routes `/` et `/country/:id`; `HeaderComponent` affiche le titre et les indicateurs sur les deux pages. Les composants Chart.js reçoivent leurs données, exposent une sélection de pays accessible au clavier et libèrent leur instance au démontage. `DataService`, fourni à la racine par Angular, centralise la lecture des données et la recherche par ID. Cette séparation rend la source remplaçable par une API sans déplacer les appels HTTP dans les vues. Il n'y a pas besoin d'un état global dédié pour ce jeu de données simple.

## Vérifications à effectuer

- Compiler en mode strict avec `npm run build`.
- Lancer `npm start` et vérifier les routes, le retour, les données vides et un ID inconnu.
- Vérifier la responsivité à 320 px et sur un écran large; utiliser aussi les commandes clavier pour sélectionner un pays.
- Compiler avec `npm run build`. Les tests Karma nécessitent Chrome Headless.
