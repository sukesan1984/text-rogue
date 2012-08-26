(function() {
  var RecordManager;

  RecordManager = new ((function() {

    function _Class() {
      this.turn = 0;
      this._records = [];
      this._setMock();
    }

    _Class.prototype._setMock = function() {
      var RecordEnemy, RecordItem, i, row, rowData, _i;
      RecordEnemy = require('record/Enemy');
      RecordItem = require('record/Item');
      rowData = [];
      for (i = _i = 1; _i < 6; i = ++_i) {
        row = new RecordEnemy();
        row.selectedBackgroundColor = '#fff';
        row.height = 60;
        row.className = 'datarow';
        rowData.push(row);
      }
      return this._records = rowData;
    };

    _Class.prototype.getRecords = function() {
      return this._records;
    };

    _Class.prototype.notifyRecords = function(func) {
      var i, _i, _len, _ref, _results;
      _ref = this._records;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i.log());
      }
      return _results;
    };

    _Class.prototype.countUpTurn = function() {
      return this.turn++;
    };

    return _Class;

  })());

  module.exports = RecordManager;

}).call(this);
