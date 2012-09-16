# Sample Application - app.coffee
do ->
    # CommonJS Modules
    Tab = require "view/Tab"
    StatusMainController = require "controller/StatusMain"
    ItemController = require "controller/Item"
    DungeonController = require "controller/Dungeon"

    tabGroup = new Tab()

    # Tab Parameter
    params = [{
        title: "ステータス"
        window: new StatusMainController("ステータス")
    },{
        title: "持ち物"
        window: new ItemController("持ち物")
    },{
        title: "ダンジョン"
        window: new DungeonController
            containingTab: tabGroup.tabGroup
    }]
    # Start
    tabGroup.appendTabs params
    tabGroup.open()
