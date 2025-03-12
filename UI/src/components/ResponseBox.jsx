import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ResponseBox = ({ children }) => {

    return (
        <Box component="section" sx={{
            width: 700,
            height: 300,
            borderRadius: 1,
            bgcolor: 'grey.200', // 밝은 회색
            '&:hover': {
                bgcolor: 'grey.300', // 조금 더 어두운 회색
            },
            m: 2
        }}>
            <Typography variant="body1" color="text.primary">
                {children}
            </Typography>
        </Box>
    )
};

export default ResponseBox;