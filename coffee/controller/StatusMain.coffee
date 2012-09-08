Styles = require 'view/layout/StatusMainStyle'
styles = Styles.get()

class StatusMainController
    constructor:(titleStr) ->
        console.log( JSON.stringify( styles ) )
        @win = Ti.UI.createWindow
            title: titleStr
            backgroundColor: "#FFFFFF"
        @win.hideNavBar()
        @StatusMainView = Ti.UI.createView(styles['root'])

        @name = Ti.UI.createLabel
            color: '#576996'
            font:
                fontSize: 16
                fontWeight: 'bold'
            left: 0
            top: 0
            height: 30
            width: 'auto'
            text: 'name'
        @hp = Ti.UI.createLabel(styles['hp'])
        @lv = Ti.UI.createLabel(styles['lv'])

        @StatusMainView.add @name
        @StatusMainView.add @hp
        @StatusMainView.add @lv
        @win.add @StatusMainView
        return @win
module.exports = StatusMainController
