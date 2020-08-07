function Notification(player, headset) {
    var self = this;
    this.player = player;
    this.headset = headset;
    this.notif = app.CreateNotification( "FullScreen,OnGoing" );
    this.notif.SetSmallImage('Img/radioTSF.png');

    this.init = function (logo, titre, texte) {
        this.logo = logo;
        this.titre = titre;
        this.texte = texte;
        this.reset();
    }
    this.message = function( titre, texte) {
        this.notif.SetMessage( '', titre, texte);
        this.notif.Notify(0);
    }
    this.setLogo = function(logo){
        this.notif.SetLargeImage(logo);
    }
    this.cancel = function() {
        this.notif.Cancel(0);
    }
    this.reset = function(){
        this.setLogo(this.logo);
        this.message(this.titre, this.texte);
    }
}