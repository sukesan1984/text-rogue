RecordManager = new class
    constructor: ->
        @turn = 0
        @_records = []
        @_setMock()
    _setMock: ->
        RecordEnemy = require 'record/Enemy'
        RecordItem = require 'record/Item'

        rowData = []
        for i in [1...6]
            row = new RecordEnemy()

            row.selectedBackgroundColor = '#fff'
            row.height = 60
            row.className = 'datarow'

            rowData.push row

        @_records = rowData
    getRecords: ->
        return @_records
    notifyRecords: ( func )->
        for i in @_records

    countUpTurn: ->
        @turn++

module.exports = RecordManager
