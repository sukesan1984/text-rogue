(function() {
  var DungeonController;

  DungeonController = (function() {

    function DungeonController(dungeon) {
      var DungeonMainController, ItemController, StatusMainController, Tab, params, tabGroup;
      Tab = require("view/Tab");
      StatusMainController = require("controller/StatusMain");
      ItemController = require("controller/Item");
      DungeonMainController = require("controller/DungeonMain");
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
          window: new DungeonMainController({
            dungeon: dungeon,
            containingTab: tabGroup.tabGroup
          })
        }
      ];
      tabGroup.appendTabs(params);
      return tabGroup;
    }

    return DungeonController;

  })();

  module.exports = DungeonController;

}).call(this);
