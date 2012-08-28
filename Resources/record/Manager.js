(function() {
  var ETableView, RecordEnemy, RecordItem, RecordManager;

  ETableView = require('ui/ETableView');

  RecordEnemy = require('record/Enemy');

  RecordItem = require('record/Item');

  RecordManager = new ((function() {

    function _Class() {
      this.turn = 0;
      this._index = 0;
      this._rowData = [];
      this._tableView = new ETableView(this);
      this._setMock();
    }

    _Class.prototype._setMock = function() {
      var i, row, rowData, _i;
      rowData = [];
      for (i = _i = 1; _i < 6; i = ++_i) {
        if (i <= 3) {
          row = new RecordEnemy(this._tableView);
        } else {
          row = new RecordItem(this._tableView);
        }
        rowData.push(row);
        this._tableView.appendRow(row.get());
      }
      return this._rowData = rowData;
    };

    _Class.prototype.notify = function(func) {
      var i, _i, _len, _ref, _results;
      _ref = this._rowData;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i[func]());
      }
      return _results;
    };

    _Class.prototype.getTableView = function() {
      return this._tableView.getObject();
    };

    _Class.prototype.countUpTurn = function() {
      return this.turn++;
    };

    return _Class;

  })());

  module.exports = RecordManager;

}).call(this);
