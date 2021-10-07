# 📖 Microtypographie - Exemples de fixers

Dans le cadre de ma conférence sur la microtypographie pour Paris Web 2021, je vous propose ce petit projet, à destination de vos développeurs,
qui a pour ambition de comparer quelques outils qui pourraient vous aider à améliorer la lecture sur votre site Web.

Il s'agit d'un petit site développé avec Symfony, à faire tourner en local afin de tester ces outils sur différentes pages web.

## Installation 

### prérequis 

Avoir [Composer](https://getcomposer.org/) et [Symfony CLI](https://symfony.com/download) (pour utiliser le serveur web intégré, mais un autre serveur web comme NGINX ou Apache peut être utilisé) installés.

### étapes

- Cloner ce repo
- Installer les packages avec Composer : `composer install`
- Démarrer le serveur `symfony server:start` (ou via tout autre serveur web)
- Se rendre sur l'une des URLs suivantes : 


Pour tester [JoliTypo](https://github.com/jolicode/JoliTypo) :
`http://localhost:8000/jolitypo`

Pour tester [PHP-Typography](https://github.com/mundschenk-at/php-typography) :
`http://localhost:8000/php-typography`

Pour tester [Smartypants et son extension, Typgrapher](https://github.com/michelf/php-smartypants) :
`http://localhost:8000/smartypants`
`http://localhost:8000/smartypants-typographer`

Pour tester [Typography Fixer](https://github.com/abe33/typography-fixer) :
`http://localhost:8000/typography-fixer`

Pour tester [Twig Typography](https://github.com/parisek/twig-typography) :
`http://localhost:8000/twig-typography`


## Utilisation

Le fichier texte situé sous `/public/base.txt` contient du texte à tester. Il peut contenir du HTML, du texte brut, tout ce que vous voulez tester ! 
Je vous invite à le modifier selon vos besoins.

Rendez vous ensuite sur les urls dédiées aux différents fixers pour voir le résultat.Une page de ce type va s'afficher : 

![Capture d'écran](/img/capture.png "Capture d'écran")

(Les colonnes sont volontairement étroites afin de tester l'hyphénisation sur les titres.)


**En haut à gauche** : le texte brut tel que vous le voyez dans le fichier `base.txt`

**En haut à droite** : le texte brut, non interprété par le navigateur, une fois corrigé par le fixer. Cela permet une visibilité sur les entités HTML 
utilisées par exemple.

**En bas à gauche** : le texte original tel qu'interprété par le navigateur.

**En bas à droite** : Le texte modifié par le fixer et interprété par le navigateur.

