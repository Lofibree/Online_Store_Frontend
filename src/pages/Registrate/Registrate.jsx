import { Container, Paper, TextField, Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLogin, fetchRegistrate } from '../../redux/slices/auth';
import { selectIsAuth } from '../../redux/slices/auth';

const Registrate = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(selectIsAuth)

    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleRole = e => setRole(e.target.value)

    useEffect(() => {
        if (isAuth) {
            navigate('/')
        }
    }, [isAuth])

    const onSubmit = () => {
        if (email && password) {
            const formData = {
                email,
                password,
                role
            }
            dispatch(fetchRegistrate(formData)).then((data) => {
                if (!data.payload) return alert('Не удалось зарегистрироваться')
                if ('token' in data.payload) {
                    // debugger
                    window.localStorage.setItem('token', data.payload.token)
                }
            }).then(() => {
                navigate('/')
            })
        }
    }

    return (
        <Container maxWidth='sm' sx={{ marginTop: '100px'}}>
            <Paper elevation={3} variant="outlined" sx={{padding: 2}}>
                <Typography variant='h5' component='div'>Registrate</Typography>
                <Box>
                    <TextField variant='filled' label='Login' sx={{margin: 1}} value={email} onChange={handleEmail} />
                    <TextField variant='filled' label='Password' sx={{margin: 1}} value={password} onChange={handlePassword}/>
                    <TextField variant='filled' label='Role' sx={{margin: 1}} value={role} onChange={handleRole}/>
                </Box>
                <Button onClick={onSubmit}>Submit</Button>
            </Paper>
        </Container>
    );
};

export default Registrate;