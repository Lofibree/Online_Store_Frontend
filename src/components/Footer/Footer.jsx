import React from 'react';
import { AppBar, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';

const Footer = () => {
    return (
        <Paper
            sx={{
                marginTop: 'calc(10% + 60px)',
                width: '100%',
                bottom: 0,
                // position: 'fixed',
                width: '100%'
            }}
            component="footer"
            square variant="outlined"
        >
            <Container maxWidth='md' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6' sx={{ margin: 1 }}>Online Store</Typography>
            </Container>
        </Paper>
    );
};

export default Footer;