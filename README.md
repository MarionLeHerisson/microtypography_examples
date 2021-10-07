# 📖 Microtypographie - Exemples de fixers

Dans le cadre de ma conférence sur la microtypographie pour Paris Web 2021, je vous propose ce petit projet, à destination de vo sdéveloppeurs,
qui a pour ambition de comparer quelques outils qui pourraient vous aider à améliorer la lecture sur votre site Web.

Il s'agit d'un petit site développé avec Symfony, à faire tourner en local afin de tester ces outils sur différentes pages web.

## Installation 

### prérequis 

- Cloner ce repo
- Installer les packages avec Composer
- Lancer le serveur symfony `symfony server:start`
- Se rendre sur l'url `http://localhost:8000/NOM_DE_LA_LIB`

## Utilisation

Le fichier texte situé sous `/public/base.txt` contient du texte à tester. Il peut contenir du HTML, du texte brut, tout ce que vous voulez tester ! 
Je vous invite à le modifier selon vos besoins.

Rendez vous ensuite sur les urls dédiées aux différents fixers pour voir le résultat.Une page de ce type va s'afficher : 

![Capture d'écran](/img/capture.png "Capture d'écran")

(Les colonnes sont volontairement étroites afin de tester l'hyphénisation sur les titres.)


**En haut à gauche** : le texte brut tel que vous le voyez dans le fichier `base.txt`

**En bas à gauche** : le texte original tel qu'interprété par le navigateur.

**En haut à droite** : le texte brut, non interprété par le navigateur, une fois corrigé par le fixer. Cela permet une visibilité sur les entités HTML 
utilisées par exemple.

**En bas à droite** : Le texte modifié par le fixer et interprété par le navigateur.

Les Fixers testés ici sont les suivants : 

### JoliTypo
`http://localhost:8000/jolitypo`

### PHP Typography
`http://localhost:8000/php-typography`

### Smartypants et son extension, Typgrapher
`http://localhost:8000/smartypants`
`http://localhost:8000/smartypants-typographer`

### Typography Fixer 
`http://localhost:8000/typography-fixer`

### Twig Typography
`http://localhost:8000/twig-typography`
