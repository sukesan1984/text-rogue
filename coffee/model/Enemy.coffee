ModelBase = require 'model/Base'

class Enemy extends ModelBase
    constructor: ->
        sql = '''
            CREATE TABLE IF NOT EXISTS
            enemy_data (
                id integer
                , enemy_id integer
                , hp_remain integer
            )
        '''
        @.execute(sql)
        @.execute('DELETE FROM enemy_data')
        @.close()
    insert: ( id, e )->
        sql = '''
            INSERT INTO enemy_data
            (
                id
                , enemy_id
                , hp_remain
            )
            values
            (
                ?
                , ?
                , ?
            )
        '''
        @.execute( sql, id, e.enemy_id, e.hp_max )
        @.close()
    delete: ( id ) ->
        @.execute( "DELETE FROM enemy_data where id = ?", id )
        @.close()
    get_by_id: (id)->
        rows = @.execute('SELECT * FROM enemy_data where id = ?', id )
        return if ( !rows.isValidRow() )
        result =
            id: rows.fieldByName('id')
            enemy_id: rows.fieldByName('enemy_id')
            hp_remain: rows.fieldByName('hp_remain')
        rows.close()
        @.close()
        return result
    get_all: ->
        rows = @.execute('SELECT * FROM enemy_data')
        result = []
        while rows.isValidRow()
            result.push
                id: rows.fieldByName('id')
                enemy_id: rows.fieldByName('enemy_id')
                hp_remain: rows.fieldByName('hp_remain')
            rows.next()
        rows.close()
        @.close()
        return result

module.exports = Enemy
