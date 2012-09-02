ModelFactory   = require 'model/Factory'
RecordFactory  = require 'view/dungeon/record/Factory'
DungeonLogView = require 'view/dungeon/Log'
StatusView     = require 'view/dungeon/Status'

class DungeonController
    constructor :->
        @_turn = 0
        @_rowData = []
        @_rowObjects = []
        @win = Ti.UI.createWindow
            backgroundColor: '#FFFFFF'

        @win.hideNavBar()
        @dungeonLogView = new DungeonLogView()
        @dungeonLogView.appendedTo @win

        @statusView = new StatusView()
        @statusView.appendedTo @win
        @statusView.addObserver 'click', ( e, pushed )=>
            @dungeonLogView.onClick( e, pushed )

        @goButton = Ti.UI.createButton
            systemButton: Ti.UI.iPhone.SystemButton.DONE
            height: 50
            width: 300
            bottom: 10
            title: "GO"

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
            enemy_id = @._get_enemy_id( rand )
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
    _get_enemy_id: ( seed )->
         if seed <= 20
             return 1
         else if seed < 30
             return 2
         else
             return 3

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
            r = RecordFactory.get( row )
            rowData.push r.get()
            rowObjects.push r
        @_rowData = rowData
        @_rowObjects = rowObjects
        @dungeonLogView.setData(rowData)

    countUpTurn: ->
        @_turn++
module.exports = DungeonController