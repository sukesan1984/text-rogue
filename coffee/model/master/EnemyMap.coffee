ModelBase = require 'model/Base'

class EnemyMapMaster extends ModelBase
    constructor: ->
        @.execute( 'DROP TABLE IF EXISTS enemy_map_master' )
        sql = '''
            CREATE TABLE IF NOT EXISTS
            enemy_map_master(
                dungeon_id integer,
                floor integer,
                enemy_id integer,
                probability integer,
                PRIMARY KEY ( dungeon_id, floor, enemy_id )
            )
        '''
        @.execute( sql )
        @.execute( 'DELETE FROM enemy_map_master' )
        @.load()
        @.close()
    load: ->
        @.insert
            dungeon_id: 1
            floor: 1
            enemy_id: 1
            probability: 10
        @.insert
            dungeon_id: 1
            floor: 1
            enemy_id: 2
            probability: 30
        @.insert
            dungeon_id: 1
            floor: 1
            enemy_id: 3
            probability: 60
    insert: ( master )->
        sql = '''
        INSERT INTO enemy_map_master
        (
            dungeon_id
            , floor
            , enemy_id
            , probability
        )
        VALUES
        (
            ?
            , ?
            , ?
            , ?
        )
        '''
        @.execute( sql, master.dungeon_id, master.floor, master.enemy_id, master.probability )
        @.close()
    get: ( dungeon_id, floor )->
        rows = @.execute( 'SELECT * FROM enemy_map_master WHERE dungeon_id = ? AND floor = ?', dungeon_id, floor )
        result = []
        while rows.isValidRow()
            result.push
                dungeon_id: rows.fieldByName('dungeon_id')
                floor: rows.fieldByName('floor')
                enemy_id: rows.fieldByName('enemy_id')
                probability: rows.fieldByName('probability')
            rows.next()
        rows.close()
        @.close()
        return result

    get_enemy_id: ( current )->
        enemy_map = @.get( current.dungeon_id, current.floor )
        seed = @.get_rand( 100 )
        probability = 0
        for e in enemy_map
            probability += e.probability
            return e.enemy_id if (probability >= seed)

module.exports = EnemyMapMaster
