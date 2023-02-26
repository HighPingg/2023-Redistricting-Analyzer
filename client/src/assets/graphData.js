//For now this is just dummy data
var graphingOverview = {"states":{"Ohio":{
    theme: "light2", 
    animationEnabled: true,
    title:{
        text: "Ensemble Data For Ohio"
    },
    axisY: {
        title: "Population maybe"
    },
    data: [{
        type: "boxAndWhisker",
        yValueFormatString: "#,##0.# \"kcap  l/100g\"",
        dataPoints: [
            { label: "District 1",  y: [179, 256, 300, 418, 274] },
            { label: "District 2",  y: [252, 346, 409, 437, 374.5] },
            { label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
            { label: "Doughnut",  y: [340, 382, 430, 452, 417] },
            { label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
            { label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
        ]
    }]
},

"Nevada":{
    theme: "light2", 
    animationEnabled: true,
    title:{
        text: "Ensemble Data For Nevada"
    },
    axisY: {
        title: "Population maybe"
    },
    data: [{
        type: "boxAndWhisker",
        yValueFormatString: "#,##0.# \"kcal/100g\"",
        dataPoints: [
            { label: "Bread",  y: [179, 256, 300, 418, 274] },
            { label: "Cake",  y: [252, 346, 409, 437, 374.5] },
            { label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
            { label: "Doughnut",  y: [340, 382, 430, 452, 417] },
            { label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
            { label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
        ]
    }]
},

"Illinois":{
    theme: "light2", 
    animationEnabled: true,
    title:{
        text: "Ensemble Data For Illinois"
    },
    axisY: {
        title: "Population maybe"
    },
    data: [{
        type: "boxAndWhisker",
        yValueFormatString: "#,##0.# \"kcal/100g\"",
        dataPoints: [
            { label: "Bread",  y: [179, 256, 300, 418, 274] },
            { label: "Cake",  y: [252, 346, 409, 437, 374.5] },
            { label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
            { label: "Doughnut",  y: [340, 382, 430, 452, 417] },
            { label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
            { label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
        ]
    }]
}

}};

export default graphingOverview;