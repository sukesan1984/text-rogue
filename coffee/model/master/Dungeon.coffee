ModelBase = require 'model/Base'

class DungeonMaster extends ModelBase
    constructor: ->
        @.execute('DROP TABLE IF EXISTS dungeon_master')
        sql = '''
            CREATE TABLE IF NOT EXISTS
            dungeon_master (
                dungeon_id integer
                , name text
                , lv integer
                , image text
             )
        '''
        @.execute(sql)
        @.execute('DELETE FROM dungeon_master')
        @.load()
        @.close()
    load: ->
        @.insert
            dungeon_id: 1
            name: "始まりの洞窟"
            lv: 1
            image: "images/dungeon/hajimari.png"

    insert: ( master )->
        sql = '''
            INSERT INTO dungeon_master
            (
                dungeon_id
                , name
                , lv
                , image
            )
            values
            (
                ?
                , ?
                , ?
                , ?
            )
        '''
        @.execute( sql, master.dungeon_id, master.name, master.lv, master.image )
        @.close()
    get_by_id: ( id ) ->
        rows = @.execute( 'SELECT * FROM dungeon_master WHERE dungeon_id = ? ', id )
        return if ( !rows.isValidRow() )
        result =
                dungeon_id: rows.fieldByName('dungeon_id')
                image: rows.fieldByName('image')
                name: rows.fieldByName('name')
                lv: rows.fieldByName('lv')
        rows.close()
        @.close()
        return result

module.exports = DungeonMaster
