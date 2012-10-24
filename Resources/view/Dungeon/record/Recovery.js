(function() {
  var ModelFactory, RecordBase, RecordFloor,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('view/dungeon/record/Base');

  ModelFactory = require('model/Factory');

  RecordFloor = (function(_super) {

    __extends(RecordFloor, _super);

    function RecordFloor(row) {
      RecordFloor.__super__.constructor.call(this, row);
      this.setMessage("回復アイテム");
    }

    RecordFloor.prototype._backgroundImage = function() {
      return "images/instance/potion.png";
    };

    RecordFloor.prototype.onClick = function(e) {
      var modelPlayer, player, player_hp;
      modelPlayer = ModelFactory.get("PlayerInstance");
      this.model["delete"](this.id);
      player = modelPlayer.get();
      if ((player.hp_remain + 3) > player.hp_max) {
        player_hp = player.hp_max;
      } else {
        player_hp = player.hp_remain + 3;
      }
      modelPlayer.update_hp(player_hp);
      this.modelLogsInstance.insert(6, "hp 3 回復");
      return RecordFloor.__super__.onClick.call(this, e);
    };

    RecordFloor.prototype.action = function() {};

    return RecordFloor;

  })(RecordBase);

  module.exports = RecordFloor;

}).call(this);
