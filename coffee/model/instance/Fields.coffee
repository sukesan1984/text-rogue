ModelBase = require 'model/Base'

class Fields extends ModelBase
    constructor: ->
        sql = '''
            CREATE TABLE IF NOT EXISTS
            field_data (
                id integer
                , type integer
            )
        '''
        @.execute(sql)
        @.execute('DELETE FROM field_data')
        @.close()
    getTableName: ->
        return 'field_data'
    insert: ( id, type )->
        @.execute('INSERT INTO field_data (id, type) values ( ?, ? )', id, type )
        @.close()
    delete: ( id ) ->
        @.execute( "DELETE FROM field_data where id = ?", id )
        @.close()
    deleteAll: ->
        @.execute( "DELETE FROM field_data" )
    get_all: ->
        rows = @.execute('SELECT id, type FROM field_data')
        result = []
        while rows.isValidRow()
            result.push
                id: rows.fieldByName('id')
                type: rows.fieldByName('type')
            rows.next()
        rows.close()
        @.close()
        return result


module.exports = Fields

