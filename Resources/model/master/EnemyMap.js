(function() {
  var EnemyMapMaster, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  EnemyMapMaster = (function(_super) {

    __extends(EnemyMapMaster, _super);

    function EnemyMapMaster() {
      var sql;
      this.execute('DROP TABLE IF EXISTS enemy_map_master');
      sql = 'CREATE TABLE IF NOT EXISTS\nenemy_map_master(\n    dungeon_id integer,\n    floor integer,\n    enemy_id integer,\n    probability integer,\n    PRIMARY KEY ( dungeon_id, floor, enemy_id )\n)';
      this.execute(sql);
      this.execute('DELETE FROM enemy_map_master');
      this.load();
      this.close();
    }

    EnemyMapMaster.prototype.load = function() {
      this.insert({
        dungeon_id: 1,
        floor: 1,
        enemy_id: 1,
        probability: 10
      });
      this.insert({
        dungeon_id: 1,
        floor: 1,
        enemy_id: 2,
        probability: 30
      });
      this.insert({
        dungeon_id: 1,
        floor: 1,
        enemy_id: 3,
        probability: 30
      });
      return this.insert({
        dungeon_id: 1,
        floor: 1,
        enemy_id: 4,
        probability: 30
      });
    };

    EnemyMapMaster.prototype.insert = function(master) {
      var sql;
      sql = 'INSERT INTO enemy_map_master\n(\n    dungeon_id\n    , floor\n    , enemy_id\n    , probability\n)\nVALUES\n(\n    ?\n    , ?\n    , ?\n    , ?\n)';
      this.execute(sql, master.dungeon_id, master.floor, master.enemy_id, master.probability);
      return this.close();
    };

    EnemyMapMaster.prototype.get = function(dungeon_id, floor) {
      var result, rows;
      rows = this.execute('SELECT * FROM enemy_map_master WHERE dungeon_id = ? AND floor = ?', dungeon_id, floor);
      result = [];
      while (rows.isValidRow()) {
        result.push({
          dungeon_id: rows.fieldByName('dungeon_id'),
          floor: rows.fieldByName('floor'),
          enemy_id: rows.fieldByName('enemy_id'),
          probability: rows.fieldByName('probability')
        });
        rows.next();
      }
      rows.close();
      this.close();
      return result;
    };

    EnemyMapMaster.prototype.get_enemy_id = function(current) {
      var e, enemy_map, probability, seed, _i, _len;
      enemy_map = this.get(current.dungeon_id, current.floor);
      seed = this.get_rand(100);
      probability = 0;
      for (_i = 0, _len = enemy_map.length; _i < _len; _i++) {
        e = enemy_map[_i];
        probability += e.probability;
        if (probability >= seed) {
          return e.enemy_id;
        }
      }
    };

    return EnemyMapMaster;

  })(ModelBase);

  module.exports = EnemyMapMaster;

}).call(this);
