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
      this._rowObjects = [];
      this._tableView = new ETableView(this);
      this._setMock();
    }

    _Class.prototype._setMock = function() {
      var i, _i;
      for (i = _i = 1; _i < 6; i = ++_i) {
        if (i <= 3) {
          ModelRecords.insert(this._index, 1);
        } else {
          ModelRecords.insert(this._index, 2);
        }
        this._index++;
      }
      return this.reload();
    };

    _Class.prototype.notify = function(func) {
      var i, _i, _len, _ref, _results;
      _ref = this._rowObjects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i[func]());
      }
      return _results;
    };

    _Class.prototype.reload = function() {
      var r, row, rowData, rowObjects, rows, _i, _j, _len, _len1, _ref;
      rowData = [];
      rowObjects = [];
      _ref = this._rowData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        this._tableView.deleteRow[0];
      }
      rows = ModelRecords.get_all();
      for (_j = 0, _len1 = rows.length; _j < _len1; _j++) {
        row = rows[_j];
        r = RecordFactory.get(this._tableView, row.id, row.type);
        rowData.push(r.get());
        rowObjects.push(r);
      }
      this._rowData = rowData;
      this._rowObjects = rowObjects;
      return this._tableView.setData(this._rowData);
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
