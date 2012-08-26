RecordBase = require 'record/Base'
class RecordItem extends RecordBase
    _backgroundImage: ->
        return 'images/hammer.png'
    action: ->
        super()
        @remove()
module.exports = RecordItem
