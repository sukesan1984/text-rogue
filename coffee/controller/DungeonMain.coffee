ModelFactory   = require 'model/Factory'
DungeonRecordFactory  = require 'view/dungeon/record/Factory'
DungeonFieldView = require 'view/dungeon/Field'
DungeonLogView = require 'view/dungeon/Log'
StatusView     = require 'view/dungeon/Status'
Styles = require 'view/layout/DungeonStyle'
styles = Styles.get()

class DungeonMainController
    constructor : ( args )->
        @_turn = 0
        @_rowData = []
        @_rowObjects = []

        @containingTab = args.containingTab
        @dungeon = args.dungeon

        @win = Ti.UI.createWindow
            backgroundColor: '#FFFFFF'

        @win.hideNavBar()
        fieldTableView = Ti.UI.createTableView( styles['field'] )
        @dungeonFieldView = new DungeonFieldView( fieldTableView )
        @dungeonFieldView.appendedTo @win

        statusView = Ti.UI.createView( styles['status'] )
        @statusView = new StatusView( statusView )
        @statusView.appendedTo @win
        @statusView.addObserver 'click', ( e, pushed )=>
            @dungeonFieldView.onStatusClick( e, pushed )

        logView = Ti.UI.createLabel( styles['log'] )
        @logView = new DungeonLogView( logView )
        @logView.appendedTo @win
        @statusView.addObserver 'click', ( e, pushed )=>
            @logView.onStatusClick( e, pushed )

        @goButton = Ti.UI.createButton( styles['go'] )

        @goButton.addEventListener 'click', (e)=>
            @._goNextTurn( e )

        if !@dungeon
            @._startMock()
        else
            @._setMock()

        @win.add @goButton
        return @win
    _startMock: ()->
        modelFields = ModelFactory.get( "Fields" )
        modelSeq = ModelFactory.get( "FieldSequencial" )
        id = modelSeq.get()
        modelFields.insert( id, 4 )
        @.reload()

    _goNextTurn: ( e )=>
        @.reset()
        @.countUpTurn()
        @.notify( "action" )
        @.reload()
        @._setMock()
        return

    reset: ->
        player = ModelFactory.get("PlayerInstance").get()
        return if player.hp_remain > 0
        @.goTown()

    _setMock: ->
        rand = parseInt(Math.random()*100)
        modelFields = ModelFactory.get( "Fields" )
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
            modelFields.insert( id, 1)
        else if( rand <= 90)
            item_id = @._get_item_id( rand )
            modelItemMaster = ModelFactory.get("ItemMaster")
            i_master = modelItemMaster.get_by_id( item_id )
            modelItemInstance = ModelFactory.get("ItemInstance")
            modelItemInstance.insert(id, i_master)
            modelFields.insert( id, 2)
        else if( rand <= 100)
            modelFields.insert( id, 3)
        else

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

        @dungeonFieldView.deleteAll( @_rowData )

        modelFields = ModelFactory.get( "Fields" )
        rows = modelFields.get_all()

        for row in rows
            r = DungeonRecordFactory.get( row )
            r.addObserver 'click', ( e, r )  =>
                switch r.type 
                    when 4
                        @.start()
                    when 3
                        @.goNextFloor()
                    else
                        @._goNextTurn( e )
            rowData.push r.get()
            rowObjects.push r
        @_rowData = rowData
        @_rowObjects = rowObjects
        @dungeonFieldView.setData(rowData)
        @statusView.reload()
        @logView.setText()
    start: ( id )->
        id ||= 1
        modelFields = ModelFactory.get( "Fields" )
        modelFields.deleteAll()
        DungeonController = require 'controller/Dungeon'
        dungeon = ModelFactory.get("DungeonMaster").get_by_id( id )
        dungeonController = new DungeonController( dungeon )
        dungeonController.open( 2 )

    goTown: ()->
        TownController = require 'controller/Town'
        townController = new TownController()
        townController.open()

    goNextFloor: ->
        # refactoring
        modelFields = ModelFactory.get( "Fields" )
        modelFields.deleteAll()
        win = new DungeonMainController
                containingTab: @containingTab
                dungeon: @dungeon
        @containingTab.activeTab.open win, {animated:true}
    countUpTurn: ->
        @_turn++
module.exports = DungeonMainController