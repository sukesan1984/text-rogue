(function() {
  var Factory, RecordEnemy, RecordItem;

  RecordEnemy = require('record/Enemy');

  RecordItem = require('record/Item');

  Factory = new ((function() {

    function _Class() {}

    _Class.prototype.get = function(row) {
      switch (row.type) {
        case 1:
          return new RecordEnemy(row);
        case 2:
          return new RecordItem(row);
        default:
          return new RecordEnemy(row);
      }
    };

    return _Class;

  })());

  module.exports = Factory;

}).call(this);
