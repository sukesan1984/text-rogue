ModelBase = require 'model/Base'

class Fields extends ModelBase
    constructor: ->
        sql = '''
            CREATE TABLE IF NOT EXISTS
            log_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT
                , type integer
                , text text
                , created_at integer
                , updated_at integer
            )
        '''
        @.execute(sql)
        @.execute('DELETE FROM log_data')
        @.close()
    getTableName: ->
        return "log_data"
    insert: ( type, text )->
        @.execute('INSERT INTO log_data (type, text, created_at, updated_at) values ( ?, ?, ?, ? )', type, text, @.get_time(), @.get_time() )
        @.close()
    delete: ( id ) ->
        @.execute( "DELETE FROM log_data where id = ?", id )
        @.close()
    getCurrent: ( num )->
        sql = '''
            SELECT * FROM log_data
            ORDER BY id DESC
            LIMIT ?
        '''
        rows = @.execute( sql, num )
        result = []
        while rows.isValidRow()
            result.push
                id: rows.fieldByName('id')
                type: rows.fieldByName('type')
                text: rows.fieldByName('text')
            rows.next()
        rows.close()
        @.close()
        return result

module.exports = Fields
