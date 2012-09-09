ETableView = require 'ui/ETableView'
class DungeonFieldView
    constructor: ( tableView )->
        @_tableView = tableView
        return @

    deleteAll: ( rowData )->
        for r in rowData
            @_tableView.deleteRow[0]
    onStatusClick: ( e, pushed )->
        top = @_tableView.getTop()
        if pushed is false
            @_tableView.setTop ( top ) + 70
        else
            @_tableView.setTop ( top ) - 70

    appendedTo: ( win )->
        win.add @_tableView

    setData: ( rowData )->
        @_tableView.setData( rowData )

module.exports = DungeonFieldView
