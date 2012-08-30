ETableView = require 'ui/ETableView'
ModelRecords = require 'model/Records'
RecordFactory = require 'record/Factory'

RecordManager = new class
    constructor: ->
        @turn = 0
        @_index = 0
        @_rowData = []
        @_rowObjects = []
        @_tableView = new ETableView( @ )
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
        for r in @_rowData
            @_tableView.deleteRow[0]

        rows = ModelRecords.get_all()
        for row in rows
            r = RecordFactory.get( @_tableView, row.id, row.type )
            rowData.push r.get()
            rowObjects.push r
        @_rowData = rowData
        @_rowObjects = rowObjects
        @_tableView.setData( @_rowData )

    getTableView: ->
        return @_tableView.getObject()

    countUpTurn: ->
        @turn++

module.exports = RecordManager
