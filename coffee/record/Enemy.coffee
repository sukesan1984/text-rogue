RecordBase = require 'record/Base'
ModelFactory = require 'model/Factory'
class RecordEnemy extends RecordBase
    constructor: ( row )->
        @modelEnemyData = ModelFactory.get("Enemy")
        @enemy_data = @modelEnemyData.get_by_id( row.id )
        @modelEnemyMaster = ModelFactory.get("EnemyMaster")
        @enemy_master = @modelEnemyMaster.get_by_id( @enemy_data.enemy_id )
        return super( row )
    _backgroundImage: ->
        return @enemy_master.image
    action: ->
        return if ( !@row.getHasCheck() )
        @model.delete( @id )
        dialog = Titanium.UI.createAlertDialog()
        dialog.setTitle('YEAHHHHH')
        dialog.setMessage('敵を倒した。')
        dialog.show()
module.exports = RecordEnemy
