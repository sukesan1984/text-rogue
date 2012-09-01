exports.init = ( titleStr ) ->
    win = Ti.UI.createWindow
        backgroundColor: '#FFFFFF'
    
    win.hideNavBar()
    RecordManager = require 'record/Manager'


    tableView = RecordManager.getTableView()
    tableView.top = 30
    tableView.setRowHeight 60
    tableView.setHeight 300

    win.add tableView
    statusView = Ti.UI.createView
        backgroundColor: 'red'
        height:30
        top:0
        left:0
        right:0
    pushed = false
    statusView.addEventListener 'click', (e)->
        if pushed is false
            statusView.setHeight 100
            tableView.setTop 100
            pushed = true
        else
            statusView.setHeight 30
            tableView.setTop 30
            pushed = false

    win.add statusView

    goButton = Ti.UI.createButton
        systemButton: Ti.UI.iPhone.SystemButton.DONE
        height: 50
        width: 300
        bottom: 10
        title: "GO"

    goButton.addEventListener 'click', (e)->
        RecordManager.countUpTurn()
        RecordManager.notify( "action" )
        RecordManager.reload()
        RecordManager._setMock()
        return

    win.add goButton
    return win
