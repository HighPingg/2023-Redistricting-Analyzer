// Redux Imports
import { useSelector } from 'react-redux';

// Imports for graphing util.
import ReactApexChart from 'react-apexcharts'
import Chart from 'react-apexcharts'

function Graph(){
    // Get selected state from reducer
    const map = useSelector(state => state.map);

    let display = "Select a state to show more data"
    
    let options, series = null
    if (map.selectedState!= null){
      
      switch(map.currentDisplay){
        case "Ensemble":
          series =  [
            {
            type: 'boxPlot',
            data: map.currentGraphData.data
            }
          ];
  
          options = {
              chart: {
              type: 'boxPlot',
              height: 350
              },
              title: {
              text: map.currentGraphData.graphTitle,
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
          display = <ReactApexChart options={options} series={series} type="boxPlot" height={350} key ={map.currentDisplay}/> ;
          break;

        case "Incumbency":
          // Fake data 
          series = [{
              name: 'Republican',
              data: [6, 0]
          }, {
              name: 'Democratic',
              data: [3, 0]
          }, {
              name: 'Open',
              data: [0, 1]
          }];

          options = {
              chart: {
                  type: 'bar',
                  height: 350,
                  stacked: true,
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
                  text: 'Incumbencies'
              },
              xaxis: {
                  categories: ["Incumbent", "Open"],
                  labels: {
                  formatter: function (val) {
                      return val + "K"
                  }
                  }
              },
              yaxis: {
                  title: {
                  text: undefined
                  },
              },
              tooltip: {
                  y: {
                  formatter: function (val) {
                      return val + "K"
                  }
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
          display = <Chart options={options} type="bar" series={series} width="100%" key ={map.currentDisplay}/>;
          break;
            
        default:
          display = "Select a graph type to display"
        
          };
      }
      
  return (
  <div>
    {display}
  </div>
  );
}

export default Graph;