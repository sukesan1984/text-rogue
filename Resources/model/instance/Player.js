(function() {
  var ModelBase, PlayerInstance,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  PlayerInstance = (function(_super) {

    __extends(PlayerInstance, _super);

    function PlayerInstance() {
      var sql;
      this.execute('DROP TABLE IF EXISTS player_data');
      sql = 'CREATE TABLE IF NOT EXISTS\nplayer_data(\n    id integer PRIMARY KEY\n    , name text\n    , level integer\n    , hp_remain integer\n    , hp_max integer\n    , exp integer\n    , base_attack integer\n    , base_defence integer\n    , hungry_remain integer\n    , hungry_max integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM player_data');
      this.load();
      this.close();
    }

    PlayerInstance.prototype.load = function() {
      return this.insert({
        id: 1,
        name: "sukesan1984",
        level: 1,
        hp_remain: 30,
        hp_max: 30,
        base_attack: 2,
        base_defence: 2,
        exp: 0,
        hungry_remain: 100,
        hungry_max: 100
      });
    };

    PlayerInstance.prototype.getTableName = function() {
      return 'player_data';
    };

    PlayerInstance.prototype.update_hp = function(hp) {
      var id, sql;
      id = 1;
      sql = 'UPDATE\n    player_data\nSET\n    hp_remain = ?\nWHERE\n    id = ?';
      this.execute(sql, hp, id);
      this.cache.hp_remain = hp;
      return this.close();
    };

    PlayerInstance.prototype.insert = function(d) {
      var sql;
      sql = 'INSERT INTO player_data\n(\n    id\n    , name\n    , level\n    , hp_remain\n    , hp_max\n    , exp\n    , base_attack\n    , base_defence\n    , hungry_remain\n    , hungry_max\n)\nVALUES\n(\n    ?\n    , ?\n    , ?\n    , ?\n    , ?\n    , ?\n    , ?\n    , ?\n    , ?\n    , ?\n)';
      this.execute(sql, d.id, d.name, d.level, d.hp_remain, d.hp_max, d.exp, d.base_attack, d.base_defence, d.hungry_remain, d.hungry_max);
      return this.close();
    };

    PlayerInstance.prototype.get = function() {
      var result, rows;
      if (this.result) {
        return this.result;
      }
      rows = this.execute('SELECT * FROM player_data');
      if (!rows.isValidRow()) {
        return;
      }
      result = {
        id: rows.fieldByName('id'),
        name: rows.fieldByName('name'),
        level: rows.fieldByName('level'),
        hp_remain: rows.fieldByName('hp_remain'),
        hp_max: rows.fieldByName('hp_max'),
        exp: rows.fieldByName('exp'),
        base_attack: rows.fieldByName('base_attack'),
        base_defence: rows.fieldByName('base_defence'),
        hungry_remain: rows.fieldByName('hungry_remain'),
        hungry_max: rows.fieldByName('hungry_max')
      };
      rows.close();
      this.close();
      console.log(JSON.stringify(result));
      this.cache = result;
      return this.cache;
    };

    return PlayerInstance;

  })(ModelBase);

  module.exports = PlayerInstance;

}).call(this);
