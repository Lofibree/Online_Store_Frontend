import { Container, Grid, Skeleton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices } from '../../redux/slices/devices';
import Device from '../../components/Device/Device';



const Home = () => {



    const dispatch = useDispatch()

    const areDevicesLoading = Boolean(useSelector(state => state.devices.status) === 'loaded')

    React.useEffect(() => {
        dispatch(fetchDevices())
    }, [])


    const devices = useSelector(state => state.devices.data)
    const devicesEl = (devices && areDevicesLoading
        ? devices.map(d => <Grid item ><Device {...d}/></Grid>)
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='250px' height='420px' sx={{ margin: 4 }} />
        ))
    )



    return (
        <Container maxWidth='lg'>
            <Grid container rowSpacing={1} sx={{marginTop: 5}}>
                {devicesEl}
            </Grid>
        </Container>
    );
};

export default Home;