(function() {
  var DungeonRecordFactory, RecordEnemy, RecordFloor, RecordItem;

  RecordEnemy = require('view/dungeon/record/Enemy');

  RecordItem = require('view/dungeon/record/Item');

  RecordFloor = require('view/dungeon/record/Floor');

  DungeonRecordFactory = new ((function() {

    function _Class() {}

    _Class.prototype.get = function(row) {
      switch (row.type) {
        case 1:
          return new RecordEnemy(row);
        case 2:
          return new RecordItem(row);
        case 3:
          return new RecordFloor(row);
        default:
          return new RecordEnemy(row);
      }
    };

    return _Class;

  })());

  module.exports = DungeonRecordFactory;

}).call(this);
