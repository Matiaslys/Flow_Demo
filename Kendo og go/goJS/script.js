
var Icons = {};
Icons.mail = "M13.333 0h-10.666c-1.467 0-2.667 1.2-2.667 2.667v10.666c0 1.467 1.2 2.667 2.667 2.667h10.666c1.468 0 2.667-1.2\
 2.667-2.667v-10.666c0-1.467-1.199-2.667-2.667-2.667zM4 4h8c0.143 0 0.281 0.031 0.409 0.088l-4.409 5.143-4.409-5.143c0.127-0.058\
  0.266-0.088 0.409-0.088zM3 11v-6c0-0.021 0.001-0.042 0.002-0.063l2.932 3.421-2.9 2.9c-0.023-0.083-0.034-0.17-0.034-0.258zM12\
   12h-8c-0.088 0-0.175-0.012-0.258-0.034l2.846-2.846 1.413 1.648 1.413-1.648 2.846 2.846c-0.083 0.023-0.17 0.034-0.258 0.034zM13\
    11c0 0.088-0.012 0.175-0.034 0.258l-2.9-2.9 2.932-3.421c0.001 0.021 0.002 0.042 0.002 0.063v6z"

var IconNames = [];
for (var n in Icons) IconNames.push(n);

function geoFunc(geoname) {
    var geo = Icons[geoname];
    if (typeof geo === "string") {
      geo = Icons[geoname] = go.Geometry.parse(geo, true);
    }
    return geo;
}

function init() {
    
    var graphObject = go.GraphObject.make;

    var myDiagram =
  graphObject(go.Diagram, "page",
    { "undoManager.isEnabled": true });
    
    myDiagram.nodeTemplate =
        graphObject(go.Node, "Spot", {resizable: true},
            graphObject(go.Shape,{ fill: "white", portId: "", fromLinkable: true, toLinkable: true,
            doubleClick: function(e, obj){
                myDiagram.remove(obj.part)
            },
            click: function(e, obj){
                console.log(obj.part.data)
            }
        },
            new go.Binding("fill", "color"),
            new go.Binding("height", "icon", function() { }),
            new go.Binding("geometry", "icon", geoFunc)
            ),
            graphObject(go.TextBlock, {
                click: function(e, obj){
                    console.log(obj.part.data.key)
                    myDiagram.model.addNodeData({key: "Omega2", position: "360 -80", tekst: "Omega 2" })
                }},
                new go.Binding("text", "tekst")
            ),
            {locationSpot: go.Spot.Center, locationObjectName: "nodeIcon" },
            new go.Binding("location", "position", go.Point.parse).makeTwoWay(go.Point.stringify),
        );

    myDiagram.linkTemplate =
        graphObject(go.Link, { relinkableFrom: true, relinkableTo: true, reshapable: true, routing: go.Link.Orthogonal, resegmentable: true,
            doubleClick: function(e, obj){myDiagram.remove(obj)},
            click: function(e, obj){console.log(obj.fromNode.key + " " + JSON.stringify(obj.data))}},
            graphObject(go.Shape, { strokeWidth: 1},
                new go.Binding("stroke", "color")
            ),
            graphObject(go.Shape, { toArrow: "Standard", stroke: null},
                new go.Binding("fill", "color")
            )
        );

        var nodeDataArray = [
            { key: "Alpha", color: "lime", position: "0 50", tekst: "Alpha"},
            { key: "Beta", color: "cyan", position: "-200 -80", tekst: "Beta"},
            { key: "Zeta", position: "200 -80", tekst: "Zeta"},
            { key: "Delta", color: "pink", position: "250 150", tekst: "Delta"},
            { key: "Gamma", color: "maroon", position: "-250 150", tekst: "Gamma"},
            { key: "Omega", color: "gray", icon: "mail", position: "0 250", size: "100 100"}
        ];

        var linkDataArray = [
            { to: "Beta", from: "Alpha", text: "something"},
            { from: "Alpha", to: "Zeta" },
            { from: "Alpha", to: "Delta", id: "1999"}
        ];

        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    
        myDiagram.toolManager.relinkingTool.updateAdornments(linkDataArray);
}