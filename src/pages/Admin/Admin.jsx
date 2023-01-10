import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAdmin } from '../../redux/slices/auth';
import { Box, Container, List, Skeleton, Typography } from '@mui/material';
import DeviceListItem from '../../components/DeviceListItem/DeviceListItem';
import { fetchDevices } from '../../redux/slices/devices';
import { fetchBrands } from '../../redux/slices/brands';
import { fetchTypes } from '../../redux/slices/types';
import BrandListItem from '../../components/BrandListItem/BrandListItem';
import TypeListItem from '../../components/TypeListItem/TypeListItem';
import Paper from '@mui/material/Paper';


const Admin = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAdmin = useSelector(selectIsAdmin)
    const areDevicesLoading = Boolean(useSelector(state => state.devices.status) === 'loaded')
    const areBrandsLoading = Boolean(useSelector(state => state.brands.status) === 'loaded')
    const areTypesLoading = Boolean(useSelector(state => state.types.status) === 'loaded')
    const devices = useSelector(state => state.devices.data)
    const brands = useSelector(state => state.brands.data)
    const types = useSelector(state => state.types.data)

    useEffect(() => {
        if (!isAdmin) {
            navigate('/')
        }
        dispatch(fetchDevices())
        dispatch(fetchBrands())
        dispatch(fetchTypes())
    }, [isAdmin])

    const devicesEl = (devices && areDevicesLoading
        ? devices.map(d => (<DeviceListItem {...d} />))
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='md' height='50px' sx={{ margin: 1 }} />
        ))
    )

    const brandsEl = (brands && areBrandsLoading
        ? brands.map(b => (<BrandListItem {...b} />))
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='md' height='50px' sx={{ margin: 1 }} />
        ))
    )

    const typesEl = (types && areTypesLoading
        ? types.map(t => (<TypeListItem {...t} />))
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='md' height='50px' sx={{ margin: 1 }} />
        ))
    )

    return (
        <Container maxWidth='md' sx={{ marginTop: 5 }}>
            <Typography variant='h3' component='div'>Admin panel</Typography>
            <Paper elevation={10} variant='outlined' sx={{ marginTop: 5 }}>
                <Box>
                    <Typography variant='h4' component='div'>Brands</Typography>
                    <List>
                        {brandsEl}
                    </List>
                </Box>
                <Box>
                    <Typography variant='h4' component='div'>Types</Typography>
                    <List>
                        {typesEl}
                    </List>
                </Box>
                <Box>
                    <Typography variant='h4' component='div'>Devices</Typography>
                    <List>
                        {devicesEl}
                    </List>
                </Box>
            </Paper>
        </Container>
    );
};

export default Admin;