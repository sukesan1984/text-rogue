(function() {
  var ModelFactory, RecordBase, RecordSelectDungeon,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('view/dungeon/record/Base');

  ModelFactory = require('model/Factory');

  RecordSelectDungeon = (function(_super) {

    __extends(RecordSelectDungeon, _super);

    function RecordSelectDungeon(row) {
      RecordSelectDungeon.__super__.constructor.call(this, row);
      this.row.setHasChild(true);
      this.setMessage("始まりの洞窟ハマジリ");
    }

    RecordSelectDungeon.prototype._backgroundImage = function() {
      return "images/dungeon/hajimari.png";
    };

    RecordSelectDungeon.prototype.onClick = function(e) {
      return RecordSelectDungeon.__super__.onClick.call(this, e);
    };

    RecordSelectDungeon.prototype.action = function() {};

    return RecordSelectDungeon;

  })(RecordBase);

  module.exports = RecordSelectDungeon;

}).call(this);
