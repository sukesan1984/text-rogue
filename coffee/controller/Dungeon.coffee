ModelFactory   = require 'model/Factory'
DungeonRecordFactory  = require 'view/dungeon/record/Factory'
DungeonLogView = require 'view/dungeon/Log'
StatusView     = require 'view/dungeon/Status'
Styles = require 'view/layout/DungeonStyle'
styles = Styles.get()

class DungeonController
    constructor :->
        @_turn = 0
        @_rowData = []
        @_rowObjects = []
        @win = Ti.UI.createWindow
            backgroundColor: '#FFFFFF'

        @win.hideNavBar()
        logTableView = Ti.UI.createTableView( styles['log'] )
        @dungeonLogView = new DungeonLogView( logTableView )
        @dungeonLogView.appendedTo @win

        statusView = Ti.UI.createView( styles['status'] )
        @statusView = new StatusView( statusView )
        @statusView.appendedTo @win
        @statusView.addObserver 'click', ( e, pushed )=>
            @dungeonLogView.onStatusClick( e, pushed )

        @goButton = Ti.UI.createButton( styles['go'] )

        @goButton.addEventListener 'click', (e)=>
            @.countUpTurn()
            @.notify( "action" )
            @.reload()
            @._setMock()
            return

        @_setMock()

        @win.add @goButton
        return @win
    _setMock: ->
        rand = parseInt(Math.random()*100)
        modelRecords = ModelFactory.get( "Records" )
        modelSeq = ModelFactory.get( "FieldSequencial" )
        id = modelSeq.get()
        if ( rand <= 50 )
            enemy_id = ModelFactory.get("EnemyMapMaster").get_enemy_id
                dungeon_id:1
                floor:1
            modelEnemyMaster = ModelFactory.get("EnemyMaster")
            e_master = modelEnemyMaster.get_by_id( enemy_id )
            modelEnemyData = ModelFactory.get("Enemy")
            modelEnemyData.insert(id, e_master )
            modelRecords.insert( id, 1)
        else if( rand <= 100)
            item_id = @._get_item_id( rand )
            modelItemMaster = ModelFactory.get("ItemMaster")
            i_master = modelItemMaster.get_by_id( item_id )
            modelItemInstance = ModelFactory.get("ItemInstance")
            modelItemInstance.insert(id, i_master)
            modelRecords.insert( id, 2)
        else

        @reload()

    _get_item_id: ( seed )->
        if seed <= 70
            return 1
        else if seed <= 90
            return 2
        else
            return 3

    notify: ( func ) ->
        for i in @_rowObjects
            i[func]()

    reload: ->
        rowData = []
        rowObjects = []

        @dungeonLogView.deleteAll( @_rowData )

        modelRecords = ModelFactory.get( "Records" )
        rows = modelRecords.get_all()
        for row in rows
            r = DungeonRecordFactory.get( row )
            r.addObserver 'click', (e) => 
                @.reload()
            rowData.push r.get()
            rowObjects.push r
        @_rowData = rowData
        @_rowObjects = rowObjects
        @dungeonLogView.setData(rowData)

    countUpTurn: ->
        @_turn++
module.exports = DungeonController
