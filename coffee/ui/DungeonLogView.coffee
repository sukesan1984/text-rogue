ETableView = require 'ui/ETableView'
class DungeonLogView
    constructor: ->
        @_tableView = new ETableView( @ )
        @_tableViewObj = @_tableView.getObject()
        @_tableViewObj.top = 30
        @_tableViewObj.setRowHeight 60
        @_tableViewObj.setHeight 300
        return @

    deleteAll: ( rowData )->
        for r in rowData
            @_tableView.deleteRow[0]
    onClick: ( e, pushed )->
        console.log("pushed" + pushed)
        if pushed is false
            @_tableView.setTop 100
        else
            @_tableView.setTop 30

    appendedTo: ( win )->
        win.add @_tableViewObj

    setData: ( rowData )->
        @_tableView.setData( rowData )

module.exports = DungeonLogView
