// Redux Imports
import { useSelector } from 'react-redux';

//Imports for graphing util.
import {CanvasJSChart} from 'canvasjs-react-charts'



function Graph(){
    //Get selected state from reducer
    const map = useSelector(state => state.map);
    
    let state_data = map.currentGraphData;


    // Defining the graph to be rendered, gotten from data
    let options = null;
    if (state_data != null){

        options = {
            theme: state_data.theme, 
            animationEnabled: true,
            title:{
                text: state_data.title.text
            },
            axisY: {
                title: state_data.axisY.title
            },
            data: [{
                // type: "boxAndWhisker",
                type: state_data.data[0].type,
                yValueFormatString: state_data.data[0].yValueFormatString,
                // dataPoints: state_data.data[0].dataPoints

                dataPoints:[
                    { label: "Bread",  y: [179, 256, 300, 418, 274] },
                    { label: "Cake",  y: [252, 346, 409, 437, 374.5] },
                    { label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
                    { label: "Doughnut",  y: [340, 382, 430, 452, 417] },
                    { label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
                    { label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
                ]

            }]
        }
    }


    let chart = "Select a state to show more data";

    if (options != null){
        chart = <CanvasJSChart options = {options}/>
        /* onRef={ref => this.chart = ref} */
    }
    

    return (
		<div>
            {chart}
		</div>
		);
}

export default Graph;