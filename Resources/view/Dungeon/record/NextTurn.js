(function() {
  var RecordBase, RecordNextTurn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('view/dungeon/record/Base');

  RecordNextTurn = (function(_super) {

    __extends(RecordNextTurn, _super);

    function RecordNextTurn(row) {
      RecordNextTurn.__super__.constructor.call(this, row);
      this.setMessage("進む");
    }

    RecordNextTurn.prototype._backgroundImage = function() {
      return "images/floor/ashiato.png";
    };

    RecordNextTurn.prototype.onClick = function(e) {
      return RecordNextTurn.__super__.onClick.call(this, e);
    };

    return RecordNextTurn;

  })(RecordBase);

  module.exports = RecordNextTurn;

}).call(this);
