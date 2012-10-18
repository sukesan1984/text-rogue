# CommonJS Modules (AppTabMods.coffee)

# Class (Constructor Function)
class AppTabMods
    constructor: () ->
        @tabGroup = Ti.UI.createTabGroup()
    appendTabs: (params) ->
        self = @
        self.tabGroup.addTab Ti.UI.createTab(param) for param in params
        return
    open: (defaultTabNums = 0) ->
        self = @
        self.tabGroup.setActiveTab defaultTabNums
        self.tabGroup.open()
        return
    close: ->
        @tabGroup.close()
module.exports = AppTabMods
