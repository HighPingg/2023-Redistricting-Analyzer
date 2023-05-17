// Redux Imports
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts'

import Chart from 'react-apexcharts'

function SafeSeatsGraph() {

    const map = useSelector(state => state.map);

    if (map && map.currentDistrictsInfo) {
      const planInfo = map.currentDistrictsInfo;
  
      let incumbentNumber = 0;
      let noIncumbent = 0;
      let demoSafe = 0;
      let repSafe = 0;
      let noneSafe = 0;
      let demoSeats = 0;
      let repSeats = 0;
  
      for (let i = 0; i < planInfo.length; i++) {
        const district = planInfo[i];
        let incumbentSet = false;
        let demVotes = 0;
        let repVotes = 0;
  
        district.candidates.forEach(function (candidate) {
          if (candidate.incumbent) {
            incumbentNumber += 1;
            incumbentSet = true;
          }
          if (candidate.party === 'Democratic') {
            demVotes += candidate.totalVotes;
            if (candidate.winner)
              demoSeats++;
          } else if (candidate.party === 'Republican') {
            repVotes += candidate.totalVotes;
            if (candidate.winner)
              repSeats++;
          }
        });
  
        if (!incumbentSet)
          noIncumbent += 1;
  
        const totalPop = demVotes + repVotes;
        console.log(totalPop);
  
        if ((repVotes - demVotes) / repVotes > 0.1) {
          repSafe++;
        } else if ((demVotes - repVotes) / demVotes > 0.1) {
          demoSafe++;
        } else {
          noneSafe++;
        }
      }

    // let planInfo = null;
    // if (map.currentDistrictsInfo != null) {
    //     planInfo = map.currentDistrictsInfo;
    // }
    // let incumbentNumber = 0
    // let noIncumbent = 0
    // let demoSafe = 0
    // let repSafe = 0
    // let noneSafe = 0
    // let demoSeats = 0
    // let repSeats = 0
    
    // if (planInfo != null) {
    //     for (let i = 0; i < planInfo.length; i++) {

    //         let district = planInfo[i];
    //         let incumbentSet = false;
    //         let demVotes = 0
    //         let repVotes = 0
    //         district.candidates.forEach(function(candidate) {
    //             if (candidate.incumbent == true)
    //             {
    //                 incumbentNumber+=1;
    //                 incumbentSet = true;
    //             }
    //             if (candidate.party == "Democratic")
    //             {
    //                 demVotes+=candidate.totalVotes;
    //                 if (candidate.winner == true)
    //                     demoSeats++;
    //             }
    //             else if (candidate.party == "Republican")
    //             {
    //                 repVotes+=candidate.totalVotes;
    //                 if (candidate.winner == true)
    //                     repSeats++;
    //             }
    //         });
    //         if (incumbentSet == false)
    //             noIncumbent+=1;
            
    //         var totalPop = demVotes + repVotes;
    //         console.log(totalPop)

    //         if ((repVotes - demVotes)/repVotes > 0.1) {
    //             repSeats++;
    //         }

    //         else if ((demVotes - repVotes)/demVotes > 0.1) {
    //             demoSeats++;
    //         }

    //         else
    //             noneSafe++;
    //     }

        const graphOptions = {
          chart: {
            type: 'bar',
            height: 330
          },
          xaxis: {
            categories: [
              'Democratic Safe',
              'Republican Safe',
              'Non-Safe',
              'Non-Incumbent Seats',
              'Incumbent Seats',
              'Democratic Seats',
              'Republican Seats'
            ]
          },
          title: {
            text: 'Seat Information',
          },
        };
    
        const graphSeries = [{
          name: 'seats',
          data: [demoSafe, repSafe, noneSafe, noIncumbent, incumbentNumber, demoSeats, repSeats]
        }];
    
        return (
          <ReactApexChart
            options={graphOptions}
            series={graphSeries}
            type="bar"
            height={330}
          />
        );

        // let graph = {
        //   series: [{
        //   name: "seats",
        //   data: [demoSafe, repSafe, noneSafe, noIncumbent, incumbentNumber, demoSeats, repSeats]
        // }],
        // options: {
        //   chart: {
        //   type: 'bar',
        //   height: 330
        // },
        //   xaxis: {
        //     categories: [
        //       'Democratic Safe',
        //       'Republican Safe',
        //       'Non-Safe',
        //       'Non-Incumbent Seats',
        //       'Incumbent Seats',
        //       'Democratic Seats',
        //       'Republican Seats'
        //     ]         
        //   },
        //   title: {
        //       text: 'Seat Analysis',
        //   },
        // },
          
        // };
        // console.log(graph.options);
        // console.log(graph.series);
        // console.log(graph.options.xaxis.categories);
        // return(
        //     <ReactApexChart options={graph.options}
        //                     type="boxPlot"
        //                     height="330"
        //                     series={graph.series}

        //     />
        // );
    }
    else {
        return (<div>loading</div>);
    }
        
}

export default SafeSeatsGraph;