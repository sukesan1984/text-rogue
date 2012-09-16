(function() {
  var DungeonController, DungeonFieldView, DungeonLogView, DungeonRecordFactory, ModelFactory, StatusView, Styles, styles;

  ModelFactory = require('model/Factory');

  DungeonRecordFactory = require('view/dungeon/record/Factory');

  DungeonFieldView = require('view/dungeon/Field');

  DungeonLogView = require('view/dungeon/Log');

  StatusView = require('view/dungeon/Status');

  Styles = require('view/layout/DungeonStyle');

  styles = Styles.get();

  DungeonController = (function() {

    function DungeonController(args) {
      var fieldTableView, logView, statusView,
        _this = this;
      this._turn = 0;
      this._rowData = [];
      this._rowObjects = [];
      this.containingTab = args.containingTab;
      this.win = Ti.UI.createWindow({
        backgroundColor: '#FFFFFF'
      });
      this.win.hideNavBar();
      fieldTableView = Ti.UI.createTableView(styles['field']);
      this.dungeonFieldView = new DungeonFieldView(fieldTableView);
      this.dungeonFieldView.appendedTo(this.win);
      statusView = Ti.UI.createView(styles['status']);
      this.statusView = new StatusView(statusView);
      this.statusView.appendedTo(this.win);
      this.statusView.addObserver('click', function(e, pushed) {
        return _this.dungeonFieldView.onStatusClick(e, pushed);
      });
      logView = Ti.UI.createLabel(styles['log']);
      this.logView = new DungeonLogView(logView);
      this.logView.appendedTo(this.win);
      this.statusView.addObserver('click', function(e, pushed) {
        return _this.logView.onStatusClick(e, pushed);
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
      var e_master, enemy_id, i_master, id, item_id, modelEnemyData, modelEnemyMaster, modelFields, modelItemInstance, modelItemMaster, modelSeq, rand;
      rand = parseInt(Math.random() * 100);
      modelFields = ModelFactory.get("Fields");
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
        modelFields.insert(id, 1);
      } else if (rand <= 90) {
        item_id = this._get_item_id(rand);
        modelItemMaster = ModelFactory.get("ItemMaster");
        i_master = modelItemMaster.get_by_id(item_id);
        modelItemInstance = ModelFactory.get("ItemInstance");
        modelItemInstance.insert(id, i_master);
        modelFields.insert(id, 2);
      } else if (rand <= 100) {
        modelFields.insert(id, 3);
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
      var modelFields, r, row, rowData, rowObjects, rows, _i, _len,
        _this = this;
      rowData = [];
      rowObjects = [];
      this.dungeonFieldView.deleteAll(this._rowData);
      modelFields = ModelFactory.get("Fields");
      rows = modelFields.get_all();
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        r = DungeonRecordFactory.get(row);
        r.addObserver('click', function(e, r) {
          _this.reload();
          if (r.type === 3) {
            return _this.goNextFloor();
          }
        });
        rowData.push(r.get());
        rowObjects.push(r);
      }
      this._rowData = rowData;
      this._rowObjects = rowObjects;
      this.dungeonFieldView.setData(rowData);
      return this.logView.setText();
    };

    DungeonController.prototype.goNextFloor = function() {
      var modelFields, win;
      modelFields = ModelFactory.get("Fields");
      modelFields.deleteAll();
      this.reload();
      win = new DungeonController({
        containingTab: this.containingTab
      });
      return this.containingTab.activeTab.open(win, {
        animated: true
      });
    };

    DungeonController.prototype.countUpTurn = function() {
      return this._turn++;
    };

    return DungeonController;

  })();

  module.exports = DungeonController;

}).call(this);
