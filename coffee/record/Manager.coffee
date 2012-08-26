RecordManager = new class
    constructor: ->
        @turn = 0

    getRecords: ->
        RecordEnemy = require 'record/Enemy'
        RecordItem = require 'record/Item'

        rowData = []
        for i in [1...6]
            if i <= 3
                row = new RecordEnemy()
            else
                row = new RecordItem()

            row.selectedBackgroundColor = '#fff'
            row.height = 60
            row.className = 'datarow'

            rowData.push row

        return rowData
    countUpTurn: ->
        console.log( @turn )
        @turn++

module.exports = RecordManager
