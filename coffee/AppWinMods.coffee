# CommonJS Modules (AppWinMods.coffee)

# Module Private
helloStr = "Hello %s.";

# Module Public
exports.init = (titleStr) ->
    win = Ti.UI.createWindow
        title: titleStr
        backgroundColor: "#FFFFFF"
    label = Ti.UI.createLabel
        text: titleStr
        color: "#666666"
        backgroundColor: "#FFFFFF"
    label.addEventListener "click", ->
        alert String.format(helloStr, titleStr)
        return
    win.add label
    return win
