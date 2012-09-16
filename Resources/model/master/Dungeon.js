(function() {
  var DungeonMaster, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  DungeonMaster = (function(_super) {

    __extends(DungeonMaster, _super);

    function DungeonMaster() {
      var sql;
      this.execute('DROP TABLE IF EXISTS dungeon_master');
      sql = 'CREATE TABLE IF NOT EXISTS\ndungeon_master (\n    dungeon_id integer\n    , name text\n    , lv integer\n    , image text\n )';
      this.execute(sql);
      this.execute('DELETE FROM dungeon_master');
      this.load();
      this.close();
    }

    DungeonMaster.prototype.load = function() {
      return this.insert({
        dungeon_id: 1,
        name: "始まりの洞窟",
        lv: 1,
        image: "images/dungeon/hajimari.png"
      });
    };

    DungeonMaster.prototype.insert = function(master) {
      var sql;
      sql = 'INSERT INTO dungeon_master\n(\n    dungeon_id\n    , name\n    , lv\n    , image\n)\nvalues\n(\n    ?\n    , ?\n    , ?\n    , ?\n)';
      this.execute(sql, master.dungeon_id, master.name, master.lv, master.image);
      return this.close();
    };

    DungeonMaster.prototype.get_by_id = function(id) {
      var result, rows;
      rows = this.execute('SELECT * FROM dungeon_master WHERE dungeon_id = ? ', id);
      if (!rows.isValidRow()) {
        return;
      }
      result = {
        dungeon_id: rows.fieldByName('dungeon_id'),
        image: rows.fieldByName('image'),
        name: rows.fieldByName('name'),
        lv: rows.fieldByName('lv')
      };
      rows.close();
      this.close();
      return result;
    };

    return DungeonMaster;

  })(ModelBase);

  module.exports = DungeonMaster;

}).call(this);
