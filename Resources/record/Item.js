(function() {
  var RecordBase, RecordItem,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('record/Base');

  RecordItem = (function(_super) {

    __extends(RecordItem, _super);

    function RecordItem() {
      return RecordItem.__super__.constructor.apply(this, arguments);
    }

    RecordItem.prototype._backgroundImage = function() {
      return 'images/hammer.png';
    };

    RecordItem.prototype.action = function(parent, name) {
      if (!this.row.getHasCheck()) {
        return;
      }
      return parent.deleteRow(parent.getIndexByName(name));
    };

    RecordItem.prototype.hoge = function() {
      return RecordItem.__super__.hoge.call(this);
    };

    return RecordItem;

  })(RecordBase);

  module.exports = RecordItem;

}).call(this);
