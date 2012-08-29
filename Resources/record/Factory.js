(function() {
  var Factory, RecordEnemy, RecordItem;

  RecordEnemy = require('record/Enemy');

  RecordItem = require('record/Item');

  Factory = new ((function() {

    function _Class() {}

    _Class.prototype.get = function(parent, id, type) {
      switch (type) {
        case 1:
          return new RecordEnemy(parent);
        case 2:
          return new RecordItem(parent);
        default:
          return new RecordEnemy(parent);
      }
    };

    return _Class;

  })());

  module.exports = Factory;

}).call(this);
