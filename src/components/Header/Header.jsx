import { AppBar, Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import MenuPhones from '../Menu/MenuPhones';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout, selectIsAuth } from '../../redux/slices/auth';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { selectIsAdmin } from '../../redux/slices/auth';


const Header = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const isAdmin = useSelector(selectIsAdmin)
    const navigate = useNavigate()

    const handleLogout = () => {
        if (window.confirm('Вы точно хотите выйти?')) {
            dispatch(fetchLogout()).then(() => window.localStorage.removeItem('token'))
        }
    }

    return (
        <AppBar position='static' sx={{ padding: 0.5 }}>
            <Container maxWidth='md' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link to='/' style={{ margin: 1, color: 'white', textDecoration: 'none' }}>Online Store</Link>
                {isAuth
                    ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {isAdmin
                            ? <Link to='/admin' style={{ margin: 1, color: 'white', textDecoration: 'none' }}>Admin panel</Link>
                            : ''
                        }
                        <Avatar
                            src='https://sun9-11.userapi.com/impg/XVBKYk4GOjcZIa48mPAAK-MMevFP9u8MvTC6rQ/Ggu4IENVeWY.jpg?size=1045x965&quality=96&sign=c12e33dcb23c7c82c41d46f4be0d602e&type=album'
                            sx={{ margin: '0px 20px' }}
                        />
                        <Link to='/basket' style={{ margin: 1, color: 'yellow', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <ShoppingBasketIcon />
                        </Link>
                        <MenuPhones />
                        <IconButton onClick={handleLogout} sx={{color: 'brown'}}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Box>
                    : <Box>
                        <Link to='/login' style={{ margin: 5, color: 'black', textDecoration: 'none' }}>Login</Link>
                        <Link to='/register' style={{ margin: 5, color: 'black', textDecoration: 'none' }}>Register</Link>
                    </Box>
                }
            </Container>
        </AppBar>
    );
};

export default Header;