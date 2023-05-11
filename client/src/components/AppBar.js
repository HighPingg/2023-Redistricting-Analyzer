import { Box } from '@mui/material';

import { ReactComponent as Logo } from '../assets/CougarCartoon.svg';

function AppBar(){
 return(
    <Box
    display="flex"
    justifyContent= 'left'
    alignItems= 'center'
    sx={{
        pl: 3,
        borderRadius: 2,
        backgroundColor: '#aaacad',
        fontSize: 40,
        fontWeight: 'bold',
    }}
    >
            <Box
            sx={{
                pr : 3
            }}
            >
            Cougars
            </Box>

            <Logo
        style={{ height:'3%', width: '3%' }}
        />
</Box>
 );
}

export default AppBar