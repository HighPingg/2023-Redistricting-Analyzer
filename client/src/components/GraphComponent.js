// Redux Imports
import { useSelector } from 'react-redux';

import BoxAndWhiskerGraph from './Graphs/BoxAndWhisker';
import SplitPartyGraph from './Graphs/SplitPartyGraph';
import DemographicGraph from './Graphs/DemographicGraph';
import UnselectedGraph from './Graphs/UnselectedGraph';
import BoxAndWhiskerPopGraph from './Graphs/BoxAndWhiskerPop';
import BoxAndWhiskerRaceGraph from './Graphs/BoxAndWhiskerRace';
import RacialDataPlanToggle from './RacialDataToggleComponent';
import SafeSeatsGraph from './Graphs/SafeSeatsGraph';
import { Box } from '@mui/material';

function Graph(){
    // Get selected state from reducer
    const map = useSelector(state => state.map);

    if (map.selectedState != null){
        if (map.currentDistrictPlan == '2020')
            return <UnselectedGraph />
      switch(map.currentDisplay){

        case "Safe Seats":
            return <SafeSeatsGraph />
        
        case "Population":
            return <BoxAndWhiskerPopGraph />

        case "BoxWhisker":
            return <BoxAndWhiskerGraph />

        case "SplitParty":
            return <SplitPartyGraph />;

        case "Demographic":
            return(
                <Box>
                    <RacialDataPlanToggle />
                    <BoxAndWhiskerRaceGraph />
                </Box>
            );
            
        default:
            
            return <UnselectedGraph/>;
        };
    }
}

export default Graph;