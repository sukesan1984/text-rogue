class StatusView 
    constructor: ()->
        @_statusView = Ti.UI.createView
            backgroundColor: 'red'
            height:30
            top:0
            left:0
            right:0
        @_pushed = false
        @_clickObserver = []
        @_statusView.addEventListener 'click', (e)=>
            @onClick( e )
        return @
    appendedTo: ( win )->
        win.add @_statusView

    addObserver: ( event, func )->
        switch event
            when "click"
                @_clickObserver.push func
            else
                @_clickObserver.push func

    onClick: (e)->
        if @_pushed is false
            @_statusView.setHeight 100
        else
            @_statusView.setHeight 30

        for f in @_clickObserver
            f( e, @_pushed )
            
        @_pushed = if @_pushed then false else true

module.exports = StatusView
