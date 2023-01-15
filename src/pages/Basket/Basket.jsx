import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasketDevices } from '../../redux/slices/devices';
import Device from '../../components/Device/Device';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';



const Basket = () => {


    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()

    const areDevicesLoading = Boolean(useSelector(state => state.devices.status) === 'loaded')

    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
        dispatch(fetchBasketDevices())
    }, [isAuth])

    const devices = useSelector(state => state.devices.data)
    const devicesEl = (devices && areDevicesLoading
        ? devices.map(d => <Grid item ><Device {...d}/></Grid>)
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='250px' height='420px' sx={{ margin: 4 }} />
        ))
    )

    return (
        <Container maxWidth='md' sx={{marginTop: 5}}>
            {/* <DevicesBlock/> */}
            <Typography variant='h3'>My basket</Typography>
            <Grid container rowSpacing={1} sx={{marginTop: 2}}>
                {devicesEl}
            </Grid>
        </Container>
    );
};

export default Basket;