import { Box, Button, Container, Grid, MenuItem, Modal, Skeleton, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, fetchCreateDevice } from '../../redux/slices/devices';
import Device from '../../components/Device/Device';
// import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import AddDevice from '../../components/AddDevice/AddDevice';
import { selectIsAdmin } from '../../redux/slices/auth';



const Home = () => {



    const dispatch = useDispatch()
    // const isAuth = useSelector(selectIsAuth)
    const isAdmin = useSelector(selectIsAdmin)

    const areDevicesLoading = Boolean(useSelector(state => state.devices.status) === 'loaded')
    // console.log(areDevicesLoading)

    React.useEffect(() => {
        dispatch(fetchDevices())
    }, [])


    const devices = useSelector(state => state.devices.data)
    const devicesEl = (devices && areDevicesLoading
        ? devices.map(d => <Grid item ><Device {...d}/></Grid>)
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='250px' height='420px' sx={{ margin: 1 }} />
        ))
    )



    return (
        <Container maxWidth='lg'>
            {isAdmin
                ? <AddDevice />
                : ''
            }
            <Grid container rowSpacing={1}>
                {devicesEl}
            </Grid>
        </Container>
    );
};

export default Home;