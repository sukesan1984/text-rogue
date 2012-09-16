ModelBase = require 'model/Base'
class PlayerInstance extends ModelBase
    constructor: ->
        @.execute('DROP TABLE IF EXISTS player_data')
        sql = '''
            CREATE TABLE IF NOT EXISTS
            player_data(
                id integer PRIMARY KEY
                , name text
                , level integer
                , hp_remain integer
                , hp_max integer
                , exp integer
                , base_attack integer
                , base_defence integer
                , hungry_remain integer
                , hungry_max integer
            )
        '''
        @.execute( sql )
        @.execute('DELETE FROM player_data')
        @.load()
        @.close()
    load: ->
        @.insert
            id: 1
            name: "sukesan1984"
            level: 1
            hp_remain: 30
            hp_max: 30
            base_attack: 2
            base_defence: 2
            exp: 0
            hungry_remain: 100
            hungry_max: 100
    update_hp: ( hp )->
        id = 1
        sql = '''
            UPDATE
                player_data
            SET
                hp_remain = ?
            WHERE
                id = ?
        '''
        @.execute( sql, hp, id )
        @cache.hp_remain = hp
        @.close()
    insert: ( d )->
        sql = '''
        INSERT INTO player_data
        (
            id
            , name
            , level
            , hp_remain
            , hp_max
            , exp
            , base_attack
            , base_defence
            , hungry_remain
            , hungry_max
        )
        VALUES
        (
            ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
            , ?
        )
        '''
        @.execute( sql, d.id, d.name, d.level, d.hp_remain, d.hp_max,  d.exp, d.base_attack, d.base_defence, d.hungry_remain, d.hungry_max )
        @.close()

    get: ->
        return @result if ( @result )

        rows = @.execute( 'SELECT * FROM player_data' )
        return if ( !rows.isValidRow() )
        result =
            id: rows.fieldByName('id')
            name: rows.fieldByName('name')
            level: rows.fieldByName('level')
            hp_remain: rows.fieldByName('hp_remain')
            hp_max: rows.fieldByName('hp_max')
            exp: rows.fieldByName('exp')
            base_attack: rows.fieldByName('base_attack')
            base_defence: rows.fieldByName('base_defence')
            hungry_remain: rows.fieldByName('hungry_remain')
            hungry_max: rows.fieldByName('hungry_max')
        rows.close()
        @.close()
        console.log( JSON.stringify(result))
        @cache = result #最初の一回だけdbから読み込んでキャッシュする。
        return @cache

module.exports = PlayerInstance
