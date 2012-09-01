(function() {
  var EnemyMaster, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  EnemyMaster = (function(_super) {

    __extends(EnemyMaster, _super);

    function EnemyMaster() {
      var sql;
      this.execute('DROP TABLE IF EXISTS enemy_master');
      sql = 'CREATE TABLE IF NOT EXISTS\nenemy_master (\n    enemy_id integer\n    , type integer\n    , name text\n    , hp_max integer\n    , image text\n)';
      this.execute(sql);
      this.execute('DELETE FROM enemy_master');
      this.load();
      this.close();
    }

    EnemyMaster.prototype.load = function() {
      this.insert({
        enemy_id: 1,
        type: 1,
        name: "ドラゴン",
        hp_max: 10,
        image: "images/enemy/dragon.png"
      });
      return this.insert({
        enemy_id: 2,
        type: 1,
        name: "火の馬",
        hp_max: 20,
        image: "images/enemy/fire_horse.png"
      });
    };

    EnemyMaster.prototype.insert = function(master) {
      var sql;
      sql = 'INSERT INTO enemy_master\n(\n    enemy_id\n    , type\n    , name\n    , hp_max\n    , image\n)\nvalues\n(\n    ?\n    , ?\n    , ?\n    , ?\n    , ?\n)';
      this.execute(sql, master.enemy_id, master.type, master.name, master.hp_max, master.image);
      return this.close();
    };

    EnemyMaster.prototype.get_by_id = function(id) {
      var result, rows;
      rows = this.execute('SELECT * FROM enemy_master WHERE enemy_id = ? ', id);
      if (!rows.isValidRow()) {
        return;
      }
      result = {
        type: rows.fieldByName('type'),
        enemy_id: rows.fieldByName('enemy_id'),
        image: rows.fieldByName('image'),
        hp_max: rows.fieldByName('hp_max'),
        name: rows.fieldByName('name')
      };
      rows.close();
      this.close();
      return result;
    };

    return EnemyMaster;

  })(ModelBase);

  module.exports = EnemyMaster;

}).call(this);
