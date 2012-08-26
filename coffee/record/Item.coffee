RecordBase = require 'record/Base'
class RecordItem extends RecordBase
    _backgroundImage: ->
        return 'images/hammer.png'
    action: ( parent )->
        super()
        parent.deleteRow( @row )
    hoge: ->
        super()
module.exports = RecordItem
