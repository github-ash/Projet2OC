# Notes d'architecture

## Analyse du starter code

Les constats ci-dessous portent sur le starter code avant refactorisation. Les fichiers cités permettent de retrouver les exemples observés.

| Priorité | Catégorie | Constat et preuve |
| --- | --- | --- |
| Haute | Responsabilités | `src/app/pages/home/home.component.ts` et `country/country.component.ts` appelaient directement `HttpClient`; les pages connaissaient l'URL du JSON. |
| Haute | Typage | Les réponses et agrégations utilisaient `any` dans les deux pages, empêchant la vérification des propriétés. |
| Haute | Flux de données | Le nom du pays était lu dans un abonnement distinct du chargement des données; l'ordre asynchrone pouvait laisser le pays indéfini. |
| Moyenne | Responsabilités | Les pages calculaient les statistiques et géraient directement Chart.js au lieu de déléguer l'affichage à des composants. |
| Moyenne | Erreurs | Les erreurs n'étaient pas présentées de façon cohérente à l'utilisateur et pouvaient exposer les détails techniques. |
| Basse | Tests | Les tests générés étaient minimaux et le test racine attendait un ancien titre qui n'existait plus dans `AppComponent`. |

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
