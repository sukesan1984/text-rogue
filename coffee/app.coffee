# Sample Application - app.coffee
do ->
    DungeonController = require 'controller/Dungeon'
    dungeonController = new DungeonController()
    dungeonController.open()
    # CommonJS Modules
