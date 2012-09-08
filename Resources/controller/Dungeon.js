(function() {
  var DungeonController, DungeonLogView, DungeonRecordFactory, ModelFactory, StatusView, Styles, styles;

  ModelFactory = require('model/Factory');

  DungeonRecordFactory = require('view/dungeon/record/Factory');

  DungeonLogView = require('view/dungeon/Log');

  StatusView = require('view/dungeon/Status');

  Styles = require('view/layout/DungeonStyle');

  styles = Styles.get();

  DungeonController = (function() {

    function DungeonController() {
      var logTableView, statusView,
        _this = this;
      this._turn = 0;
      this._rowData = [];
      this._rowObjects = [];
      this.win = Ti.UI.createWindow({
        backgroundColor: '#FFFFFF'
      });
      this.win.hideNavBar();
      logTableView = Ti.UI.createTableView(styles['log']);
      this.dungeonLogView = new DungeonLogView(logTableView);
      this.dungeonLogView.appendedTo(this.win);
      statusView = Ti.UI.createView(styles['status']);
      this.statusView = new StatusView(statusView);
      this.statusView.appendedTo(this.win);
      this.statusView.addObserver('click', function(e, pushed) {
        return _this.dungeonLogView.onClick(e, pushed);
      });
      this.goButton = Ti.UI.createButton(styles['go']);
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
      var e_master, enemy_id, i_master, id, item_id, modelEnemyData, modelEnemyMaster, modelItemInstance, modelItemMaster, modelRecords, modelSeq, rand;
      rand = parseInt(Math.random() * 100);
      modelRecords = ModelFactory.get("Records");
      modelSeq = ModelFactory.get("FieldSequencial");
      id = modelSeq.get();
      if (rand <= 50) {
        enemy_id = ModelFactory.get("EnemyMapMaster").get_enemy_id({
          dungeon_id: 1,
          floor: 1
        });
        modelEnemyMaster = ModelFactory.get("EnemyMaster");
        e_master = modelEnemyMaster.get_by_id(enemy_id);
        modelEnemyData = ModelFactory.get("Enemy");
        modelEnemyData.insert(id, e_master);
        modelRecords.insert(id, 1);
      } else if (rand <= 100) {
        item_id = this._get_item_id(rand);
        modelItemMaster = ModelFactory.get("ItemMaster");
        i_master = modelItemMaster.get_by_id(item_id);
        modelItemInstance = ModelFactory.get("ItemInstance");
        modelItemInstance.insert(id, i_master);
        modelRecords.insert(id, 2);
      } else {

      }
      return this.reload();
    };

    DungeonController.prototype._get_item_id = function(seed) {
      if (seed <= 70) {
        return 1;
      } else if (seed <= 90) {
        return 2;
      } else {
        return 3;
      }
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
        r = DungeonRecordFactory.get(row);
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
