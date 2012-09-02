exports.init = ( titleStr ) ->
    win = Ti.UI.createWindow
        backgroundColor: '#FFFFFF'
    
    win.hideNavBar()
    RecordController = require 'record/Controller'

    DungeonLogView = require 'ui/DungeonLogView'
    dungeonLogView = new DungeonLogView()
    dungeonLogView.appendedTo win

    recordController = new RecordController( dungeonLogView )

    StatusView = require 'ui/StatusView'
    statusView = new StatusView()
    statusView.appendedTo win
    statusView.addObserver 'click', ( e, pushed )=>
        dungeonLogView.onClick( e, pushed )

    goButton = Ti.UI.createButton
        systemButton: Ti.UI.iPhone.SystemButton.DONE
        height: 50
        width: 300
        bottom: 10
        title: "GO"

    goButton.addEventListener 'click', (e)->
        recordController.countUpTurn()
        recordController.notify( "action" )
        recordController.reload()
        recordController._setMock()
        return

    win.add goButton
    return win
