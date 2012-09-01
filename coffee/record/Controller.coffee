ModelFactory = require 'model/Factory'
RecordFactory = require 'record/Factory'

class RecordController
    constructor: ( view )->
        @_view = view
        @_turn = 0
        @_rowData = []
        @_rowObjects = []
        @_setMock()

    _setMock: ->
        rand = parseInt(Math.random()*100)
        modelRecords = ModelFactory.get( "Records" )
        modelSeq = ModelFactory.get( "FieldSequencial" )
        id = modelSeq.get()
        if ( rand <= 10 )
            modelRecords.insert( id, 1)
        else if( rand <= 60)
            modelRecords.insert( id, 2)
        else

        @reload()

    notify: ( func ) ->
        for i in @_rowObjects
            i[func]()

    reload: ->
        rowData = []
        rowObjects = []

        @_view.deleteAll( @_rowData )

        modelRecords = ModelFactory.get( "Records" )
        rows = modelRecords.get_all()
        for row in rows
            r = RecordFactory.get( row.id, row.type )
            rowData.push r.get()
            rowObjects.push r
        @_rowData = rowData
        @_rowObjects = rowObjects
        @_view.setData(rowData)

    countUpTurn: ->
        @_turn++

module.exports = RecordController
