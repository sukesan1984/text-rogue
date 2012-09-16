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
      this.row.setHasChild(true);
      this.message.setText("階段だ！");
    }

    RecordFloor.prototype._backgroundImage = function() {
      return "images/floor/kaidan.png";
    };

    RecordFloor.prototype.onClick = function(e) {
      this.modelLogsInstance.insert(3, "階段を下りた");
      return RecordFloor.__super__.onClick.call(this, e);
    };

    RecordFloor.prototype.action = function() {};

    return RecordFloor;

  })(RecordBase);

  module.exports = RecordFloor;

}).call(this);
