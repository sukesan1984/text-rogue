# CommonJS Modules (AppWinMods.coffee)

# Module Private

# Module Public
class StatusController
    constructor:(titleStr) ->
        @win = Ti.UI.createWindow
            title: titleStr
            backgroundColor: "#FFFFFF"
        @label = Ti.UI.createLabel
            text: titleStr
            color: "#666666"
            backgroundColor: "#FFFFFF"
        @label.addEventListener "click", ->
            helloStr = "Hello %s.";
            alert String.format(helloStr, titleStr)
            return
        @win.add @label
        return @win
module.exports = StatusController
