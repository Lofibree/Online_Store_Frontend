import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAdmin } from '../../redux/slices/auth';
import { Container, Typography } from '@mui/material';
import { fetchDevices } from '../../redux/slices/devices';
import { fetchBrands } from '../../redux/slices/brands';
import { fetchTypes } from '../../redux/slices/types';
import Paper from '@mui/material/Paper';
import BrandsBlock from '../../components/BrandsBlock/BrandsBlock';
import TypesBlock from '../../components/TypesBlock/TypesBlock ';
import DevicesBlock from '../../components/DevicesBlock/DevicesBlock';


const Admin = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAdmin = useSelector(selectIsAdmin)

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
        }
        dispatch(fetchDevices())
        dispatch(fetchBrands())
        dispatch(fetchTypes())
    }, [isAdmin])


    return (
        <Container maxWidth='md' sx={{ marginTop: 5 }}>
            <Typography variant='h3' component='div'>Admin panel</Typography>
            <Paper elevation={10} variant='outlined' sx={{ marginTop: 5 }}>
                <BrandsBlock/>
                <TypesBlock/>
                <DevicesBlock/>
            </Paper>
        </Container>
    );
};

export default Admin;