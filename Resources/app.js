(function() {

  (function() {
    var DungeonController, ItemController, StatusController, Tab, params, tabGroup;
    Tab = require("view/Tab");
    StatusController = require("controller/Status");
    ItemController = require("controller/Item");
    DungeonController = require("controller/Dungeon");
    params = [
      {
        title: "ステータス",
        window: new StatusController("ステータス")
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
