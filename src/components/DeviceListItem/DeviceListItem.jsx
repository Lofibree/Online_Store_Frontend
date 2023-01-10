import React from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDeleteDevice, fetchDevices } from '../../redux/slices/devices';




const DeviceListItem = ({ name, price, img, id }) => {



    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(fetchDeleteDevice(id)).then(() => {
            dispatch(fetchDevices())
        })
    }

    return (
        <ListItem divider>
            <ListItemAvatar sx={{ marginRight: 1 }}>
                <Link to={`/device/${id}`} style={{ textDecoration: 'none' }}>
                    <Avatar src={'http://localhost:5000/' + img} sx={{ width: '50px', height: '50px' }}/>
                </Link>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={'Price: ' + price} primaryTypographyProps={{ fontSize: 20 }} />
            <Box sx={{ display: 'flex' }}>
                <ListItemButton >
                    <EditOutlinedIcon />
                </ListItemButton>
                <ListItemButton onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon />
                </ListItemButton>
            </Box>
        </ListItem >
    );
};

export default DeviceListItem;