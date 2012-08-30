(function() {
  var Records;

  Records = new ((function() {

    function _Class() {
      var db;
      db = Ti.Database.open('mydb');
      db.execute('CREATE TABLE IF NOT EXISTS record_data ( id integer, type integer )');
      db.execute('DELETE FROM record_data');
      db.close;
    }

    _Class.prototype.insert = function(id, type) {
      var db;
      db = Ti.Database.open('mydb');
      db.execute('INSERT INTO record_data (id, type) values ( ?, ? )', id, type);
      return db.close();
    };

    _Class.prototype["delete"] = function(id) {
      var db;
      db = Ti.Database.open('mydb');
      return db.execute("DELETE FROM record_data where id = ?", id);
    };

    _Class.prototype.get_all = function() {
      var db, result, rows;
      db = Ti.Database.open('mydb');
      rows = db.execute('SELECT id, type FROM record_data');
      result = [];
      while (rows.isValidRow()) {
        result.push({
          id: rows.fieldByName('id'),
          type: rows.fieldByName('type')
        });
        rows.next();
      }
      rows.close();
      db.close();
      return result;
    };

    return _Class;

  })());

  module.exports = Records;

}).call(this);
