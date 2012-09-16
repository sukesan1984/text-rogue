(function() {

  (function() {
    var DungeonController, ItemController, StatusMainController, Tab, params, tabGroup;
    Tab = require("view/Tab");
    StatusMainController = require("controller/StatusMain");
    ItemController = require("controller/Item");
    DungeonController = require("controller/Dungeon");
    tabGroup = new Tab();
    params = [
      {
        title: "ステータス",
        window: new StatusMainController("ステータス")
      }, {
        title: "持ち物",
        window: new ItemController("持ち物")
      }, {
        title: "ダンジョン",
        window: new DungeonController({
          containingTab: tabGroup.tabGroup
        })
      }
    ];
    tabGroup.appendTabs(params);
    return tabGroup.open();
  })();

}).call(this);
