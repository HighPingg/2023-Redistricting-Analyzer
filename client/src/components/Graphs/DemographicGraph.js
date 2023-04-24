// Redux Imports
import { useSelector } from 'react-redux';

// Imports for graphing util.
import Chart from 'react-apexcharts'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function DemographicGraph() {

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

    const { data, error, isLoading } = useSWR('http://localhost:8080/graph/'+ selectedState +'/'+ map.currentDistrictPlan + '/race', fetcher)

    if (error) {
        return (<div>Failed to Load.</div>)
    }
    else if (!isLoading) {
        let options = {
            title:{
                text: data.graphTitle
            },
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: data.graphLabels,
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
                }
            }]
        }

        return (
            <Chart options={options}
                   type="pie"
                   series={data.graphSeries}
                   width="100%"
                   height="330"
                   key = {map.currentDistrictPlan + map.currentDisplay}
            />
        );
    }
    else {
        return (<div>Loading...</div>);
    }
}

export default DemographicGraph;