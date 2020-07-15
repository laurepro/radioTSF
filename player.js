function Player(headset, mediacom) {
    var self = this;
    this.headset = headset;
    this.mediacom = mediacom;
    this.radio = false;
    this.setStatus = function(status) {
        this.status = status;
    }
    this.getGui = function() {
        //---------------------------------- media player
        this.media = app.CreateMediaPlayer();
        this.media.SetVolume(1, 1);
        this.media.SetOnReady(function() {
            app.HideProgress();
            if (self.headset.GetHeadsetState()) {
                self.mediacom.SendAvrcpMeta(self.radio.data.name);
                self.media.Play();
            }
            self.status.update(true);
        });
        //---------------------------------- media layout
        this.layout = app.CreateLayout("Linear");
        //---------------------------------- onplay logo
        var c = app.GetOrientation() == "Portrait";
        this.logo = app.CreateImage("Img/radioTSF.png",
            c?0.8: -1,
            c?-1: 0.58);
        var m = c ? (0.6 - this.logo.GetHeight()) / 2: 0;
        this.logo.SetMargins(0,
            m,
            0,
            m);
        this.logo.SetOnLongTouch(function() {
            if (self.radio) {
                var that = this;
                this.dialog = app.CreateDialog("Modifier l'icône");
                this.layout = app.CreateLayout("Linear", "VCenter");
                this.layout.SetPadding(0.02, 0, 0.02, 0.02);
                this.dialog.AddLayout(this.layout);
                this.favicon = app.CreateButton(i18n.text('favicon'));
                this.favicon.SetOnTouch(function() {
                    that.dialog.Hide();
                    self.radio.loadFavicon();
                });
                this.layout.AddChild(this.favicon);
                this.gallery = app.CreateButton(i18n.text('gallery'));
                this.gallery.SetOnTouch(function() {
                    that.dialog.Hide();
                    app.ChooseImage("internal", function(path) {
                        var icone = image_directory + "/" + self.radio.data.uuid;
                        app.CopyFile(path, icone);
                        self.logo.SetImage(icone, -1, 0.6);
                        self.radio.resetFavicon();
                    });
                });
                this.layout.AddChild(this.gallery);
                this.dialog.Show();
            }
        });
        this.layout.AddChild(this.logo);
        //---------------------------------- media_onplay text
        this.text = app.CreateText("",
            0.8,
            0.06);
        this.text.SetTextSize(15);
        this.text.SetTextColor('white');
        this.layout.AddChild(this.text);
        //---------------------------------- Control volume
        this.volume = app.CreateSeekBar(0.8,
            0.06);
        this.volume.SetRange(100);
        this.volume.SetValue(app.GetVolume("Music")*100);
        this.volume.SetOnChange(function() {
            app.SetVolume("Music", this.GetValue()/100);
        });
        this.layout.AddChild(this.volume);
        return this.layout;
    }
    this.setLoadImage = function(loadImage) {
        this.loadImage = loadImage;
    }
    this.startPlay = function() {
        if (this.radio) {
            //---------------------------------- AVRCP meta
            this.mediacom.SendAvrcpMeta('radioTSF',i18n.text('loading') + " ... " + this.radio.data.name,'');
            app.ShowProgress(i18n.text('loading') + " ... " + this.radio.data.name);
            this.media.SetFile(this.radio.data.url);
            this.status.update();
        }
    }
    this.stopPlay = function() {
        this.media.Stop();
        app.HideProgress();
    }
    this.signalStart = function() {
        if (this.headset.GetHeadsetState() && this.player.IsReady()) {
            this.player.Play();
        }
    }
    this.signalStop = function() {
        // nop
    }
    this.isPlaying = function() {
        return this.isChosen() && this.media.IsPlaying();
    }
    this.resetLogo = function() {
        this.logo.SetImage(image_directory + "/" + this.radio.data.uuid, this.logo.GetWidth(), -1);
    }
    this.choose = function(radio) {
        this.radio = radio;
        this.text.SetText(radio.data.name);
        this.resetLogo();
        if (this.headset.GetHeadsetState()) this.startPlay();
        this.status.update(false);
    }
    this.unChoose = function() {
        this.radio = false;
        this.text.SetText('radioTSF');
        this.logo.SetImage("Img/radioTSF.png");
        this.status.update(false);
    }
    this.getChosen = function() {
        return this.isChosen() ? this.radio.data.uuid: false;
    }
    this.isChosen = function() {
        return this.radio ? true: false;
    }
}