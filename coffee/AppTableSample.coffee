exports.init = ( titleStr ) ->
    win = Ti.UI.createWindow
        title: titleStr
        backgroundColor: '#FFFFFF'
    searchBar = Ti.UI.createSearchBar
        barColor: '#385292'
        showCancel: false


    RecordManager = require 'record/Manager'

    rowData = RecordManager.getRecords()

    tableView = Ti.UI.createTableView
        data: rowData
        seach: searchBar
    tableView.setHeight(300)
    tableView.setTop(0)

    win.add tableView

    goButton = Ti.UI.createButton
        systemButton: Ti.UI.iPhone.SystemButton.DONE

    goButton.setHeight(50)
    goButton.setWidth( 300 )
    goButton.setTop( 305 )
    goButton.setTitle("GO")
    goButton.addEventListener 'click', (e)->
        RecordManager.countUpTurn()
        RecordManager.notifyRecords( "action" )

    win.add goButton
    return win
