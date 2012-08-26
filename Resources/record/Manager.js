(function() {
  var RecordManager;

  RecordManager = new ((function() {

    function _Class() {
      this.turn = 0;
      this._index = 0;
      this._records = [];
      this._rowData = [];
      this._tableView;
      this._setMock();
    }

    _Class.prototype._setMock = function() {
      var RecordEnemy, RecordItem, i, index, row, rowData, rowObjects, _i;
      RecordEnemy = require('record/Enemy');
      RecordItem = require('record/Item');
      rowData = [];
      rowObjects = [];
      for (i = _i = 1; _i < 6; i = ++_i) {
        index = this.getIndex();
        if (i <= 3) {
          row = new RecordEnemy(index);
        } else {
          row = new RecordItem(index);
        }
        this._incrementIndex();
        rowData.push(row.getRow());
        rowObjects.push(row);
      }
      this._records = rowObjects;
      return this._rowData = rowData;
    };

    _Class.prototype.getIndex = function() {
      return this._index;
    };

    _Class.prototype._incrementIndex = function() {
      return this._index++;
    };

    _Class.prototype.setTableView = function(tableView) {
      return this._tableView = tableView;
    };

    _Class.prototype.getRecords = function() {
      return this._rowData;
    };

    _Class.prototype.notifyRecords = function(func) {
      var i, _i, _len, _ref;
      _ref = this._records;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        i[func](this._tableView, i.getName());
      }
    };

    _Class.prototype.countUpTurn = function() {
      return this.turn++;
    };

    return _Class;

  })());

  module.exports = RecordManager;

}).call(this);
