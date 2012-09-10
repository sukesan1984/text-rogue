RecordBase = require 'view/dungeon/record/Base'
ModelFactory = require 'model/Factory'
class RecordItem extends RecordBase
    constructor: ( row )->
        @sound = Ti.Media.createSound
            url: 'sound/item_get.wav'
        @modelItemInstance = ModelFactory.get("ItemInstance")
        @item_data = @modelItemInstance.get_by_id( row.id )
        @modelItemMaster = ModelFactory.get("ItemMaster")
        @item_master = @modelItemMaster.get_by_id( @item_data.item_id )
        super(row)
        @message.setText @item_master.name + "をみつけた"

    _backgroundImage: ->
        return @item_master.image
    onClick: ( e )->
        @sound.play()
        @model.delete( @id )
        @modelLogsInstance.insert( 1, @item_master.name + 'をてにいれた')
        super( e )
    action: ->
        return if ( !@row.getHasCheck() )

module.exports = RecordItem
