RecordBase = require 'view/dungeon/record/Base'
ModelFactory = require 'model/Factory'

class RecordFloor extends RecordBase
    constructor: ( row )->
        super( row )
        @.setMessage "回復アイテム"

    _backgroundImage: ->
        return "images/instance/potion.png"
    onClick: (e)->
        modelPlayer = ModelFactory.get( "PlayerInstance" )
        @model.delete( @id )
        player = modelPlayer.get()
        if ( ( player.hp_remain + 3 ) > player.hp_max ) 
            player_hp = player.hp_max
        else 
            player_hp = player.hp_remain + 3

        modelPlayer.update_hp( player_hp )

        @modelLogsInstance.insert( 6, "hp 3 回復" )
        super(e)
    action: ->

module.exports = RecordFloor
