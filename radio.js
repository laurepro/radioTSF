function Radio (uuid, database, stored, player) {
    var self = this;
    this.database = database;
    this.stored = stored;
    this.player = player;
    this.data = stored[uuid];
    this.move = false;
    this.kill = false;
    this.getGui = function() {
        if (!this.layout) {
            this.layout = app.CreateLayout("Linear", "VCenter,Wrap,Center");
            this.layout.SetPadding(0.005, 0.03, 0.005, 0);
            this.setAction(this.layout);
            this.image = app.CreateImage("Img/station.png", -1, 0.2);
            this.resetFavicon();
            this.setAction(this.image);
            this.layout.AddChild(this.image);
            this.title = app.CreateText(this.data.name);
            this.setAction(this.title);
            this.layout.AddChild(this.title);
        }
        return this.layout;
    }
    this.resetFavicon = function() {
        this.image.SetImage(image_directory + "/" + this.data.uuid, self.image.GetWidth(), -1);
    }
    this.loadFavicon = function() {
        var icone = image_directory + "/" + this.data.uuid;
        var dl = app.CreateDownloader();
        var self = this;
        dl.SetOnDownload(function(path) {
            self.image.SetImage(icone, self.image.GetWidth(), -1);
            if (self.player.getChosen() == self.data.uuid) {
                self.player.resetLogo();
            }
        });
        dl.SetOnError(function(error) {
            alert(i18n.text('dwnerror')+error);
            app.CopyFile("Img/station.png", icone);
        });
        dl.Download(this.data.favicon,
            image_directory,
            this.data.uuid);

    }
    this.setAction = function(objet) {
        objet.radio = this;
        objet.SetOnTouchDown(function(e) {
            this.radio.onTouchDown(e);
        });
        objet.SetOnTouchMove(function(e) {
            this.radio.onTouchMove(e);
        });
        objet.SetOnTouchUp(function(e) {
            this.radio.onTouchUp(e);
        });
        objet.SetOnLongTouch(function(e) {
            this.radio.onLongTouch(e)});
    }
    this.onTouchDown = function(e) {
        this.X = e.X;
        this.Y = e.Y;
    }
    this.onTouchMove = function(e) {
        if ((this.X-e.X) > 0.03 || (this.Y-e.Y) > 0.03) this.move = true;
    }
    this.onTouchUp = function(e) {
        if (this.move) {
            this.move = false;
            return;
        }
        if (this.kill) {
            this.kill = false;
            return;
        }
        this.player.choose(this);
    }
    this.onLongTouch = function(e) {
        if (this.move) {
            return;
        }
        this.kill = true;
        if (confirm(i18n.text('erase') +" "+this.data.name+" ?")) {
            this.database.erase(this.data.uuid);
            this.stored[this.data.uuid] = false;
            app.DeleteFile(image_directory+"/"+this.data.uuid);
            this.layout.SetVisibility('Gone');
        }
    }
}