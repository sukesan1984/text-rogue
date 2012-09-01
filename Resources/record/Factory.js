(function() {
  var Factory, RecordEnemy, RecordItem;

  RecordEnemy = require('record/Enemy');

  RecordItem = require('record/Item');

  Factory = new ((function() {

    function _Class() {}

    _Class.prototype.get = function(id, type) {
      switch (type) {
        case 1:
          return new RecordEnemy(id);
        case 2:
          return new RecordItem(id);
        default:
          return new RecordEnemy(id);
      }
    };

    return _Class;

  })());

  module.exports = Factory;

}).call(this);
