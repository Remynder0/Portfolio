# Portfolio Aquarium

Portfolio personnel interactif construit avec React et Vite, avec une direction artistique inspirée d’un aquarium. Le projet met en avant des projets de développement dans une interface animée, immersive et responsive.

## Apercu

L’application affiche un univers visuel animé avec un fond aquarium, des poissons interactifs, un écran de chargement et une modale pour consulter le détail d’un projet. Les données affichées dans l’interface viennent du fichier de configuration des projets.

## Technologies

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- Lucide React

## Prerequis

- Node.js installe sur la machine
- npm disponible dans le terminal

## Installation

```bash
npm install
```

## Commandes utiles

| Commande | Description |
| --- | --- |
| `npm install` | Installe les dependances du projet |
| `npm run dev` | Lance le serveur de developpement Vite avec rechargement a chaud |
| `npm run build` | Produit une version de production optimisee dans `dist/` |
| `npm run preview` | Previsualise localement la version de production apres build |

## Fonctionnalites

- fond aquarium anime et ambiance visuelle personnalisee
- affichage responsive adapte aux ecrans desktop et mobile
- chargement initial avec ecran de transition
- consultation des projets via une modale dediee
- donnees des projets centralisees dans un fichier JSON

## Structure du projet

```text
index.html
package.json
vite.config.js
postcss.config.js
tailwind.config.js
src/
  main.jsx
  App.jsx
  config.js
  index.css
  components/
    AquariumBackground.jsx
    Fish.jsx
    fishEasterEgg.js
    LoadingScreen.jsx
    ProjectModal.jsx
  data/
    projects.json
  images/
    aquarium/
    fish/
    projects/
```

## Entrypoints utiles

- `src/main.jsx` monte l’application React.
- `src/App.jsx` contient la logique principale du portfolio.
- `src/data/projects.json` regroupe les projets affiches.
- `src/components/ProjectModal.jsx` gere l’affichage detaille d’un projet.
- `src/components/AquariumBackground.jsx` construit le decor anime.

## Notes

Le projet est configure comme une application front moderne standard. Pour ajouter un projet, il suffit en general de mettre a jour `src/data/projects.json` puis de verifier l’affichage dans l’interface.