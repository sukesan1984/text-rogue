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
            exp: 0
            hungry_remain: 100
            hungry_max: 100
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
        )
        '''
        @.execute( sql, d.id, d.name, d.level, d.hp_remain, d.hp_max,  d.exp, d.hungry_remain, d.hungry_max )
        @.close()

    get: ->
        rows = @.execute( 'SELECT * FROM player_data' )
        return if ( !rows.isValidRow() )
        result =
            id: rows.fieldByName('id')
            name: rows.fieldByName('name')
            level: rows.fieldByName('level')
            hp_remain: rows.fieldByName('hp_remain')
            hp_max: rows.fieldByName('hp_max')
            exp: rows.fieldByName('exp')
            hungry_remain: rows.fieldByName('hungry_remain')
            hungry_max: rows.fieldByName('hungry_max')
        rows.close()
        @.close()
        console.log( JSON.stringify(result))
        return result

module.exports = PlayerInstance
