ModelBase = require 'model/Base'

class FieldSequencial extends ModelBase
    constructor: ->
        sql = '''
            CREATE TABLE IF NOT EXISTS
            seq_field (
                value integer
            )
        '''
        @.execute(sql)
        @.execute('DELETE FROM seq_field')
        @.insert( 1 )
        @.close()
    insert: ( value )->
        sql = '''
            INSERT INTO seq_field
            (
                value
            )
            values
            (
                ?
            )
        '''
        @.execute( sql, value )
    update: ->
        sql = '''
            UPDATE seq_field
            SET value = value + 1
        '''
        @.execute( sql )
        @.close()
    get: ( id ) ->
        rows = @.execute( "SELECT * FROM seq_field" )
        while rows.isValidRow()
            value = rows.fieldByName('value')
            rows.next()
        rows.close()
        @.close()
        @.update()
        return value

module.exports = FieldSequencial
