RecordBase = require 'view/dungeon/record/Base'
ModelFactory = require 'model/Factory'

class RecordFloor extends RecordBase
    constructor: ( row )->
        super( row )
        @row.setHasChild true
        @message.setText "階段だ！"

    _backgroundImage: ->
        return "images/floor/kaidan.png"
    onClick: (e)->

        @modelLogsInstance.insert( 3, "階段を下りた" )
        super(e)
    action: ->
module.exports = RecordFloor
