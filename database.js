function Database(callback) {
    this.db = app.OpenDatabase("radioTSF");
    // supprimer la table
    // this.db.ExecuteSql( "DROP TABLE radio;" );
    // vider la table
    // this.db.ExecuteSql("DELETE FROM radio;");
    // Créé une table des stations.
    this.db.ExecuteSql("CREATE TABLE IF NOT EXISTS radio (uuid text primary key, name text, url text, tags text, favicon text, ecoute int)");
    var data = {};
    this.db.ExecuteSql("SELECT * FROM radio ORDER BY ecoute DESC;", [], function(resultats) {
        for (var i = 0; i < resultats.rows.length; i++) {
            var radio = resultats.rows.item(i);
            data[radio.uuid] = radio;
        }
        callback(data);
    });
    this.add = function(station) {
        this.db.ExecuteSql(
            "REPLACE INTO radio (uuid, name, url, tags, favicon, ecoute) VALUES (?,?,?,?,?,0)",
            [
                station.uuid,
                station.name,
                station.url,
                station.tags,
                station.favicon
            ]
        );
    }
    this.play = function(uuid) {
        this.db.ExecuteSql("UPDATE radio SET ecoute=ecoute+1 WHERE uuid='"+uuid+"'");
    }
    this.erase = function(uuid) {
        this.db.ExecuteSql("DELETE FROM radio WHERE uuid='"+uuid+"'");
    }
}