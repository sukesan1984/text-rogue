RecordBase = require 'record/Base'
class RecordEnemy extends RecordBase
    _backgroundImage: ->
        return 'images/dragon.png'
    action: ->
        return if ( !@row.getHasCheck() )
        #@row.deleteFromParentTableView()
        @model.delete( @id )
        dialog = Titanium.UI.createAlertDialog()
        dialog.setTitle('YEAHHHHH')
        dialog.setMessage('敵を倒した。')
        dialog.show()
module.exports = RecordEnemy
