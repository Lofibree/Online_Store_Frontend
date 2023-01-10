import React from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box } from '@mui/material';


const MenuPhones = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Button href='https://github.com/Lofibree/Hacker-News' variant='text' startIcon={<GitHubIcon style={{ color: 'black' }} />}>Github</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Button href='https://t.me/lofibree' variant='text' startIcon={<TelegramIcon style={{ color: '#00bfff' }} />}>Telegram</Button>
                </MenuItem>
            </Menu>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, maxWidth: '190px' }}>
                <Button href='https://github.com/Lofibree/Hacker-News' variant='text' sx={{ color: 'white' }} startIcon={<GitHubIcon style={{ color: 'black' }} />}>Github</Button>
                <Button href='https://t.me/lofibree' variant='text' sx={{ color: 'white' }} startIcon={<TelegramIcon style={{ color: '#00bfff' }} />}>Telegram</Button>
            </Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                    display: { md: 'none' }
                }}
            >
                <MenuIcon />
            </IconButton>
        </div>
    );
};

export default MenuPhones;