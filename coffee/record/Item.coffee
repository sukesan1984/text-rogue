RecordBase = require 'record/Base'
class RecordItem extends RecordBase
    _backgroundImage: ->
        return 'images/hammer.png'
    action: ( parent, name )->
        return if ( !@row.getHasCheck() )
        parent.deleteRow( parent.getIndexByName(name) )
    hoge: ->
        super()
module.exports = RecordItem
