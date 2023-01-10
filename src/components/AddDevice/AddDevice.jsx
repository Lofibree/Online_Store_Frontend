import React, { useState } from 'react';
import { Box, Button, Container, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, fetchCreateDevice } from '../../redux/slices/devices';
import { useEffect } from 'react';
import { fetchTypes } from '../../redux/slices/types';
import { fetchBrands } from '../../redux/slices/brands';
import AddType from '../AddType/AddType';
import AddBrand from '../AddBrand/AddBrand';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import CurrencyRubleOutlinedIcon from '@mui/icons-material/CurrencyRubleOutlined';

const AddDevice = () => {


    // const [types, setTypes] = useState([{ name: 'Smartphone', id: 1 }, { name: 'TV', id: 2 }])
    // const [brands, setBrands] = useState([{ name: 'Nokia', id: 1 }, { name: 'iPhone', id: 2 }])

    const typesStore = useSelector(state => state.types.data)
    const brandsStore = useSelector(state => state.brands.data)

    React.useEffect(() => {
        dispatch(fetchTypes())
        dispatch(fetchBrands())
    }, [])

    const dispatch = useDispatch()

    const inputFileRef = React.useRef(null)

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    // const [currency, setCurrency] = React.useState('');
    const [type, setType] = React.useState('');
    const [typeId, setTypeId] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [brandId, setBrandId] = React.useState('');
    const [img, setImg] = React.useState('');


    const createDevice = () => setOpen(true)
    const handleName = (e) => setName(e.target.value)
    const handlePrice = (e) => setPrice(e.target.value)
    // const handlePriceCurrency = (e) => setCurrency(e.target.value)
    const handleType = (e) => {
        setType(e.target.value)
        const type = typesStore.find(t => t.name === e.target.value)
        setTypeId(type.id)
    }
    const handleBrand = (e) => {
        setBrand(e.target.value)
        const brand = brandsStore.find(b => b.name === e.target.value)
        setBrandId(brand.id)
    }
    const handleClose = () => setOpen(false);


    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        if (file.size < 1024 * 1024) {
            setImg(file)
            console.log(file)
        }
    }

    const onSubmit = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        // formData.append('priceCurrency', currency)
        formData.append('typeId', typeId)
        formData.append('brandId', brandId)
        formData.append('img', img)
        dispatch(fetchCreateDevice(formData))
        handleClose()
    }

    // const currencies = []

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
        <>
            <Box sx={{ margin: 2 }}>
                <Button variant='outlined' color='secondary' onClick={createDevice}>Add device</Button>
            </Box>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form">
                    <Typography variant='h4' component='div'>Create new device</Typography>
                    <TextField value={name} onChange={handleName} label='Name' sx={{ margin: 1 }} size='small' />
                    <Box>
                        <TextField value={price} onChange={handlePrice} label='Price' size='small' />
                        {/* <TextField
                            value={currency}
                            onChange={handlePriceCurrency}
                            select
                            size='small'
                            id="outlined-select-currency"
                        >
                            <MenuItem
                                // value='$'
                                value='dollar'
                            >
                                <AttachMoneyOutlinedIcon sx={{fontSize: '22px'}} />
                            </MenuItem>
                            <MenuItem
                                // value='€'
                                value='euro'
                            >
                                <EuroOutlinedIcon sx={{fontSize: '22px'}}/>
                            </MenuItem>
                            <MenuItem
                                // value='₽'
                                value='ruble'
                            >
                                <CurrencyRubleOutlinedIcon sx={{fontSize: '22px'}}/>
                            </MenuItem>
                        </TextField> */}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label='Type'
                            sx={{ minWidth: 100, margin: 1 }}
                            size='small'
                            value={type}
                            onChange={handleType}
                        >
                            {typesStore
                                .map((option) => (
                                    <MenuItem value={option.name} key={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <AddType />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label='Brand'
                            sx={{ minWidth: 100, margin: 1 }}
                            size='small'
                            value={brand}
                            onChange={handleBrand}
                        >
                            {brandsStore
                                .map((option) => (
                                    <MenuItem value={option.name} key={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <AddBrand />
                    </Box>
                    <Box>
                        <Button onClick={() => inputFileRef.current.click()}>Выбрать фото с ПК</Button>
                        <input type="file" onChange={handleChangeFile} ref={inputFileRef} hidden />
                    </Box>
                    <Button onClick={onSubmit} color='secondary'>Submit</Button>
                </Box>
            </Modal>
        </>
    );
};

export default AddDevice;