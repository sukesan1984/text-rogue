RecordBase = require 'view/dungeon/record/Base'

class RecordNextTurn extends RecordBase
    constructor: ( row )->
        super( row )
        @.setMessage "進む"
    _backgroundImage: ->
        return "images/floor/ashiato.png"
    onClick: (e)->
        super(e)
module.exports = RecordNextTurn

