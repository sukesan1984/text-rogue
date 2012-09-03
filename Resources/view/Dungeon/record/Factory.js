(function() {
  var DungeonRecordFactory, RecordEnemy, RecordItem;

  RecordEnemy = require('view/dungeon/record/Enemy');

  RecordItem = require('view/dungeon/record/Item');

  DungeonRecordFactory = new ((function() {

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

  module.exports = DungeonRecordFactory;

}).call(this);
