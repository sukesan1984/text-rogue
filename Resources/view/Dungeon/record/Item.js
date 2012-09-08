(function() {
  var ModelFactory, RecordBase, RecordItem,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('view/dungeon/record/Base');

  ModelFactory = require('model/Factory');

  RecordItem = (function(_super) {

    __extends(RecordItem, _super);

    function RecordItem(row) {
      this.modelItemInstance = ModelFactory.get("ItemInstance");
      this.item_data = this.modelItemInstance.get_by_id(row.id);
      this.modelItemMaster = ModelFactory.get("ItemMaster");
      this.item_master = this.modelItemMaster.get_by_id(this.item_data.item_id);
      RecordItem.__super__.constructor.call(this, row);
      this.message.setText(this.item_master.name + "を見つけた");
    }

    RecordItem.prototype._backgroundImage = function() {
      return this.item_master.image;
    };

    RecordItem.prototype.onClick = function(e) {
      var dialog;
      this.model["delete"](this.id);
      dialog = Titanium.UI.createAlertDialog();
      dialog.setTitle('GET');
      dialog.setMessage(this.item_master.name + 'を手に入れた');
      dialog.show();
      return RecordItem.__super__.onClick.call(this, e);
    };

    RecordItem.prototype.action = function() {
      if (!this.row.getHasCheck()) {

      }
    };

    return RecordItem;

  })(RecordBase);

  module.exports = RecordItem;

}).call(this);
