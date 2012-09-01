ModelRecords = require 'model/Records'
RecordFactory = require 'record/Factory'

class RecordController
    constructor: ( view )->
        @_view = view
        @_turn = 0
        @_index = 0
        @_rowData = []
        @_rowObjects = []
        @_setMock()

    _setMock: ->
        rand = parseInt(Math.random()*100)
        if ( rand <= 10 )
            ModelRecords.insert( @_index, 1)
        else if( rand <= 60)
            ModelRecords.insert( @_index, 2)
        else

        @_index++
        @reload()

    notify: ( func ) ->
        for i in @_rowObjects
            i[func]()

    reload: ->
        rowData = []
        rowObjects = []

        @_view.deleteAll( @_rowData )

        rows = ModelRecords.get_all()
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
