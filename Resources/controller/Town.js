(function() {
  var TownController;

  TownController = (function() {

    function TownController() {
      var DungeonMainController, ItemController, ModelFactory, StatusMainController, Tab, params;
      Tab = require("view/Tab");
      StatusMainController = require("controller/StatusMain");
      ItemController = require("controller/Item");
      DungeonMainController = require("controller/DungeonMain");
      ModelFactory = require('model/Factory');
      ModelFactory.initiate();
      this.tabGroup = new Tab();
      params = [
        {
          title: "倉庫",
          window: new StatusMainController("倉庫")
        }, {
          title: "成績",
          window: new ItemController("成績")
        }, {
          title: "ダンジョン",
          window: new DungeonMainController({
            containingTab: this.tabGroup.tabGroup
          })
        }
      ];
      this.tabGroup.appendTabs(params);
      return this.tabGroup;
    }

    return TownController;

  })();

  module.exports = TownController;

}).call(this);
