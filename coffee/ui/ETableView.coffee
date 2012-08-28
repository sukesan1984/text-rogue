class ETableView
    constructor: ( parent ) ->
        @_parent = parent
        @table_view = Ti.UI.createTableView()
        return @
    add: ( child ) ->
        @table_view.add child
    remove: ( child ) ->
        @table_view.remove child
    deleteRow: ( row, animation ) ->
        @table_view.deleteRow( row, animation )
    removeFromParent: ->
        @_parent.remove @table_view
    setHeight: ( value ) ->
        @table_view.setHeight value
    setTop: ( value )->
        @table_view.setTop value
    setData: ( rowData )->
        @table_view.setData rowData
    appendRow: ( row, animation ) ->
        @table_view.appendRow( row, animation )
    getObject: ->
        return @table_view
module.exports = ETableView
