function I18n(lang) {
    var string = locales['en'];
    if (lang != 'en' && locales[lang]) {
        for (var i in locales[lang]) {
            string[i] = locales[lang][i];
        }
    }
    this.string = string;
    this.text = function(item) {
        return this.string[item];
    }
}

locales = {
    "en": {
        "waitplug": "Plug a speaker",
        "add": "Add radios",
        "delete": "Delete des radios",
        "about": "About RadioTSF...",
        "errconnect": "Connection error",
        "empty": "Empty result",
        "toomuch": "Too many results, only the first 50 are displayed",
        "exit": "Exit",
        "erase": "Delete",
        "loading": "Loading",
        "radio": "Radio",
        "country": "Country",
        "tag": "Tag",
        "search": "Search",
        "choose": "Choose Radio",
        "dwnerror": "Impossible to download favicon: ",
        "about": "radioTSF is an Internet radio player for listening with a speaker or headphones, wired or Bluetooth. Playback pauses if there is no connected device.<br><br>Adding a radio station is done from the Radio Browser community database.<br><br>Copyleft &copy; Laurent PROTT 2020<br/><br/><b>Acknowledgments</b><h2>Community Radio Browser</h2>for radio stations database<br><a href=\"http://www.radio-browser.info/\">http://www.radio-browser.info/</a><br/><br/><h2>Jason Custer</h2>for Headset Detector plugin (Droidscript)<br><a href=\"https://ds.justplayer.de/uploads/33\">https://ds.justplayer.de/uploads/33</a>",
        "favicon": "Reload icon from Internet",
        "gallery": "Load icon from file...",
        "searching" : "Searching stations",
        "lost" : "Signal lost"
    },
    "fr": {
        "waitplug": "Brancher une enceinte",
        "add": "Ajouter des radios",
        "delete": "Supprimer des radios",
        "about": "A propos de RadioTSF...",
        "errconnect": "Erreur de connexion",
        "empty": "Resultat vide",
        "toomuch": "Trop de réponses, seules les 50 premières sont affichées",
        "exit": "Quitter",
        "erase": "Supprimer",
        "loading": "Chargement",
        "radio": "Radio",
        "country": "Pays",
        "tag": "Tag",
        "search": "Rechercher",
        "choose": "Choisir une radio",
        "dwnerror": "Chargement icone impossible: ",
        "about": "radioTSF est un lecteur de radio Internet pour l'écoute avec une enceinte ou un casque, en filaire ou en Bluetooth. La lecture se met en pause en cas d'absence de périphérique connecté.<br><br>L'ajout de station radio est fait à partir de la base de données de la communauté Radio Browser.<br><br>Copyleft &copy; Laurent PROTT 2020<br/><br/><b>Remerciements</b><h2>Community Radio Browser</h2>pour la base de données des stations radios<br><a href=\"http://www.radio-browser.info/\">http://www.radio-browser.info/</a><br/><br/><h2>Jason Custer</h2>pour Headset Detector plugin (Droidscript)<br><a href=\"https://ds.justplayer.de/uploads/33\">https://ds.justplayer.de/uploads/33</a>",
        "favicon": "Recharger l'icône depuis Internet",
        "gallery": "Charger un icône depuis un fichier...",
        "searching" : "Recherche des stations"
        "lost" : "Signal perdu"
    }
}