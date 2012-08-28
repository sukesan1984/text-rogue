ETableView = require 'ui/ETableView'
RecordEnemy = require 'record/Enemy'
RecordItem = require 'record/Item'

RecordManager = new class
    constructor: ->
        @turn = 0
        @_index = 0
        @_rowData = []
        @_tableView = new ETableView( @ )
        @_setMock()
    _setMock: ->
        rowData = []
        for i in [1...6]
            if ( i <= 3 )
                row = new RecordEnemy( @_tableView )
            else
                row = new RecordItem( @_tableView )

            rowData.push row
            @_tableView.appendRow( row.get() )

        @_rowData = rowData

    notify: ( func ) ->
        for i in @_rowData
            i[func]()

    getTableView: ->
        return @_tableView.getObject()

    countUpTurn: ->
        @turn++

module.exports = RecordManager
