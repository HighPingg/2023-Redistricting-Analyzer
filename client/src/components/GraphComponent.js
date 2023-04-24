// Redux Imports
import { useSelector } from 'react-redux';

// Imports for graphing util.
import ReactApexChart from 'react-apexcharts'
import Chart from 'react-apexcharts'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Graph(){
    // Get selected state from reducer
    const map = useSelector(state => state.map);
    let selectedPlan = map.currentDistrictPlan;
    let display = "Select a state to show more data"

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
    let options, series = null
    const { data, error, isLoading } = useSWR('http://localhost:8080/graphs/'+ selectedState +'/'+ selectedPlan, fetcher)
    console.log(data)
    if (map.selectedState!= null){
      if(isLoading != true){
      switch(map.currentDisplay){
        case "BoxWhisker":
          console.log("BoxDisplay")
          series = data.geographic.graphSeries;
          options = {
              chart: {
              type: 'boxPlot',
              height: 350
              },
              title: {
              text: data.geographic.graphTitle,
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
          display = <ReactApexChart options={options} series={series} type="boxPlot" height={350} key ={map.currentDistrictPlan + map.currentDisplay}/> ;
          break;

        case "SplitParty":
        console.log(data.partySplitView)
        console.log("DATA^^^^^^^^^^^^^")
          series = data.partySplitView.graphData;

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
                  text: data.partySplitView.graphTitle
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
          display = <Chart options={options} type="bar" series={series} width="100%" height="200%" key ={map.currentDistrictPlan + map.currentDisplay}/>;
          break;

          case "Demographic":
            // Fake data 
            series = [{
                name: '2022',
                data: [6, 3, 5 ,7]
            },
            {
                name: '2020',
                data: [1, 10, 8 ,4]
            },
            {
                name: 'Random Plan',
                data: [5, 5, 5 ,5]
            },
          ];
  
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
                    text: 'Demographic distribution'
                },
                xaxis: {
                    categories: ["African American", "Asian", "White", "Hispanic"],
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
            display = <Chart options={options} type="bar" series={series} width="100%" height="200%" key ={map.currentDistrictPlan + map.currentDisplay}/>;
            break;
            
        default:
          display = "Select a graph type to display"
        
          };
      }
    }
      if (error) return <div>failed to load</div>
      if (isLoading) return <div>loading...</div>
      return <div>{display}</div>
    
  return (
  <div>
    {display}
  </div>
  );
}

export default Graph;