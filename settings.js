function Settings(database, stored, scroller) {
    var self = this;
    this.database = database;
    this.stored = stored;
    this.scroller = scroller;

    this.stations = [];
    //---------------------------------- add layout
    this.drawer = app.CreateLayout("Linear", "Horizontal");
    //---------------------------------- search dialog
    this.search = app.CreateLayout("Linear", "FillXY");
    this.search.SetBackColor("#222222");
    this.title = app.CreateText("Community Radio Browser", 0.3, -1, "Center");
    this.title.SetTextSize(12);
    this.title.SetMargins(0, 0, 0, 0.03);
    this.search.AddChild(this.title);
    this.search.AddChild(app.CreateText(i18n.text('radio') + " :", 0.22, -1, "Left"));
    this.radio = app.CreateTextEdit("", 0.23, -1, "SingleLine");
    this.search.AddChild(this.radio);
    this.search.AddChild(app.CreateText(i18n.text('country') + " :", 0.22, -1, "Left"));
    this.country = app.CreateTextEdit("", 0.23, -1, "SingleLine");
    this.search.AddChild(this.country);
    this.search.AddChild(app.CreateText(i18n.text('tag') + " :", 0.22, -1, "Left"));
    this.tags = app.CreateTextEdit("", 0.23, -1, "SingleLine");
    this.search.AddChild(this.tags);
    this.button = app.CreateButton("[fa-search] " + i18n.text('search'), 0.22, -1, "FontAwesome");
    //---------------------------------- search start
    this.button.SetOnTouch(function() {
        self.list.RemoveAll();
        var rname = encodeURI(self.radio.GetText());
        var rcnty = encodeURI(self.country.GetText());
        var rtags = encodeURI(self.tags.GetText());
        app.ShowProgress("Chargement Stations");
        var urlapi = "https://fr1.api.radio-browser.info/json/stations/search?name="+rname+"&country="+rcnty+"&tag="+rtags+"&ponct=";
        app.HttpRequest("GET", urlapi, "", "", function(error, response) {
            if (!error) {
                self.stations = [];
                var found = JSON.parse(response);
                if (found.length == 0) {
                    alert(i18n.text('empty'));
                } else {
                    if (found.length > 50) {
                        alert(i18n.text('toomuch'));
                        found = found.slice(1, 50)
                    }
                    found.forEach(function(station) {
                        self.stations.push({
                            uuid: station.stationuuid,
                            name: station.name,
                            url: station.url,
                            homepage: station.homepage,
                            favicon: station.favicon,
                            tags: station.tags,
                            selected: self.stored[station.stationuuid]?true: false
                        });
                        self.list.AddItem(station.name, station.tags, self.stored[station.stationuuid]?"[fa-check]": "[fa-plus]");
                        app.HideKeyboard();
                    });
                }
            } else {
                app.ShowPopup(i18n.text('errconnect'));
            }
            app.HideProgress();
        });
    });
    this.search.AddChild(this.button);
    this.drawer.AddChild(this.search)

    //---------------------------------- select dialog
    this.list = app.CreateList("", 0.3, 1, "FontAwesome,WhiteGrad");
    this.list.SetBackColor('silver');
    this.list.SetTextColor("black");
    this.list.SetTextColor1("black");
    this.list.SetTextColor2("black");
    this.list.SetMargins(0, 0.01, 0, 0);
    //---------------------------------- select start
    this.list.SetOnTouch(function(title,
        body,
        type,
        index) {
        var station = self.stations[index];
        if (!station.selected) {
            self.database.add(station);
            station.selected = true;
            self.list.SetItemByIndex(index, title, body, "[fa-check]")
            self.stored[station.uuid] =
            {
                uuid: station.uuid,
                name: station.name,
                url: station.url,
                tags: station.tags,
                favicon: station.favicon,
                ecoute: 0
            }
            self.scroller.addRadio(station.uuid).loadFavicon();
        }
    });
    this.drawer.AddChild(this.list);
    app.AddDrawer(this.drawer,
        "right",
        0.6);
    app.LockDrawer("right");
    this.getGui = function() {
        this.text = app.CreateText("[fa-plus]",
            0.1,
            null,
            "FontAwesome,Left");
        this.text.SetPadding(0.01,
            0.01,
            0.01,
            0.01)
        this.text.SetTextSize(20);
        this.text.SetTextColor('white');
        this.text.SetOnTouchUp(function() {
            app.OpenDrawer("right");
        });
        return this.text;
    }
    this.clear = function() {
        this.list.RemoveAll();
    }
}