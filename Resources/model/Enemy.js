(function() {
  var Enemy, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy() {
      var sql;
      sql = 'CREATE TABLE IF NOT EXISTS\nenemy_data (\n    id integer\n    , enemy_id integer\n    , hp_remain integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM enemy_data');
      this.close();
    }

    Enemy.prototype.insert = function(id, e) {
      var sql;
      sql = 'INSERT INTO enemy_data\n(\n    id\n    , enemy_id\n    , hp_remain\n)\nvalues\n(\n    ?\n    , ?\n    , ?\n)';
      this.execute(sql, id, e.enemy_id, e.hp_max);
      return this.close();
    };

    Enemy.prototype["delete"] = function(id) {
      this.execute("DELETE FROM enemy_data where id = ?", id);
      return this.close();
    };

    Enemy.prototype.get_by_id = function(id) {
      var result, rows;
      rows = this.execute('SELECT * FROM enemy_data where id = ?', id);
      if (!rows.isValidRow()) {
        return;
      }
      result = {
        id: rows.fieldByName('id'),
        enemy_id: rows.fieldByName('enemy_id'),
        hp_remain: rows.fieldByName('hp_remain')
      };
      rows.close();
      this.close();
      return result;
    };

    Enemy.prototype.get_all = function() {
      var result, rows;
      rows = this.execute('SELECT * FROM enemy_data');
      result = [];
      while (rows.isValidRow()) {
        result.push({
          id: rows.fieldByName('id'),
          enemy_id: rows.fieldByName('enemy_id'),
          hp_remain: rows.fieldByName('hp_remain')
        });
        rows.next();
      }
      rows.close();
      this.close();
      return result;
    };

    return Enemy;

  })(ModelBase);

  module.exports = Enemy;

}).call(this);
