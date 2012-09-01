ModelChara = require 'model/Chara'
class StatusView
    constructor: ()->
        @_statusView = Ti.UI.createView
            height:30
            top:0
            left:0
            right:0
        @_set_name()
        @_set_hp()

        @_pushed = false
        @_clickObserver = []
        @_statusView.addEventListener 'click', (e)=>
            @onClick( e )
        return @
    _set_name:->
        @_name = Ti.UI.createLabel
            color: '#576996'
            backgroundColor: 'red'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            left: 5
            top: 1
            height: 30
            width: 'auto'
            text: ModelChara.get().name
        @_statusView.add @_name

    _set_hp:->
        @_hp = Ti.UI.createLabel
            color: '#576996'
            backgroundColor: 'blue'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            right: 0
            top: 1
            height: 30
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
            width: 200

        text = ModelChara.get().hp_remain + "/" + ModelChara.get().hp_max
        @_hp.setText text
        @_statusView.add @_hp

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
