RecordBase = require 'view/dungeon/record/Base'
ModelFactory = require 'model/Factory'
class RecordItem extends RecordBase
    constructor: ( row )->
        @modelItemInstance = ModelFactory.get("ItemInstance")
        @item_data = @modelItemInstance.get_by_id( row.id )
        @modelItemMaster = ModelFactory.get("ItemMaster")
        @item_master = @modelItemMaster.get_by_id( @item_data.item_id )
        super(row)
        @message.setText @item_master.name + "繧定ｦ九▽縺代◆"
    _backgroundImage: ->
        return @item_master.image
    action: ->
        return if ( !@row.getHasCheck() )
        @model.delete( @id )
        dialog = Titanium.UI.createAlertDialog()
        dialog.setTitle('GET')
        dialog.setMessage(@item_master.name + '繧偵£縺｣縺ｨ縺励◆')
        dialog.show()

module.exports = RecordItem
