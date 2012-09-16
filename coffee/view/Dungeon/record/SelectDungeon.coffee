RecordBase = require 'view/dungeon/record/Base'
ModelFactory = require 'model/Factory'

class RecordSelectDungeon extends RecordBase
    constructor: ( row )->
        super( row )
        @row.setHasChild true
        @message.setText "始まりの洞窟ハマジリ"
    _backgroundImage:->
        return "images/dungeon/hajimari.png"
    onClick: (e)->
        super(e)
    action: ->
module.exports = RecordSelectDungeon
