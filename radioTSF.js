// pour forcer la permission bluetooth
app.IsBluetoothOn();

// plugin detection connexion speaker
app.LoadPlugin("HeadsetDetector");
// plugin action media additionnelles
app.LoadPlugin("MediaCompanion");

// classes
app.LoadScript("i18n.js")
app.LoadScript("radio.js");
app.LoadScript("player.js");
app.LoadScript("status.js");
app.LoadScript("database.js");
app.LoadScript("settings.js");
app.LoadScript("scroller.js");

// globales
var
i18n = {},
image_directory = "/sdcard/radioTSF";
objects = {};

//démarrage
function OnStart() {

    // chargement des traductions
    i18n = new I18n(app.GetLanguageCode());

    // masquer les favicon telecharges
    app.MakeFolder(image_directory);
    app.WriteFile(image_directory + "/.nomedia", "");

    // gérer le backKey
    app.EnableBackKey(false);

    // fixer l'orientation
    app.SetOrientation(app.GetOrientation());

    // chargement des radios enregistrées
    objects['database'] = new Database(function(data) {
        objects['mediacom'] = app.CreateMediaCompanion();
        objects['mediacom'].SetOnSignalStatusChange(signalStatusChange);
        objects['mediacom'].SendAvrcpMeta('radioTSF');
        objects['headset'] = app.CreateHeadsetDetector();
        objects['headset'].SetOnDeviceChange(deviceChange);
        objects['stored'] = data;
        objects['player'] = new Player(objects['headset'], objects['mediacom']);
        objects['status'] = new Status(objects['player'], objects['headset']);
        objects['player'].setStatus(objects['status']);
        objects['scroll'] = new Scroller(objects['database'], objects['stored'], objects['player']);
        objects['settings'] = new Settings(objects['database'], objects['stored'], objects['scroll']);

        //---------------------------------- main layout
        main_layout = app.CreateLayout("Linear");
        app.AddLayout(main_layout);

        //---------------------------------- controls layout
        control_layout = app.CreateLayout("Linear", "Horizontal,FillX");
        main_layout.AddChild(control_layout);

        //---------------------------------- add button
        control_layout.AddChild(objects['settings'].getGui());
        //---------------------------------- media player
        control_layout.AddChild(objects['player'].getGui());
        //---------------------------------- status indicator
        control_layout.AddChild(objects['status'].getGui());
        //---------------------------------- radios scroller
        main_layout.AddChild(objects['scroll'].getGui());
        //---------------------------------- radio items
        for (uuid in objects['stored']) {
            objects['scroll'].addRadio(uuid)
        };
    });

}

function OnBack() {
    if (app.GetDrawerState("right") == "Open") {
        app.CloseDrawer("right");
        objects['settings'].clear();
    } else if (objects['player'].isChosen()) {
        if (objects['player'].isPlaying()) {
            objects['player'].stopPlay();
            objects['mediacom'].SendAvrcpMeta('radioTSF');
        }
        objects['player'].unChoose();
    } else {
        objects['mediacom'].SendAvrcpMeta('radioTSF');
        app.Exit();
    }
}

function deviceChange(state) {
    switch (state) {
        case "unpluged":
            case "disconnected":
                case "noisy":
                    objects['player'].stopPlay();
                    break;
                case "pluged":
                    case "connected":
                        objects['player'].startPlay();
                        break;
            }
            objects['status'].update();
            app.ShowPopup(state);
    }

    function signalStatusChange(state) {
        switch (state) {
            case "Lost":
                objects['player'].signalStop();
                break;
            case "Gain":
                objects['player'].signalStart();
                break;
        }
        app.ShowPopup('Signal ' + state)
    }