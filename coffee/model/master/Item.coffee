ModelBase = require 'model/Base'

class ItemMaster extends ModelBase
    constructor: ->
        @.execute('DROP TABLE IF EXISTS item_master')
        sql = '''
            CREATE TABLE IF NOT EXISTS
            item_master (
                item_id integer PRIMARY KEY
                , type integer
                , name text
                , image text
                , attack integer
                , defence integer
            )
        '''
        @.execute( sql )
        @.execute( 'DELETE FROM item_master')
        @.load()
        @.close()
    load: ->
        @.insert
            item_id: 1
            type: 1
            name: "エクスカリバー"
            image: "images/item/sword.png"
            attack: 10
            defence: 0
        @.insert
            item_id: 2
            type: 1
            name: "最強のハンマー"
            image: "images/item/hammer.png"
            attack: 100
            defence: 0
        @.insert
            item_id: 3
            type: 2
            name: "いかれた盾"
            image: "images/item/shield.png"
            attack: 0
            defence: 10

    insert: ( master )->
        sql = '''
        INSERT INTO item_master
        (
            item_id
            , type
            , name
            , image
            , attack
            , defence
        )
        VALUES
        (
            ?
            , ?
            , ?
            , ?
            , ?
            , ?
        )
        '''
        @.execute( sql, master.item_id, master.type, master.name, master.image, master.attack, master.defence )
        @.close()
    get_by_id: ( id )->
        rows = @.execute( 'SELECT * FROM item_master WHERE item_id = ?', id )
        return if ( !rows.isValidRow() )
        result =
            item_id: rows.fieldByName('item_id')
            type: rows.fieldByName('type')
            name: rows.fieldByName('name')
            image: rows.fieldByName('image')
            attack: rows.fieldByName('attack')
            defence: rows.fieldByName('defence')
        rows.close()
        @.close()
        return result

module.exports = ItemMaster
