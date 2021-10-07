/*function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;
    g.append(new dataviz.diagram.Rectangle({
        width: 8,
        height: 67,
        fill: dataItem.Color,
        stroke: {
            width: 0
        },
        fill: "#e8eff7"
    }));

    return g;
}

function onDataBound(e) {
    var that = this;
    setTimeout(function () {
        that.bringIntoView(that.shapes);
    }, 0);
}

function createDiagram() {
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
let JSONObj
var myInit = {method: "get",
              headers: {
                "Content-Type": 'application/json'
              },
              mode: 'cors',
              cache: 'default'}

fetch("./test2.json", myInit)
.then(function(resp) {
    return resp.json();
})
.then(function(data) {
    //console.log(data[1].id)
    JSONObj = data;
})
console.log(JSONObj[0].id)
var shapesDataSource = new kendo.data.DataSource({  
    data: JSONObj,
    schema: {
        data: "jobs"
    }
});

var connectionsDataSource = {
    
    batch: false,
    transport: {
        read: {
            url: serviceRoot + "/DiagramConnections",
            dataType: "jsonp"
        },
        update: {
            url: serviceRoot + "/DiagramConnections/Update",
            dataType: "jsonp"
        },
        destroy: {
            url: serviceRoot + "/DiagramConnections/Destroy",
            dataType: "jsonp"
        },
        create: {
            url: serviceRoot + "/DiagramConnections/Create",
            dataType: "jsonp"
        },
        parameterMap: function (options, operation) {
            if (operation !== "read") {
                return { models: kendo.stringify(options.models || [options]) };
            }
        }
    },
    schema: {
        model: {
            id: "id",
            fields: {
                id: { from: "Id", type: "number", editable: false },
                from: { from: "FromShapeId", type: "number" },
                to: { from: "ToShapeId", type: "number" },
                fromX: { from: "FromPointX", type: "number" },
                fromY: { from: "FromPointY", type: "number" },
                toX: { from: "ToPointX", type: "number" },
                toY: { from: "ToPointY", type: "number" }
            }
        }
    }
};
var connectionsDataSource = {
    batch: false,
    transport: {
        read: {
            url: "Json",
            dataType: "jsonp"
        },
        update: {
            url: "/Json",
            dataType: "jsonp"
        },
        destroy: {
            url: "/Json",
            dataType: "jsonp"
        },
        create: {
            url: "/Json",
            dataType: "jsonp"
        },
        parameterMap: function (options, operation) {
            if (operation !== "read") {
                return { models: kendo.stringify(options.models || [options]) };
            }
        }
    },
    schema: {
        model: {
            id: "id",
            fields: {
                id: { from: "Id", type: "number", editable: false },
                from: { from: "FromShapeId", type: "number" },
                to: { from: "ToShapeId", type: "number" },
                fromX: { from: "FromPointX", type: "number" },
                fromY: { from: "FromPointY", type: "number" },
                toX: { from: "ToPointX", type: "number" },
                toY: { from: "ToPointY", type: "number" }
            }
        }
    }
}

$("#diagram").kendoDiagram({
    dataSource: shapesDataSource,
    connectionsDataSource: connectionsDataSource,
    layout: {
        type: "tree",
        subtype: "tipover",
        underneathHorizontalOffset: 140
    },
    shapeDefaults: {
        visual: visualTemplate,
        content: {
            template: "#= dataItem.JobTitle #",
            fontSize: 17,
            color: "#444"
        }
    },
    connectionDefaults: {
        stroke: {
            color: "#586477",
            width: 2
        }
    },
    dataBound: onDataBound
});
};
$(document).ready(createDiagram);
*/

function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;

    if (dataItem.JobTitle === "President") {
        g.append(new dataviz.diagram.Circle({
            radius: 60,
            stroke: {
                width: 2,
                color: dataItem.Color || "#586477"
            },
            fill: "#e8eff7"
        }));
    } else {
        g.append(new dataviz.diagram.Rectangle({
            width: 240,
            height: 67,
            stroke: {
                width: 0
            },
            fill: "#e8eff7"
        }));

        g.append(new dataviz.diagram.Rectangle({
            width: 8,
            height: 67,
            fill: dataItem.Color,
            stroke: {
                width: 0
            }
        }));
    }

    return g;
}

function onDataBound(e) {
    var that = this;
    setTimeout(function () {
        that.bringIntoView(that.shapes);
    }, 0);
}

function createDiagram() {
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

    var shapesDataSource = {
        batch: false,
        transport: {
            read: {
                url: serviceRoot + "/DiagramShapes",
                dataType: "jsonp"
            },
            update: {
                url: serviceRoot + "/DiagramShapes/Update",
                dataType: "jsonp"
            },
            destroy: {
                url: serviceRoot + "/DiagramShapes/Destroy",
                dataType: "jsonp"
            },
            create: {
                url: serviceRoot + "/DiagramShapes/Create",
                dataType: "jsonp"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                }
            }
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "Id", type: "number", editable: false },
                    JobTitle: { type: "string" },
                    Color: { type: "string" }
                }
            }
        }
    };

    var connectionsDataSource = {
        batch: false,
        transport: {
            read: {
                url: serviceRoot + "/DiagramConnections",
                dataType: "jsonp"
            },
            update: {
                url: serviceRoot + "/DiagramConnections/Update",
                dataType: "jsonp"
            },
            destroy: {
                url: serviceRoot + "/DiagramConnections/Destroy",
                dataType: "jsonp"
            },
            create: {
                url: serviceRoot + "/DiagramConnections/Create",
                dataType: "jsonp"
            },
            parameterMap: function (options, operation) {
                if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                }
            }
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "Id", type: "number", editable: false },
                    from: { from: "FromShapeId", type: "number" },
                    to: { from: "ToShapeId", type: "number" },
                    fromX: { from: "FromPointX", type: "number" },
                    fromY: { from: "FromPointY", type: "number" },
                    toX: { from: "ToPointX", type: "number" },
                    toY: { from: "ToPointY", type: "number" }
                }
            }
        }
    };

    $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
            type: "tree",
            subtype: "tipover",
            underneathHorizontalOffset: 140
        },
        shapeDefaults: {
            visual: visualTemplate,
            content: {
                template: "#= dataItem.JobTitle #",
                fontSize: 17,
                color: "#444"
            }
        },
        connectionDefaults: {
            stroke: {
                color: "#586477",
                width: 2
            }
        },
        dataBound: onDataBound
    });
}

$(document).ready(createDiagram);
