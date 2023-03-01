import { useDispatch, useSelector } from 'react-redux';

function EnsembleData(){
    const map = useSelector(state => state.map);

    return(
        <div>Ensemble Data</div>
    );
}

export default EnsembleData;
