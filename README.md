# radioTSF

## Lecteur Internet Radio

DroidScript project

### Pourquoi ce projet

J'ai fait dernièrement l'acquisition d'une TSF [Grundig 2030W/3D](https://www.doctsf.com/grundig-2030-w-3d/f16253?PHPSESSID=eeb3169901e62365c3b26333f107a384) en parfait état de marche. 

Pour la "moderniser", j'y ai connecté un Chromecast, mais son mode de fonctionnement ne me satisfaisait pas. J'y ai donc connecté une tablette ancienne, qui n'avais alors plus d'utilité, et y ait installé spotify.

Comme je suis aussi un grand consommateur de radio, j'ai essayé plusieurs applications mais aucune d'elle ne me donnait entièrement satisfaction.

Et comme je souhaite utiliser cette application sur mon smartphone connecté à mon autoradio, je voulais éviter de le manipuler à chaque fois que j'entre ou je sors de ma voiture.

### Objectif

* sélectionner des radios parmis un catalogue le plus large possible
* lire le streaming uniquement si un appareil d'écoute externe est connecté
  * arrêter la lecture si l'appareil est déconnecté
  * reprendre la lecture quand l'appareil est reconnecté
* avoir une interface la plus simple possible

### Prérequis

* [DroidScript](http://droidscript.org/) JavaScript IDE
* [HeadsetDetector](https://ds.justplayer.de/uploads/33) Plugin DroidScript

### Interface

* bouton [**+**]  
  * Toucher pour rechercher et selectionner des radios dans le catalogue [Community Radio Station](https://fr1.api.radio-browser.info/)
* liste des radios sélectionnées
  * Toucher pour passer une radio en mode lecture
  * Toucher long pour supprimer la radio
* radio en mode lecture
  * Toucher long pour recharger l'icône de la radio ou en charger un autre depuis la gallerie
  * activation de la lecture à la connexion d'un appareil externe.

### Appareils externes

Sont compatibles toutes les enceintes, casques, ecouteurs, autoradios, filaire ou bluetooth A2DP

### Remerciements

* [Community Radio Station](https://www.radio-browser.info/gui/#!/) pour son important catalogue de radios
* Jason Custer pour son plugin HeadsetDetector sans lequel ce projet n'aurait pas pu exister

___