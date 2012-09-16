class DungeonController
    constructor: ( dungeon )->
        Tab = require "view/Tab"
        StatusMainController = require "controller/StatusMain"
        ItemController = require "controller/Item"
        DungeonMainController = require "controller/DungeonMain"

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
            window: new DungeonMainController
                dungeon: dungeon
                containingTab: tabGroup.tabGroup
        }]
        # Start
        tabGroup.appendTabs params
        return tabGroup

module.exports = DungeonController
