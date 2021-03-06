(function() {
  var DungeonFieldView, DungeonLogView, DungeonMainController, DungeonRecordFactory, ModelFactory, StatusView, Styles, styles,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ModelFactory = require('model/Factory');

  DungeonRecordFactory = require('view/dungeon/record/Factory');

  DungeonFieldView = require('view/dungeon/Field');

  DungeonLogView = require('view/dungeon/Log');

  StatusView = require('view/dungeon/Status');

  Styles = require('view/layout/DungeonStyle');

  styles = Styles.get();

  DungeonMainController = (function() {

    function DungeonMainController(args) {
      this._goNextTurn = __bind(this._goNextTurn, this);

      var fieldTableView, logView, statusView,
        _this = this;
      this._turn = 0;
      this._rowData = [];
      this._rowObjects = [];
      this.containingTab = args.containingTab;
      this.dungeon = args.dungeon;
      this.pulling = false;
      this.reloading = false;
      this.win = Ti.UI.createWindow({
        backgroundColor: '#FFFFFF'
      });
      this.win.hideNavBar();
      this.border = Ti.UI.createView({
        backgroundColor: "#576c89",
        height: 2,
        bottom: 0
      });
      this.tableHeader = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        width: 320,
        height: 60
      });
      this.tableHeader.add(this.border);
      this.arrow = Ti.UI.createView({
        backgroundImage: "images/ui/whiteArrow.png",
        width: 23,
        height: 60,
        bottom: 10,
        left: 20
      });
      this.statusLabel = Ti.UI.createLabel({
        text: "ダンジョンの奥へと進む",
        left: 55,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
          fontSize: 13,
          fontWeight: "bold"
        },
        shadowColor: "#999",
        shadowOffset: {
          x: 0,
          y: 1
        }
      });
      this.lastUpdatedLabel = Ti.UI.createLabel({
        text: "このフロアの進捗(1/5) ",
        left: 55,
        width: 200,
        bottom: 15,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
          fontSize: 12
        },
        shadowColor: "#999",
        shadowOffset: {
          x: 0,
          y: 1
        }
      });
      this.tableHeader.add(this.arrow);
      this.tableHeader.add(this.statusLabel);
      this.tableHeader.add(this.lastUpdatedLabel);
      fieldTableView = Ti.UI.createTableView(styles['field']);
      this.dungeonFieldView = new DungeonFieldView(fieldTableView);
      this.dungeonFieldView.appendedTo(this.win);
      fieldTableView.headerPullView = this.tableHeader;
      fieldTableView.addEventListener('scroll', function(e) {
        return _this.onTableViewScroll(e);
      });
      fieldTableView.addEventListener('scrollEnd', function(e) {
        return _this.onTableViewScrollEnd(e);
      });
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
      if (!this.dungeon) {
        this._startMock();
      } else {
        this.reload();
      }
      return this.win;
    }

    DungeonMainController.prototype.onTableViewScroll = function(e) {
      var offset, t;
      offset = e.contentOffset.y;
      if (offset <= -65.0 && !this.pulling) {
        t = Ti.UI.create2DMatrix();
        t = t.rotate(-180);
        this.pulling = true;
        this.arrow.animate({
          transform: t,
          duration: 180
        });
        return this.statusLabel.text = "次の部屋へ";
      } else if (this.pulling && offset > -65.0 && offset < 0) {
        this.pulling = false;
        t = Ti.UI.create2DMatrix();
        this.arrow.animate({
          transform: t,
          duration: 180
        });
        return this.statusLabel.text = "ダンジョンの奥へと進む";
      }
    };

    DungeonMainController.prototype.onTableViewScrollEnd = function(e) {
      this.reloading = false;
      this.statusLabel.text = "ダンジョンの奥へと進む";
      this._goNextTurn();
      this._setMock();
      this.reload();
      return this.arrow.show();
    };

    DungeonMainController.prototype._setNextTurn = function() {
      var id, modelFields, modelSeq;
      modelFields = ModelFactory.get("Fields");
      modelSeq = ModelFactory.get("FieldSequencial");
      id = modelSeq.get();
      return modelFields.insert(id, 5);
    };

    DungeonMainController.prototype._startMock = function() {
      var id, modelFields, modelSeq;
      modelFields = ModelFactory.get("Fields");
      modelSeq = ModelFactory.get("FieldSequencial");
      id = modelSeq.get();
      modelFields.insert(id, 4);
      return this.reload();
    };

    DungeonMainController.prototype._goNextTurn = function(e) {
      this.reset();
      this.countUpTurn();
      this.notify("action");
      this.reload();
    };

    DungeonMainController.prototype.reset = function() {
      var player;
      player = ModelFactory.get("PlayerInstance").get();
      if (player.hp_remain > 0) {

      }
    };

    DungeonMainController.prototype._setMock = function() {
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
        return modelFields.insert(id, 1);
      } else if (rand <= 70) {
        return modelFields.insert(id, 6);
      } else if (rand <= 90) {
        item_id = this._get_item_id(rand);
        modelItemMaster = ModelFactory.get("ItemMaster");
        i_master = modelItemMaster.get_by_id(item_id);
        modelItemInstance = ModelFactory.get("ItemInstance");
        modelItemInstance.insert(id, i_master);
        return modelFields.insert(id, 2);
      } else if (rand <= 100) {
        return modelFields.insert(id, 3);
      } else {

      }
    };

    DungeonMainController.prototype._get_item_id = function(seed) {
      if (seed <= 70) {
        return 1;
      } else if (seed <= 90) {
        return 2;
      } else {
        return 3;
      }
    };

    DungeonMainController.prototype.notify = function(func) {
      var i, _i, _len, _ref, _results;
      _ref = this._rowObjects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(i[func]());
      }
      return _results;
    };

    DungeonMainController.prototype.reload = function() {
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
          switch (r.type) {
            case 3:
              return _this.goNextFloor();
            case 4:
              _this.dungeon = 1;
              return _this.goNextFloor();
            case 5:
              return _this._goNextTurn(e);
            case 6:
              return _this._goNextTurn(e);
            default:
              return _this._goNextTurn(e);
          }
        });
        rowData.push(r.get());
        rowObjects.push(r);
      }
      this._rowData = rowData;
      this._rowObjects = rowObjects;
      this.dungeonFieldView.setData(rowData);
      this.statusView.reload();
      return this.logView.setText();
    };

    DungeonMainController.prototype.reloadMock = function() {
      var r, row, rowData, rowObjects, _i, _ref;
      rowData = [];
      rowObjects = [];
      for (row = _i = 0, _ref = this._turn; 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
        r = DungeonRecordFactory.get({
          type: 99,
          id: row
        });
        rowData.push(r.get());
        rowObjects.push(r);
      }
      this._rowData = rowData;
      this._rowObjects = rowObjects;
      this.dungeonFieldView.setData(rowData);
      this.statusView.reload();
      return this.logView.setText();
    };

    DungeonMainController.prototype.goNextFloor = function() {
      var modelFields, win;
      modelFields = ModelFactory.get("Fields");
      modelFields.deleteAll();
      win = new DungeonMainController({
        containingTab: this.containingTab,
        dungeon: this.dungeon
      });
      return this.containingTab.activeTab.open(win, {
        animated: true
      });
    };

    DungeonMainController.prototype.countUpTurn = function() {
      return this._turn++;
    };

    return DungeonMainController;

  })();

  module.exports = DungeonMainController;

}).call(this);
