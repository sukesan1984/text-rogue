class RecordBase
    constructor: (rowNum) ->
        @row = Ti.UI.createTableViewRow()
        @row.addEventListener 'click', (e)=>
            check = @row.getHasCheck()
            @row.setHasCheck !check
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
        @message.rowNum = rowNum
        @row.add @message

        @photo = Ti.UI.createView
            top: 5
            left: 10
            width: 50
            height: 50
        @photo.rowNum = rowNum
        @setImage()
        @row.add @photo
        return @row
    _backgroundImage: ->
        return ''
    setImage: ->
        @photo.setBackgroundImage( @_backgroundImage() )
module.exports = RecordBase
