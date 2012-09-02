ETableViewRow = require 'ui/ETableViewRow'
ModelFactory = require 'model/Factory'

class RecordBase
    constructor: ( row ) ->
        @row = new ETableViewRow()
        @row.addEventListener 'click', (e)=>
            check = @row.getHasCheck()
            @row.setHasCheck !check
        @model = ModelFactory.get( "ModelRecords" )
        @id = row.id

        @message =  Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 12
                fontWeight: 'bold'
                fontFamily: 'Arial'
            left: 70
            top: 2
            height: 30
            width: 300
        @row.add @message

        @right_bottom = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 12
                fontWeight: 'bold'
                fontFamily: 'Arial'
            right: 1
            bottom: 1
            height: 30
            width: 50
        @row.add @right_bottom

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