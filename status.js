function Status(player, headset) 
{
    var self = this;
    this.player = player;
    //this.device = null;
    // créer le detecteur de connexion
    this.headset = headset;
    this.headset = app.CreateHeadsetDetector();
    this.headset.SetOnDeviceChange(deviceChange);
    this.getPluged = function()
    {
        return this.headset.GetHeadsetState();
    }
    this.getGui = function() 
    {
        this.text = app.CreateText( this.getIcon(), 0.1, null, "FontAwesome,Right"  );
        this.text.SetPadding(0.01,0.01,0.01,0.01)
        this.text.SetTextSize(20);
        this.text.SetTextColor('white');
        this.text.SetOnTouchUp(function(){
            this.dialog = app.CreateDialog("radioTSF");
            this.layout = app.CreateLayout("Linear","VCenter");
            this.layout.SetPadding( 0.02, 0, 0.02, 0.02 );
            this.dialog.AddLayout(this.layout);
            this.about = app.CreateText(i18n.text('about'), 0.5,0.7,"Multiline,Html");
            this.layout.AddChild(this.about);
            this.dialog.Show();
        });
        return this.text;
    }
    this.getIcon = function()
    {
        var icon;
        if(this.getPluged()){
            icon = this.player.isPlaying() ? 'play' : 'bolt';
        } else {
            icon = this.player.isChosen() ? 'pause' : 'ban';
        }
        return '[fa-' + icon + ']';
    }
    this.update = function()
    {
        this.text.SetText(this.getIcon());
    }
}