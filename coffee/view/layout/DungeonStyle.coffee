exports.get = ->
    style =
        field:
            color: '#FFFFFF'
            left: 0
            top: 90
            rowHeight: 60
            height: 300
        status:
            height: 30
            top: 0
            left: 0
            right: 0
            children: []
        log:
            height: 60
            top: 30
            left: 0
            right:0
            color: '#576996'
            font:
                fontSize: 12
                fontWeight: 'bold'
                fontFamily: 'Arial'
        go:
            systemButton: Ti.UI.iPhone.SystemButton.DONE
            height: 50
            width: 300
            bottom: 10
            title: "GO"
    return style
