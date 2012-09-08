ModelFactory = require 'model/Factory'
class StatusView
    constructor: ( statusView )->
        @_statusView = statusView

        @_pushed = false
        @_clickObserver = []
        @modelPlayerInstance = ModelFactory.get("PlayerInstance")
        @_player = @modelPlayerInstance.get()
        @_set_name()
        @_set_hp()
        @_set_equipment()
        @_statusView.addEventListener 'click', (e)=>
            @onClick( e )
        return @
    _set_name:->
        @_name = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            left: 5
            top: 1
            height: 30
            width: 'auto'
            text: @_player.name
        @_statusView.add @_name

    _set_hp:->
        @_hp = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            right: 5
            top: 1
            height: 30
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
            width: 200

        text = "HP" +  @_player.hp_remain + "/" + @_player.hp_max
        @_hp.setText text
        @_statusView.add @_hp
    _set_equipment:->
        @_equipment = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            left: 5
            top: 31
            height: 30
            width: 'auto'
            text: "装備"
        @_statusView.add @_equipment

        @_set_weapon()
        @_set_shield()

    _set_weapon: ->
        @_weapon = Ti.UI.createView
            right: 5
            top: 35
            height: 30
            width: 200

        @_weapon_image = Ti.UI.createView
            right: 1
            height: 30
            width: 30
            backgroundImage: 'images/item/hammer.png'

        @_weapon_text = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            right: 32
            height: 30
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
            width: 200

        text = "最強のハンマー"
        @_weapon_text.setText text
        @_weapon.add @_weapon_image
        @_weapon.add @_weapon_text

        @_statusView.add @_weapon

    _set_shield: ->
        @_shield = Ti.UI.createView
            right: 5
            top: 60
            height: 30
            width: 200

        @_shield_image = Ti.UI.createView
            right: 1
            height: 30
            width: 30
            backgroundImage: 'images/item/shield.png'

        @_shield_text = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
                fontFamily: 'Arial'
            right: 32
            height: 30
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
            width: 200

        text = "いかれた盾"
        @_shield_text.setText text
        @_shield.add @_shield_image
        @_shield.add @_shield_text

        @_statusView.add @_shield

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
