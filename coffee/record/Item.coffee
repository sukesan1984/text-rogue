RecordBase = require 'record/Base'
class RecordItem extends RecordBase
    _backgroundImage: ->
        return 'images/hammer.png'
    action: ->
        return if ( !@row.getHasCheck() )
        @row.deleteFromParentTableView()
module.exports = RecordItem
