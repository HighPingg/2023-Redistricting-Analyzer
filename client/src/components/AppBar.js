import { Box } from '@mui/material';

import { ReactComponent as Logo } from '../assets/CougarCartoon.svg';

function AppBar(){
    return(
        <Box display="flex"
             justifyContent= 'left'
             alignItems= 'center'
             sx={{
                pl: 3,
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                backgroundColor: '#febc01',
                fontSize: 40,
                fontWeight: 'bold',
                height: '6vh'
             }}
        >
            <Box sx={{ pr : 3 }} >
                Cougars
            </Box>

            <Logo style={{ height:'5vh', width: '3%' }} />
        </Box>
    );
}

export default AppBar