(function() {
  var ETableView, ModelRecords, RecordFactory, RecordManager;

  ETableView = require('ui/ETableView');

  ModelRecords = require('model/Records');

  RecordFactory = require('record/Factory');

  RecordManager = new ((function() {

    function _Class() {
      this.turn = 0;
      this._index = 0;
      this._rowData = [];
      this._tableView = new ETableView(this);
      this._setMock();
    }

    _Class.prototype._setMock = function() {
      var i, r, row, rowData, rows, _i, _j, _len;
      for (i = _i = 1; _i < 6; i = ++_i) {
        if (i <= 3) {
          ModelRecords.insert(i, 1);
        } else {
          ModelRecords.insert(i, 2);
        }
      }
      rowData = [];
      rows = ModelRecords.get_all();
      for (_j = 0, _len = rows.length; _j < _len; _j++) {
        row = rows[_j];
        r = RecordFactory.get(this._tableView, row.id, row.type);
        rowData.push(r);
        this._tableView.appendRow(r.get());
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
