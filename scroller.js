function Scroller (database,stored,player) 
{
    this.database = database;
    this.stored = stored;
    this.player = player;
    this.getGui = function() 
    {
        this.scroll = app.CreateScroller(1,0.3,"Horizontal");
        this.layout = app.CreateLayout("Linear","Horizontal,Left");
        this.scroll.AddChild(this.layout);
        return this.scroll;
    }
    this.addRadio = function(uuid) 
    {
        var radio = new Radio(uuid, this.database, this.stored, this.player);
        this.layout.AddChild(radio.getGui());
        return radio;
    }
}