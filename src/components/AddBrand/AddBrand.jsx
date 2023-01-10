import { Box, Button, Container, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateBrand } from '../../redux/slices/brands';



const AddBrand = () => {

    const dispatch = useDispatch()

    const [brand, setBrand] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const createBrand = () => setOpen(true)
    const handleBrand = (e) => setBrand(e.target.value)

    const onSubmit = () => {
        const formData = new FormData()
        formData.append('name', brand)
        dispatch(fetchCreateBrand(formData))
        handleClose()
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };
    
    return (
        <div>
            <Button onClick={createBrand}>Add brand</Button>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form">
                    <Typography variant='h4' component='div'>Create new brand</Typography>
                    <TextField value={brand} onChange={handleBrand} label='Brand' sx={{ margin: 1 }} size='small' />
                    <Button onClick={onSubmit} color='secondary'>Submit</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AddBrand;