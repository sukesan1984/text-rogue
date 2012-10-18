(function() {
  var DungeonRecordFactory, RecordEnemy, RecordFloor, RecordItem, RecordNextTurn, RecordSelectDungeon;

  RecordEnemy = require('view/dungeon/record/Enemy');

  RecordItem = require('view/dungeon/record/Item');

  RecordFloor = require('view/dungeon/record/Floor');

  RecordSelectDungeon = require('view/dungeon/record/SelectDungeon');

  RecordNextTurn = require('view/dungeon/record/NextTurn');

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
        case 4:
          return new RecordSelectDungeon(row);
        case 5:
          return new RecordNextTurn(row);
        default:
          return new RecordEnemy(row);
      }
    };

    return _Class;

  })());

  module.exports = DungeonRecordFactory;

}).call(this);
