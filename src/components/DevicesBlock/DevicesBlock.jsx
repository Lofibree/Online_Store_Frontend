import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeviceListItem from '../DeviceListItem/DeviceListItem'
import { Skeleton, Typography, List, Box } from '@mui/material';

const DevicesBlock = ({children}) => {


    const dispatch = useDispatch()
    const areDevicesLoading = Boolean(useSelector(state => state.devices.status) === 'loaded')
    const devices = useSelector(state => state.devices.data)

    const devicesEl = (devices && areDevicesLoading
        ? devices.map(d => (<DeviceListItem {...d} />))
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='md' height='50px' sx={{ margin: 1 }} />
        ))
    )


    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h4' component='div'>Devices</Typography>
                {children}
            </Box>
            <List>
                {devicesEl}
            </List>
        </Box>
    );
};

export default DevicesBlock;