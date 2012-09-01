ModelBase = require 'model/Base'

#class Records extends ModelBase
    #constructor: ->
        #db = Ti.Database.open('mydb')
        #db.execute('CREATE TABLE IF NOT EXISTS record_data ( id integer, type integer )')
        #db.execute('DELETE FROM record_data')
        #db.close()
    #insert: ( id, type )->
        #db = Ti.Database.open('mydb')
        #db.execute('INSERT INTO record_data (id, type) values ( ?, ? )', id, type )
        #db.close()
    #delete: ( id ) ->
        #db = Ti.Database.open('mydb')
        #db.execute( "DELETE FROM record_data where id = ?", id )
    #get_all: ->
        #db = Ti.Database.open('mydb')
        #rows = db.execute('SELECT id, type FROM record_data')
        #result = []
        #while rows.isValidRow()
            #result.push
                #id: rows.fieldByName('id')
                #type: rows.fieldByName('type')
            #rows.next()
        #rows.close()
        #db.close()
        #return result
class Records extends ModelBase
    constructor: ->
        @.execute('CREATE TABLE IF NOT EXISTS record_data ( id integer, type integer )')
        @.execute('DELETE FROM record_data')
        @.close()
    insert: ( id, type )->
        @.execute('INSERT INTO record_data (id, type) values ( ?, ? )', id, type )
        @.close()
    delete: ( id ) ->
        @.execute( "DELETE FROM record_data where id = ?", id )
        @.close()
    get_all: ->
        rows = @.execute('SELECT id, type FROM record_data')
        result = []
        while rows.isValidRow()
            result.push
                id: rows.fieldByName('id')
                type: rows.fieldByName('type')
            rows.next()
        rows.close()
        @.close()
        return result


module.exports = Records
