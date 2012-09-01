RecordBase = require 'record/Base'
class RecordItem extends RecordBase
    _backgroundImage: ->
        return 'images/sword.png'
    action: ->
        return if ( !@row.getHasCheck() )
        #@row.deleteFromParentTableView()
        @model.delete( @id )
        dialog = Titanium.UI.createAlertDialog()
        dialog.setTitle('GET')
        dialog.setMessage('アイテムをげっとした')
        dialog.show()

module.exports = RecordItem
