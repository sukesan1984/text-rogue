exports.init = (titleStr) ->
    win = Ti.UI.createWindow
        title: titleStr
        backgroundColor: '#FFFFFF'
    rows = [
        { title:'Row1', hasChild:true },
        { title:'Row2', hasDetail:true },
        { title:'Row3', hasCheck:true },
        { title:'Row4' },
    ]
    tableview = Ti.UI.createTableView
         data: rows
    tableview.addEventListener 'click', (e)->
        index = e.index
        section = e.section
        row = e.rows
        rowdata = e.rowData
    win.add tableview
    return win
