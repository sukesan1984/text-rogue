(function() {
  var ModelFactory, RecordController, RecordFactory;

  ModelFactory = require('model/Factory');

  RecordFactory = require('record/Factory');

  RecordController = (function() {

    function RecordController(view) {
      this._view = view;
      this._turn = 0;
      this._rowData = [];
      this._rowObjects = [];
      this._setMock();
    }

    RecordController.prototype._setMock = function() {
      var e_master, enemy_id, id, modelEnemyData, modelEnemyMaster, modelRecords, modelSeq, rand;
      rand = parseInt(Math.random() * 100);
      modelRecords = ModelFactory.get("Records");
      modelSeq = ModelFactory.get("FieldSequencial");
      id = modelSeq.get();
      if (rand <= 10) {
        enemy_id = rand <= 5 ? 1 : 2;
        modelEnemyMaster = ModelFactory.get("EnemyMaster");
        e_master = modelEnemyMaster.get_by_id(enemy_id);
        modelEnemyData = ModelFactory.get("Enemy");
        modelEnemyData.insert(id, e_master);
        modelRecords.insert(id, 1);
      } else if (rand <= 60) {
        modelRecords.insert(id, 2);
      } else {

      }
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
        r = RecordFactory.get(row);
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
