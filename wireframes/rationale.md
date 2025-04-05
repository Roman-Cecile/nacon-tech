# Présentation et explication des choix

## Carousel view
J'ai choisi le carousel car il à un avantage esthétique et permet de concentrer l'attention sur l'élément en cours d'affichage. De plus, chaque item affiché prend plus de place et pourrait permettre d'afficher plus d'informations qu'une simple carte dans un grid view.
Cependant, l'utilisateur peut être frustré par le nombre de clics nécessaires pour naviguer entre chaque item, surtout s'il y a un grand nombre d'items. Évidemment, il y a une perte de vue d'ensemble des items. 
Il y a deux wireframes du carousel car je souhaitais suivre la consigne à savoir, "__Displays one product at a time__", mais je souhaitais également montrer une version avec l'affichage de l'item précédent et l'item suivant.
L'affichage d'une seul item à la fois ne semble pas adapté à une application de store en ligne. La variation avec 3 items affichés apporte améliore la visibilité des items et permet de les comparer mais cela reste limité.

## Grid view

J'avais choisi le grid layout initialement car il permet de créer des éléments qui s'adaptent à la taille de l'écran et de les aligner facilement. De plus, l'utilisateur peut facilement naviguer dans l'app entre chaque item. 
Un filtre et une barre de recherche permettent d'afficher uniquement les items qui correspondent à la recherche et au filtre.
Cependant, face à un grand nombre d'items, le grid layout peut être un peu lourd et prendre du temps à charger.
Pour conclure, ce layout est très pratique mais doit etre utilisé avec précaution. Si l'écran doit afficher de nombreux items, il peut être judicieux d'utiliser un autre layout ou d'intégrer une pagination.


## Infinite scroll
C'est pour répondre au problème précédemment soulevé que j'ai finalement ajouté l'infinite scroll. Cette fonctionnalité ajouté à la grid view permet d'afficher de nombreux items sans avoir à les charger tous en une seule fois. 
La grid view, couplée avec cette pagination semble être une solution très pratique pour ce type d'application.