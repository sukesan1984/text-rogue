RecordBase = require 'record/Base'
class RecordEnemy extends RecordBase
    _backgroundImage: ->
        return 'images/dragon.png'
    hoge: ->
        super()
module.exports = RecordEnemy
