RecordBase = require 'record/Base'
ModelFactory = require 'model/Factory'
class RecordEnemy extends RecordBase
    constructor: ( row )->
        @modelEnemyData = ModelFactory.get("Enemy")
        @enemy_data = @modelEnemyData.get_by_id( row.id )
        @modelEnemyMaster = ModelFactory.get("EnemyMaster")
        @enemy_master = @modelEnemyMaster.get_by_id( @enemy_data.enemy_id )
        super( row )
        @message.setText @enemy_data.message
        @right_bottom.setText @enemy_data.hp_remain +  "/" +  @enemy_master.hp_max
        return @
    _backgroundImage: ->
        return @enemy_master.image
    action: ->
        @modelEnemyData.update
            hp_remain: @enemy_data.hp_remain
            message:@enemy_master.name + "の攻撃！" + @enemy_master.attack + "のダメージ"
            , @id
        return if ( !@row.getHasCheck() )
        @model.delete( @id )
        dialog = Titanium.UI.createAlertDialog()
        dialog.setTitle('YEAHHHHH')
        dialog.setMessage(@enemy_master.name + 'を倒した。')
        dialog.show()
module.exports = RecordEnemy
