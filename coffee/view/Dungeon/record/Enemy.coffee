RecordBase = require 'view/dungeon/record/Base'
ModelFactory = require 'model/Factory'
class RecordEnemy extends RecordBase
    constructor: ( row )->
        @modelEnemyData = ModelFactory.get("Enemy")
        @enemy_data = @modelEnemyData.get_by_id( row.id )
        @modelEnemyMaster = ModelFactory.get("EnemyMaster")
        @modelPlayer = ModelFactory.get("PlayerInstance")
        @enemy_master = @modelEnemyMaster.get_by_id( @enemy_data.enemy_id )
        super( row )
        @message.setText @enemy_data.message
        @right_bottom.setText @enemy_data.hp_remain +  "/" +  @enemy_master.hp_max
        return @
    _backgroundImage: ->
        return @enemy_master.image
    onClick: ( e )->
        player = @modelPlayer.get()
        damage = player.base_attack
        currentHp = @enemy_data.hp_remain - damage

        if currentHp <= 0
            @model.delete( @id )
            @modelLogsInstance.insert( 2, @enemy_master.name + 'を倒した。')
        else
            @modelLogsInstance.insert( 2, @enemy_master.name + "に" + damage + "のダメージ" )
            @modelEnemyData.update
                hp_remain: currentHp
                message: ""
                , @id

        super( e )
    action: ->
        player = @modelPlayer.get()
        damage = @enemy_master.attack
        player_hp = player.hp_remain - damage
        @modelPlayer.update_hp( player_hp )
        @modelEnemyData.update
            hp_remain: @enemy_data.hp_remain
            message:@enemy_master.name + "の攻撃！" + @enemy_master.attack + "のダメージ"
            , @id
        if player_hp <= 0
            @modelLogsInstance.insert(4, "あなたは死んだ")
module.exports = RecordEnemy
