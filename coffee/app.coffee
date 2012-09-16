# Sample Application - app.coffee
do ->
    TownController = require 'controller/Town'
    townController = new TownController()
    townController.open()
    # CommonJS Modules
