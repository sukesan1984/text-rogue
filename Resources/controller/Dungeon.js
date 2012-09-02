(function() {
  var DungeonController, DungeonLogView, ModelFactory, RecordFactory, StatusView;

  ModelFactory = require('model/Factory');

  RecordFactory = require('record/Factory');

  DungeonLogView = require('view/DungeonLogView');

  StatusView = require('view/StatusView');

  DungeonController = (function() {

    function DungeonController() {
      var _this = this;
      this._turn = 0;
      this._rowData = [];
      this._rowObjects = [];
      this.win = Ti.UI.createWindow({
        backgroundColor: '#FFFFFF'
      });
      this.win.hideNavBar();
      this.dungeonLogView = new DungeonLogView();
      this.dungeonLogView.appendedTo(this.win);
      this.statusView = new StatusView();
      this.statusView.appendedTo(this.win);
      this.statusView.addObserver('click', function(e, pushed) {
        return _this.dungeonLogView.onClick(e, pushed);
      });
      this.goButton = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.DONE,
        height: 50,
        width: 300,
        bottom: 10,
        title: "GO"
      });
      this.goButton.addEventListener('click', function(e) {
        _this.countUpTurn();
        _this.notify("action");
        _this.reload();
        _this._setMock();
      });
      this._setMock();
      this.win.add(this.goButton);
      return this.win;
    }

    DungeonController.prototype._setMock = function() {
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

    DungeonController.prototype.notify = function(func) {
      var i, _i, _len, _ref, _results;
      _ref = this._rowObjects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i[func]());
      }
      return _results;
    };

    DungeonController.prototype.reload = function() {
      var modelRecords, r, row, rowData, rowObjects, rows, _i, _len;
      rowData = [];
      rowObjects = [];
      this.dungeonLogView.deleteAll(this._rowData);
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
      return this.dungeonLogView.setData(rowData);
    };

    DungeonController.prototype.countUpTurn = function() {
      return this._turn++;
    };

    return DungeonController;

  })();

  module.exports = DungeonController;

}).call(this);
