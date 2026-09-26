# Notes d'architecture

## Analyse du starter code

- Les pages d'accueil et de détail appellent toutes les deux `HttpClient` et connaissent le chemin du fichier JSON. Si la source change, plusieurs composants doivent être modifiés.
- Les réponses HTTP sont typées avec `any`; les propriétés et réductions de données ne sont donc pas vérifiées par TypeScript.
- La page d'accueil calcule les indicateurs, prépare les données et crée directement son graphique Chart.js. La page de détail fait de même, en plus de gérer la route et de retrouver le pays.
- Dans la page de détail, le nom du pays est affecté dans un abonnement distinct de celui des données. L'ordre d'arrivée des deux flux peut faire chercher un pays avec une valeur encore nulle.
- Les erreurs sont principalement envoyées à la console ou stockées sans présentation cohérente dans l'interface.
- Les templates ont très peu de composants spécialisés; le balisage et les rôles d'affichage sont regroupés dans les pages.
- Le build initial passe, mais les spécifications de composants sont des tests minimaux qui ne configurent pas les dépendances injectées des pages.

## Structure retenue

```text
src/app/
  components/
    country-medal-chart/       # Courbe Chart.js des médailles par année
    medal-pie-chart/           # Répartition des médailles, émet le pays sélectionné
    statistics-summary/        # Affichage réutilisable des indicateurs
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

Les pages orchestrent la navigation et les indicateurs; les composants enfants se limitent à l'affichage. `DataService`, fourni à la racine par Angular, centralise la lecture des données et la recherche d'un pays. Les interfaces décrivent les objets métier. Cette séparation rend la source de données remplaçable par une API sans déplacer les appels HTTP dans les vues. Il n'y a pas besoin d'un état global dédié pour ce jeu de données simple.

## Vérifications à effectuer

- Compiler en mode strict avec `npm run build`.
- Lancer `ng serve` et vérifier le tableau de bord, l'ouverture d'un pays depuis le graphique, le retour à l'accueil et une URL de pays inconnue.
- Exécuter les tests Angular si un navigateur compatible avec Karma est disponible.
