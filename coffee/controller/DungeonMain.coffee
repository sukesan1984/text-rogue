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

        @pulling = false
        @reloading = false

        @win = Ti.UI.createWindow
            backgroundColor: '#FFFFFF'

        @win.hideNavBar()

        @border = Ti.UI.createView
            backgroundColor: "#576c89"
            height: 2
            bottom: 0

        @tableHeader = Ti.UI.createView
            backgroundColor: "#e2e7ed"
            width: 320
            height: 60

        @tableHeader.add @border

        @arrow = Ti.UI.createView
            backgroundImage: "images/ui/whiteArrow.png"
            width:23
            height:60
            bottom:10
            left:20

        @statusLabel = Ti.UI.createLabel
            text: "ダンジョンの奥へと進む",
            left: 55
            width: 200
            bottom: 30
            height: "auto"
            color: "#576c89"
            textAlign: "center"
            font:
                fontSize:13
                fontWeight: "bold"
            shadowColor: "#999"
            shadowOffset:
                x:0
                y:1

        @lastUpdatedLabel = Ti.UI.createLabel
            text: "このフロアの進捗(1/5) "
            left: 55
            width: 200
            bottom: 15
            height: "auto"
            color: "#576c89"
            textAlign: "center"
            font:
                fontSize:12
            shadowColor: "#999"
            shadowOffset:
                x:0
                y:1

        @tableHeader.add @arrow
        @tableHeader.add @statusLabel
        @tableHeader.add @lastUpdatedLabel

        fieldTableView = Ti.UI.createTableView( styles['field'] )
        @dungeonFieldView = new DungeonFieldView( fieldTableView )
        @dungeonFieldView.appendedTo @win
        fieldTableView.headerPullView = @tableHeader
        fieldTableView.addEventListener 'scroll', (e)=>
            @.onTableViewScroll( e )

        fieldTableView.addEventListener 'scrollEnd', (e)=>
            @.onTableViewScrollEnd( e )


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


        if !@dungeon
            @._startMock()
        else
            #@._setNextTurn()
            @.reload()
            #@._setMock()

        return @win
    onTableViewScroll: (e)->
        offset = e.contentOffset.y
        if ( offset <= -65.0 && !@pulling )
            t = Ti.UI.create2DMatrix()
            t = t.rotate -180
            @pulling = true
            @arrow.animate
                transform: t
                duration: 180
            @statusLabel.text = "次の部屋へ"
        else if ( @pulling && offset > -65.0 && offset < 0 )
            @pulling = false
            t = Ti.UI.create2DMatrix()
            @arrow.animate
                transform: t
                duration: 180
            @statusLabel.text = "ダンジョンの奥へと進む"

    onTableViewScrollEnd: (e)->
        @reloading = false
        @statusLabel.text = "ダンジョンの奥へと進む"
        @_goNextTurn()
        @._setMock()
        @.reload()
        @arrow.show()

    _setNextTurn: ()->
        modelFields = ModelFactory.get( "Fields" )
        modelSeq = ModelFactory.get( "FieldSequencial" )
        id = modelSeq.get()
        modelFields.insert( id, 5 )

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
        return

    reset: ->
        player = ModelFactory.get("PlayerInstance").get()
        return if player.hp_remain > 0

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
        else if( rand <= 70)
            modelFields.insert( id, 6 )
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
        #return @.reloadMock()
        rowData = []
        rowObjects = []

        @dungeonFieldView.deleteAll( @_rowData )

        modelFields = ModelFactory.get( "Fields" )
        rows = modelFields.get_all()

        for row in rows
            r = DungeonRecordFactory.get( row )
            r.addObserver 'click', ( e, r )  =>
                switch r.type
                    when 3
                        @.goNextFloor()
                    when 4
                        @dungeon = 1
                        @.goNextFloor()
                    when 5
                        @._goNextTurn( e )
                    when 6
                        @._goNextTurn( e )
                    else
                        @._goNextTurn( e )
            rowData.push r.get()
            rowObjects.push r
        @_rowData = rowData
        @_rowObjects = rowObjects
        @dungeonFieldView.setData(rowData)
        @statusView.reload()
        @logView.setText()

    reloadMock: ->
        rowData = []
        rowObjects = []
        for row in [0..@._turn]
            r = DungeonRecordFactory.get
                type: 99
                id: row
            rowData.push r.get()
            rowObjects.push r

        @_rowData = rowData
        @_rowObjects = rowObjects
        @dungeonFieldView.setData(rowData)
        @statusView.reload()
        @logView.setText()

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
