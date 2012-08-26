(function() {
  var RecordBase, RecordEnemy,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RecordBase = require('record/Base');

  RecordEnemy = (function(_super) {

    __extends(RecordEnemy, _super);

    function RecordEnemy() {
      return RecordEnemy.__super__.constructor.apply(this, arguments);
    }

    RecordEnemy.prototype._backgroundImage = function() {
      return 'images/dragon.png';
    };

    return RecordEnemy;

  })(RecordBase);

  module.exports = RecordEnemy;

}).call(this);
