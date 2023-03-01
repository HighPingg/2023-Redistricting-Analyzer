// Redux Imports
import { useSelector } from 'react-redux';

// Imports for graphing util.
import ReactApexChart from 'react-apexcharts'

function Graph(){
    // Get selected state from reducer
    const map = useSelector(state => state.map);

    
    
    let options, series = null
    if (map.selectedState!= null){

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
      
    }
      
  return (
  <div>
    {map.currentGraphData != null ? <ReactApexChart options={options} series={series} type="boxPlot" height={350} /> : "Select a state to show more data"}
  </div>
  );
}

export default Graph;