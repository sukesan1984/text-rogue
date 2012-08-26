(function() {

  (function() {
    var AppFieldTable, AppTabMods, AppTableSample, AppWinMods, params, tabGroup;
    AppWinMods = require("AppWinMods");
    AppTabMods = require("AppTabMods");
    AppFieldTable = require("AppFieldTable");
    AppTableSample = require("AppTableSample");
    params = [
      {
        title: "Main Scene",
        window: AppWinMods.init("Main Scene")
      }, {
        title: "TableView Tab",
        window: AppFieldTable.init("Middle1 Window")
      }, {
        title: "TableView Sample",
        window: AppTableSample.init("Table Sample")
      }, {
        title: "Middle2 Tab",
        window: AppWinMods.init("Middle2 Window")
      }, {
        title: "Right Tab",
        window: AppWinMods.init("Right Window")
      }
    ];
    tabGroup = new AppTabMods();
    tabGroup.appendTabs(params);
    return tabGroup.open();
  })();

}).call(this);
