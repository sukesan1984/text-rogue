ModelBase = require 'model/Base'

class ItemInstance extends ModelBase
    constructor: ->
        @.execute( 'DROP TABLE IF EXISTS item_data' )
        sql = '''
            CREATE TABLE IF NOT EXISTS
            item_data(
                id integer PRIMARY KEY
                , item_id integer
            )
        '''
        @.execute( sql )
        @.execute( 'DELETE FROM item_data')
        @.close()
    getTableName:->
        return "item_data"
    insert: (id, i)->
        sql = '''
        INSERT INTO item_data
        (
            id
            , item_id
        )
        VALUES
        (
            ?
            , ?
        )
        '''
        @.execute( sql, id, i.item_id )
        @.close()
    get_by_id: ( id )->
        rows = @.execute('SELECT * FROM item_data WHERE id = ?', id)
        return if ( !rows.isValidRow() )
        result =
            id: rows.fieldByName('id')
            item_id: rows.fieldByName('item_id')
        rows.close()
        @.close()
        return result
module.exports = ItemInstance
