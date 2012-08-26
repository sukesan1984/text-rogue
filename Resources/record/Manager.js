(function() {
  var RecordManager;

  RecordManager = new ((function() {

    function _Class() {
      this.turn = 0;
    }

    _Class.prototype.getRecords = function() {
      var RecordEnemy, RecordItem, i, row, rowData, _i;
      RecordEnemy = require('record/Enemy');
      RecordItem = require('record/Item');
      rowData = [];
      for (i = _i = 1; _i < 6; i = ++_i) {
        if (i <= 3) {
          row = new RecordEnemy();
        } else {
          row = new RecordItem();
        }
        row.selectedBackgroundColor = '#fff';
        row.height = 60;
        row.className = 'datarow';
        rowData.push(row);
      }
      return rowData;
    };

    _Class.prototype.countUpTurn = function() {
      console.log(this.turn);
      return this.turn++;
    };

    return _Class;

  })());

  module.exports = RecordManager;

}).call(this);
