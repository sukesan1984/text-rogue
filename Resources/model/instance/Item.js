(function() {
  var ItemInstance, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  ItemInstance = (function(_super) {

    __extends(ItemInstance, _super);

    function ItemInstance() {
      var sql;
      this.execute('DROP TABLE IF EXISTS item_data');
      sql = 'CREATE TABLE IF NOT EXISTS\nitem_data(\n    id integer PRIMARY KEY\n    , item_id integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM item_data');
      this.close();
    }

    ItemInstance.prototype.insert = function(id, i) {
      var sql;
      sql = 'INSERT INTO item_data\n(\n    id\n    , item_id\n)\nVALUES\n(\n    ?\n    , ?\n)';
      this.execute(sql, id, i.item_id);
      return this.close();
    };

    ItemInstance.prototype.get_by_id = function(id) {
      var result, rows;
      rows = this.execute('SELECT * FROM item_data WHERE id = ?', id);
      if (!rows.isValidRow()) {
        return;
      }
      result = {
        id: rows.fieldByName('id'),
        item_id: rows.fieldByName('item_id')
      };
      rows.close();
      this.close();
      return result;
    };

    return ItemInstance;

  })(ModelBase);

  module.exports = ItemInstance;

}).call(this);
