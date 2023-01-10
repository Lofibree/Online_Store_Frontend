import { Container, Paper, TextField, Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redux/slices/auth';
import { selectIsAuth } from '../../redux/slices/auth';


const Login = () => {

   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)


    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const onSubmit = () => {
        if (email && password) {
            const formData = {
                email,
                password
            }
            dispatch(fetchLogin(formData)).then((data) => {
                if (!data.payload) return alert('Не удалось авторизоваться')
                if ('token' in data.payload) {
                    debugger
                    window.localStorage.setItem('token', data.payload.token)
                }
            }).then(() => {
                navigate('/')
            })
        }
    }

    return (
        <Container maxWidth='sm' sx={{ marginTop: '100px'}}>
            <Paper elevation={3} variant='outlined' sx={{padding: 2}}>
                <Typography variant='h5' component='div'>Login</Typography>
                <Box>
                    <TextField variant='filled' label='Login' type='email' sx={{margin: 1}} value={email} onChange={handleEmail} />
                    <TextField variant='filled' label='Password' type='password' sx={{margin: 1}} value={password} onChange={handlePassword}/>
                </Box>
                <Button onClick={onSubmit}>Submit</Button>
                <Box>
                    <Link to='/register' style={{textDecoration: 'none'}}>Don't have an account? Register</Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;