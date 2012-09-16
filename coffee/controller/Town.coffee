
class TownController
    constructor: ->
        Tab = require "view/Tab"
        StatusMainController = require "controller/StatusMain"
        ItemController = require "controller/Item"
        DungeonMainController = require "controller/DungeonMain"
        ModelFactory = require 'model/Factory'
        ModelFactory.initiate()

        @tabGroup = new Tab()

        # Tab Parameter
        params = [{
            title: "倉庫"
            window: new StatusMainController("倉庫")
        },{
            title: "成績"
            window: new ItemController("成績")
        },{
            title: "ダンジョン"
            window: new DungeonMainController
                containingTab: @tabGroup.tabGroup
        }]
        # Start
        @tabGroup.appendTabs params
        return @tabGroup

module.exports = TownController
