ETableView = require 'ui/ETableView'
ModelRecords = require 'model/Records'
RecordFactory = require 'record/Factory'

RecordManager = new class
    constructor: ->
        @turn = 0
        @_index = 0
        @_rowData = []
        @_tableView = new ETableView( @ )
        @_setMock()
    _setMock: ->
        for i in [1...6]
            if ( i <= 3 )
                ModelRecords.insert( i, 1)
            else
                ModelRecords.insert( i, 2)

        rowData = []
        rows = ModelRecords.get_all()
        for row in rows
            r = RecordFactory.get( @_tableView, row.id, row.type )
            rowData.push r
            @_tableView.appendRow( r.get() )
        @_rowData = rowData

    notify: ( func ) ->
        for i in @_rowData
            i[func]()

    getTableView: ->
        return @_tableView.getObject()

    countUpTurn: ->
        @turn++

module.exports = RecordManager
