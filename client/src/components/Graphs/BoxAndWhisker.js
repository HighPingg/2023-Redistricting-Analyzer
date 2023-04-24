// Redux Imports
import { useSelector } from 'react-redux';

// Imports for graphing util.
import ReactApexChart from 'react-apexcharts'
import Chart from 'react-apexcharts'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function BoxAndWhiskerGraph() {

    const map = useSelector(state => state.map);

    let selectedState = null;
    switch (map.selectedState) {
      case "Illinois":
        selectedState = 'IL';
        break;
      
      case "Ohio":
        selectedState = 'OH';
        break;

      case "Nevada":
        selectedState = 'NV';
        break;
    }

    const { data, error, isLoading } = useSWR('http://localhost:8080/graph/'+ selectedState +'/'+ map.currentDistrictPlan + '/geographic', fetcher)

    if (error) {
        return (<div>Failed to Load.</div>)
    }
    else if (!isLoading) {
        let options = {
            chart: {
                type: 'boxPlot',
                height: 350
            },
            title: {
                text: data.graphTitle,
                align: 'left'
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                    upper: '#5C4742',
                    lower: '#A5978B'
                    }
                }
            }
        };


        return (
            <ReactApexChart options={options}
                            series={data.graphSeries}
                            type="boxPlot"
                            height="330"
                            key = {map.currentDistrictPlan + map.currentDisplay}
            />
        );
    }
    else {
        return (<div>Loading...</div>);
    }
}

export default BoxAndWhiskerGraph;