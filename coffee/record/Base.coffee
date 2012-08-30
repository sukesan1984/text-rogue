ETableViewRow = require 'ui/ETableViewRow'
ModelRecords = require 'model/Records'

class RecordBase
    constructor: ( parent, id ) ->
        @row = new ETableViewRow( parent )
        @row.addEventListener 'click', (e)=>
            check = @row.getHasCheck()
            @row.setHasCheck !check
        @model = ModelRecords
        @id = id

        @message =  Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            left: 70
            top: 2
            height: 30
            width: 200
        @row.add @message

        @photo = Ti.UI.createView
            top: 5
            left: 10
            width: 50
            height: 50
        @setImage()
        @row.add @photo
        return @
    get: ->
        return @row.getObject()
    getName: ->
        return @row.name
    action: ->
        return if ( !@row.getHasCheck() )
    _backgroundImage: ->
        return ''
    setImage: ->
        @photo.setBackgroundImage( @_backgroundImage() )
module.exports = RecordBase
