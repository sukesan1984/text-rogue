class ETableViewRow
    constructor: () ->
        @table_view_row = Ti.UI.createTableViewRow()
        return @
    add: ( child ) ->
        @table_view_row.add child
    remove: ( child ) ->
        @table_view_row.remove child
    setHasChild: ( hasChild ) ->
        return if ( hasChild  is ( true | false ) )
        @table_view_row.setHasChild hasChild
    getHasChild: ->
        return @table_view_row.getHasChild
    setHasCheck: ( hasCheck ) ->
        return if ( hasCheck is ( true | false ) )
        @table_view_row.setHasCheck hasCheck
    getHasCheck: ->
        return @table_view_row.getHasCheck()
    addEventListener: ( event, callback ) ->
        @table_view_row.addEventListener( event, callback )
    getObject: ->
        return @table_view_row
module.exports = ETableViewRow
