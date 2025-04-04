# Présentation et explication des choix

## Grid view

J'ai choisi le grid layout car il permet de créer des éléments qui s'adaptent à la taille de l'écran et de les aligner facilement. De plus, l'utilisateur peut facilement naviguer dans l'app entre chaque item. 
Un filtre et une barre de recherche pourront permettre d'afficher uniquement les items qui correspondent à la recherche et au filtre.
Cependant, face à un grand nombre d'items, le grid layout peut être un peu lourd et prendre du temps à charger.
Pour conclure, ce layout est très pratique mais doit etre utilisé avec précaution. Si l'écran doit afficher de nombreux items, il peut être judicieux d'utiliser un autre layout ou d'intégrer une pagination.


## Carousel view
J'ai choisi le carousel car il à un avantage esthétique et permet de concentrer l'attention sur l'élément en cours d'affichage. De plus, chaque item affiché prend plus de place et pourrait permettre d'afficher plus d'informations qu'une simple carte dans un grid layout.
Cependant, l'utilisateur peut être frustré par le nombre de clics nécessaires pour naviguer entre chaque item, surtout s'il y a un grand nombre d'items. Évidemment, il y a une perte de vue d'ensemble des items.
Pour conclure, ce layout est très pratique mais ne semble pas être le plus adapté à ce type d'application dans ce cas précis.

## Infinite scroll
Je n'ai pas choisi le infinite scroll car l'affichage que j'aurais choisi aurait été trop similaire au grid layout. Cependant, c'est l'affichage le plus adapté à ce type d'application mais des filtres et une barre de recherche devront être implémentés pour permettre à l'utilisateur de naviguer facilement entre les items.