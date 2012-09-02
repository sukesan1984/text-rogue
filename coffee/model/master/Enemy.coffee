ModelBase = require 'model/Base'

class EnemyMaster extends ModelBase
    constructor: ->
        @.execute('DROP TABLE IF EXISTS enemy_master')
        sql = '''
            CREATE TABLE IF NOT EXISTS
            enemy_master (
                enemy_id integer
                , type integer
                , name text
                , hp_max integer
                , attack integer
                , image text
            )
        '''
        @.execute(sql)
        @.execute('DELETE FROM enemy_master')
        @.load()
        @.close()
    load: ->
        @.insert
            enemy_id: 1
            type: 1
            name: "ドラゴン"
            hp_max: 10
            attack: 5
            image: "images/enemy/dragon.png"
        @.insert
            enemy_id: 2
            type: 1
            name: "火の馬"
            hp_max: 20
            attack: 10
            image: "images/enemy/fire_horse.png"
        @.insert
            enemy_id: 3
            type: 1
            name: "寝袋マン"
            hp_max: 5
            attack: 2
            image: "images/enemy/nebukuro.png"


    insert: ( master )->
        sql = '''
            INSERT INTO enemy_master
            (
                enemy_id
                , type
                , name
                , hp_max
                , attack
                , image
            )
            values
            (
                ?
                , ?
                , ?
                , ?
                , ?
                , ?
            )
        '''
        @.execute( sql, master.enemy_id, master.type, master.name, master.hp_max, master.attack, master.image )
        @.close()
    get_by_id: ( id ) ->
        rows = @.execute( 'SELECT * FROM enemy_master WHERE enemy_id = ? ', id )
        return if ( !rows.isValidRow() )
        result =
                type: rows.fieldByName('type')
                enemy_id: rows.fieldByName('enemy_id')
                image: rows.fieldByName('image')
                hp_max: rows.fieldByName('hp_max')
                name: rows.fieldByName('name')
                attack: rows.fieldByName('attack')
        rows.close()
        @.close()
        return result

module.exports = EnemyMaster
