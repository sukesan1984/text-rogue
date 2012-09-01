(function() {
  var ModelFactory, RecordController, RecordFactory;

  ModelFactory = require('model/Factory');

  RecordFactory = require('record/Factory');

  RecordController = (function() {

    function RecordController(view) {
      this._view = view;
      this._turn = 0;
      this._index = 0;
      this._rowData = [];
      this._rowObjects = [];
      this._setMock();
    }

    RecordController.prototype._setMock = function() {
      var modelRecords, rand;
      rand = parseInt(Math.random() * 100);
      modelRecords = ModelFactory.get("Records");
      if (rand <= 10) {
        modelRecords.insert(this._index, 1);
      } else if (rand <= 60) {
        modelRecords.insert(this._index, 2);
      } else {

      }
      this._index++;
      return this.reload();
    };

    RecordController.prototype.notify = function(func) {
      var i, _i, _len, _ref, _results;
      _ref = this._rowObjects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i[func]());
      }
      return _results;
    };

    RecordController.prototype.reload = function() {
      var modelRecords, r, row, rowData, rowObjects, rows, _i, _len;
      rowData = [];
      rowObjects = [];
      this._view.deleteAll(this._rowData);
      modelRecords = ModelFactory.get("Records");
      rows = modelRecords.get_all();
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        r = RecordFactory.get(row.id, row.type);
        rowData.push(r.get());
        rowObjects.push(r);
      }
      this._rowData = rowData;
      this._rowObjects = rowObjects;
      return this._view.setData(rowData);
    };

    RecordController.prototype.countUpTurn = function() {
      return this._turn++;
    };

    return RecordController;

  })();

  module.exports = RecordController;

}).call(this);
