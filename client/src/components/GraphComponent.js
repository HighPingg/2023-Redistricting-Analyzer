// Redux Imports
import { useSelector } from 'react-redux';

import BoxAndWhiskerGraph from './Graphs/BoxAndWhisker';
import SplitPartyGraph from './Graphs/SplitPartyGraph';
import DemographicGraph from './Graphs/DemographicGraph';
import UnselectedGraph from './Graphs/UnselectedGraph';
import BoxAndWhiskerPopGraph from './Graphs/BoxAndWhiskerPop';

function Graph(){
    // Get selected state from reducer
    const map = useSelector(state => state.map);

    if (map.selectedState != null){
      switch(map.currentDisplay){
        
        case "Population":
            return <BoxAndWhiskerPopGraph />

        case "BoxWhisker":
            return <BoxAndWhiskerGraph />

        case "SplitParty":
            return <SplitPartyGraph />;

        case "Demographic":
            return <DemographicGraph />;
            
        default:
            
            return <UnselectedGraph/>;
        };
    }
}

export default Graph;