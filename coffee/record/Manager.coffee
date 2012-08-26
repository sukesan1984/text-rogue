RecordManager = new class
    constructor: ->
        @turn = 0
        @_records = []
        @_rowData = []
        @_tableView
        @_setMock()
    _setMock: ->
        RecordEnemy = require 'record/Enemy'
        RecordItem = require 'record/Item'

        rowData = []
        rowObjects = []
        for i in [1...6]
            if ( i <= 3 )
                row = new RecordEnemy()
            else
                row = new RecordItem()

            rowData.push row.getRow()
            rowObjects.push row

        @_records = rowObjects
        @_rowData = rowData
    setTableView: ( tableView )->
        @_tableView = tableView
    getRecords: ->
        return @_rowData
    notifyRecords: ( func )->
        for i in @_records
            i[func]( @_tableView )
        return
    countUpTurn: ->
        @turn++

module.exports = RecordManager
