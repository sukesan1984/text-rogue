(function() {

  (function() {
    var DungeonController, ItemController, StatusMainController, Tab, params, tabGroup;
    Tab = require("view/Tab");
    StatusMainController = require("controller/StatusMain");
    ItemController = require("controller/Item");
    DungeonController = require("controller/Dungeon");
    params = [
      {
        title: "ステータス",
        window: new StatusMainController("ステータス")
      }, {
        title: "持ち物",
        window: new ItemController("持ち物")
      }, {
        title: "ダンジョン",
        window: new DungeonController()
      }
    ];
    tabGroup = new Tab();
    tabGroup.appendTabs(params);
    return tabGroup.open();
  })();

}).call(this);
