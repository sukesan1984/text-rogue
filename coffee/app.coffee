# Sample Application - app.coffee
do ->
    # CommonJS Modules
    Tab = require "view/Tab"
    StatusController = require "controller/Status"
    ItemController = require "controller/Item"
    DungeonController = require "controller/Dungeon"
    # Tab Parameter
    params = [{
        title: "ステータス"
        window: new StatusController("ステータス")
    },{
        title: "持ち物"
        window: new ItemController("持ち物")
    },{
        title: "ダンジョン"
        window: new DungeonController()
    }]
    # Start
    tabGroup = new Tab()
    tabGroup.appendTabs params
    tabGroup.open()
