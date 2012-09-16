(function() {
  var Enemy, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy() {
      var sql;
      this.execute('DROP TABLE IF EXISTS enemy_data');
      sql = 'CREATE TABLE IF NOT EXISTS\nenemy_data (\n    id integer\n    , enemy_id integer\n    , hp_remain integer\n    , message text\n)';
      this.execute(sql);
      this.execute('DELETE FROM enemy_data');
      this.close();
    }

    Enemy.prototype.getTableName = function() {
      return "enemy_data";
    };

    Enemy.prototype.insert = function(id, e) {
      var sql;
      sql = 'INSERT INTO enemy_data\n(\n    id\n    , enemy_id\n    , hp_remain\n    , message\n)\nvalues\n(\n    ?\n    , ?\n    , ?\n    , ?\n)';
      this.execute(sql, id, e.enemy_id, e.hp_max, e.name + "が現れた！！");
      return this.close();
    };

    Enemy.prototype["delete"] = function(id) {
      this.execute("DELETE FROM enemy_data where id = ?", id);
      return this.close();
    };

    Enemy.prototype.update = function(updates, id) {
      var sql;
      sql = 'UPDATE enemy_data\nset\n    hp_remain = ?\n    , message = ?\nwhere\n    id = ?';
      this.execute(sql, updates.hp_remain, updates.message, id);
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
        hp_remain: rows.fieldByName('hp_remain'),
        message: rows.fieldByName('message')
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
          hp_remain: rows.fieldByName('hp_remain'),
          message: rows.fieldByName('message')
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
