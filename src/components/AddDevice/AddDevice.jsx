import React, { useState } from 'react';
import { Box, Button, Container, Grid, IconButton, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, fetchCreateDevice } from '../../redux/slices/devices';
import { fetchTypes } from '../../redux/slices/types';
import { fetchBrands } from '../../redux/slices/brands';
import AddType from '../AddType/AddType';
import AddBrand from '../AddBrand/AddBrand';





const AddDevice = () => {


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
    const [type, setType] = React.useState('');
    const [typeId, setTypeId] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [brandId, setBrandId] = React.useState('');
    const [img, setImg] = React.useState('');
    const [info, setInfo] = useState([])


    const openModal = () => setOpen(true)
    const handleName = (e) => setName(e.target.value)
    const handlePrice = (e) => setPrice(e.target.value)
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

    const addInfo = () => setInfo([...info, { title: '', description: '', number: Date.now() }])
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
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
        formData.append('typeId', typeId)
        formData.append('brandId', brandId)
        formData.append('img', img)
        formData.append('info', JSON.stringify(info))
        dispatch(fetchCreateDevice(formData)).then(data => handleClose())
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
        <>
            <Box sx={{ margin: 2 }}>
                <Button variant='outlined' color='secondary' onClick={openModal}>Add device</Button>
            </Box>
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form">
                    <Typography variant='h4' component='div'>Create new device</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderRadius: '10px', padding: 1, margin: 0.5 }}>
                        <TextField value={name} onChange={handleName} label='Name' sx={{ margin: 1 }} size='small' />
                        <TextField value={price} onChange={handlePrice} type='number' label='Price' size='small' />
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
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderRadius: '10px', padding: 1 }}>
                        <Button onClick={addInfo}>Add info</Button>
                        {info.map((info) => (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box>
                                    <TextField size='small' sx={{ margin: 0.5 }} label='Название свойства' value={info.title} onChange={(e) => changeInfo('title', e.target.value, info.number)} />
                                    <TextField size='small' sx={{ margin: 0.5 }} label='Значение свойства' value={info.description} onChange={(e) => changeInfo('description', e.target.value, info.number)} />
                                </Box>
                                <Button onClick={() => removeInfo(info.number)}>Remove info</Button>
                            </Box>
                        ))}
                    </Box>
                    <Button onClick={onSubmit} color='secondary'>Submit</Button>
                </Box>
            </Modal>
        </>
    );
};

export default AddDevice;