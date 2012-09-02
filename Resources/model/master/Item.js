(function() {
  var ItemMaster, ModelBase,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ModelBase = require('model/Base');

  ItemMaster = (function(_super) {

    __extends(ItemMaster, _super);

    function ItemMaster() {
      var sql;
      this.execute('DROP TABLE IF EXISTS item_master');
      sql = 'CREATE TABLE IF NOT EXISTS\nitem_master (\n    item_id integer PRIMARY KEY\n    , type integer\n    , name text\n    , image text\n    , attack integer\n    , defence integer\n)';
      this.execute(sql);
      this.execute('DELETE FROM item_master');
      this.load();
      this.close();
    }

    ItemMaster.prototype.load = function() {
      this.insert({
        item_id: 1,
        type: 1,
        name: "エクスカリバー",
        image: "images/item/sword.png",
        attack: 10,
        defence: 0
      });
      this.insert({
        item_id: 2,
        type: 1,
        name: "最強のハンマー",
        image: "images/item/hammer.png",
        attack: 100,
        defence: 0
      });
      return this.insert({
        item_id: 3,
        type: 2,
        name: "いかれた盾",
        image: "images/item/shield.png",
        attack: 0,
        defence: 10
      });
    };

    ItemMaster.prototype.insert = function(master) {
      var sql;
      sql = 'INSERT INTO item_master\n(\n    item_id\n    , type\n    , name\n    , image\n    , attack\n    , defence\n)\nVALUES\n(\n    ?\n    , ?\n    , ?\n    , ?\n    , ?\n    , ?\n)';
      this.execute(sql, master.item_id, master.type, master.name, master.image, master.attack, master.defence);
      return this.close();
    };

    ItemMaster.prototype.get_by_id = function(id) {
      var result, rows;
      rows = this.execute('SELECT * FROM item_master WHERE item_id = ?', id);
      if (!rows.isValidRow()) {
        return;
      }
      result = {
        item_id: rows.fieldByName('item_id'),
        type: rows.fieldByName('type'),
        name: rows.fieldByName('name'),
        image: rows.fieldByName('image'),
        attack: rows.fieldByName('attack'),
        defence: rows.fieldByName('defence')
      };
      rows.close();
      this.close();
      return result;
    };

    return ItemMaster;

  })(ModelBase);

  module.exports = ItemMaster;

}).call(this);
