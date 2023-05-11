import Box from '@mui/material/Box';

function UnselectedGraph(){
    return (
        <Box
				display="flex"
				justifyContent= 'center'
				alignItems= 'center'
				sx={{
					pt: 2,
					height: '40%',
					width: '100%',
					borderRadius: 2,
					backgroundColor: '#aaacad',
					fontSize: 50,
					fontWeight: 'bold'
				}}
        >
						<Box
						>
						Select Graph Type to Display
						</Box>
        </Box>
      );
}

export default UnselectedGraph