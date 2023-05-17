// Redux Imports
import { useSelector } from 'react-redux';

// Imports for graphing util.
import Chart from 'react-apexcharts'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function SplitPartyGraph() {

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

    const { data, error, isLoading } = useSWR('http://localhost:8080/graph/'+ selectedState +'/'+ map.currentDistrictPlan + '/partySplitView', fetcher)

    if (error) {
        return (<div>Failed to Load.</div>)
    }
    else if (!isLoading) {
        let options = {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar:{
                    show: false
                }
            },
            plotOptions: {
                bar: {
                horizontal: true,
                dataLabels: {
                    total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                        fontSize: '13px',
                        fontWeight: 900
                    }
                    }
                }
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: data.graphTitle,
                align: 'center',
            },
            xaxis: {
                categories: ["Incumbent", "Open"],
                labels: {
                }
            },
            yaxis: {
                title: {
                text: undefined
                },
            },
            tooltip: {
                y: {
                }
            },
            fill: {
                opacity: 1,
                colors: ['#F44336', '#0000FF', '#808080']
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            },
            colors:['#F44336', '#0000FF', '#808080']
        }


        return (
            <Chart options={options}
                   type="bar"
                   series={data.graphData}
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

export default SplitPartyGraph;