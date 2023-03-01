// Redux Imports
import * as React from 'react';

// Imports for graphing util.
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// for future porting of data
// function createData(district, incumbent, result, geovar, popvar) {
//     return { district, incumbent, result, geovar, popvar };
//   }

// const rows = [
//     createData('')
// ];

function TableComponent() {

    const map = useSelector(state => state.map)
    const dispatch = useDispatch()
    
    let rows = [];
    if (map.currentGraphData != null) {
        rows = map.currentGraphData.incumbents2022.map(x => [x.district, x.winner, x.votes, x.house]);
    } // Should grab all the winner data per district. The console.log should verify it
    console.log(rows);
    


    // let options, series = null
    // if (map.currentGraphData!= null) {
    //     // Fake data 
    //     series = [{
    //         name: 'Republican',
    //         data: [6, 0]
    //     }, {
    //         name: 'Democratic',
    //         data: [3, 0]
    //     }, {
    //         name: 'Open',
    //         data: [0, 1]
    //     }];

    //     options = {
    //         chart: {
    //             type: 'bar',
    //             height: 350,
    //             stacked: true,
    //         },
    //         plotOptions: {
    //             bar: {
    //             horizontal: true,
    //             dataLabels: {
    //                 total: {
    //                 enabled: true,
    //                 offsetX: 0,
    //                 style: {
    //                     fontSize: '13px',
    //                     fontWeight: 900
    //                 }
    //                 }
    //             }
    //             },
    //         },
    //         stroke: {
    //             width: 1,
    //             colors: ['#fff']
    //         },
    //         title: {
    //             text: 'Incumbencies'
    //         },
    //         xaxis: {
    //             categories: ["Incumbent", "Open"],
    //             labels: {
    //             formatter: function (val) {
    //                 return val + "K"
    //             }
    //             }
    //         },
    //         yaxis: {
    //             title: {
    //             text: undefined
    //             },
    //         },
    //         tooltip: {
    //             y: {
    //             formatter: function (val) {
    //                 return val + "K"
    //             }
    //             }
    //         },
    //         fill: {
    //             opacity: 1,
    //             colors: ['#F44336', '#0000FF', '#808080']
    //         },
    //         legend: {
    //             position: 'top',
    //             horizontalAlign: 'left',
    //             offsetX: 40
    //         },
    //         colors:['#F44336', '#0000FF', '#808080']

    //     }
    // };
    if (map.selectedState != null){
      return (
        
        // <div>
        //     {map.selectedState != null ?
        //     <div>
        //     <div>
        //         Population Density: 198.2 <br></br>
        //         District Plans: 14 <br></br>
        //         Incumbents Predicted to Win: 0 <br></br>
        //         Average Geographic Variation: 0 <br></br>
        //         Population Variation in Incumbent Districts: 0 <br></br>
        //     </div>
        //     {/* <div>
        //         <Chart options={options} type="bar" series={series} width="100%" />
        //     </div> */}
        //     </div> : "Select a state to show table data"}
        // </div>

        <TableContainer component={Paper} sx={{ maxHeight: '95vh' }}>
          <Table aria-aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>District</TableCell>
                <TableCell>Incumbent</TableCell>
                <TableCell>Party</TableCell>
                {/* <TableCell>2022 W/L</TableCell> */}
                <TableCell>Geographic Variation</TableCell>
                <TableCell>Population Variation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                console.log(row),
                <TableRow key={row[0]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th">{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  {/* <TableCell>{row[2]}</TableCell> */}
                  <TableCell>Dummy Data</TableCell>
                  <TableCell>Dummy Data</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );}
      else{
        return "Select a state to show table data";
      }
    }

export default TableComponent;


 // let dataPoints = [
    //     { label: "Bread",  y: [179, 256, 300, 418, 274] },
    //     { label: "Cake",  y: [252, 346, 409, 437, 374.5] },
    //     { label: "Biscuit",  y: [236, 281.5, 336.5, 428, 313] },
    //     { label: "Doughnut",  y: [340, 382, 430, 452, 417] },
    //     { label: "Pancakes",  y: [194, 224.5, 342, 384, 251] },
    //     { label: "Bagels",  y: [241, 255, 276.5, 294, 274.5] }
    // ]

    // return(
    //     <div>
    //         Population Density: 
    //         District Plans: 
    //         Incumbents Predicted to Win: 
    //         Average Geographic Variation: 
    //         Population Variation in Incumbent Districts: 



    //     </div>
