import React, { useState } from 'react';
import { Box, Button, Container, Grid, IconButton, MenuItem, Modal, TextField, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, fetchCreateDevice, fetchUpdateDevice, fetchOneDevice, fetchDeleteDeviceInfo } from '../../redux/slices/devices';
import { fetchTypes } from '../../redux/slices/types';
import { fetchBrands } from '../../redux/slices/brands';

import { useParams } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from 'react-router-dom';

const EditDevice = () => {


    const navigate = useNavigate()
    const { id } = useParams()
    const typesStore = useSelector(state => state.types.data)
    const brandsStore = useSelector(state => state.brands.data)


    const dispatch = useDispatch()

    const inputFileRef = React.useRef(null)

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [type, setType] = React.useState('');
    const [typeId, setTypeId] = React.useState('');
    const [brand, setBrand] = React.useState('');
    const [brandId, setBrandId] = React.useState('');
    const [img, setImg] = React.useState('');
    const [imgLink, setImgLink] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const [info, setInfo] = React.useState([]);




    React.useEffect(() => {
        dispatch(fetchOneDevice(id)).then((data) => {
            setName(data.payload.name)
            setPrice(data.payload.price)
            setImgLink(data.payload.img)
            setRating(data.payload.rating)
            setInfo(data.payload.info)
            setTypeId(data.payload.typeId)
            setBrandId(data.payload.brandId)
            return { typeId: data.payload.typeId, brandId: data.payload.brandId }
        }).then((result) => {
            dispatch(fetchTypes()).then((data) => {
                const typeName = [...data.payload].find(t => t.id === result.typeId).name
                setType(typeName)
            })
            dispatch(fetchBrands()).then((data) => {
                const brandName = [...data.payload].find(t => t.id === result.brandId).name
                setBrand(brandName)
            })
        })
    }, [])


    const goBack = () => navigate('/admin')

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

    const addInfo = () => setInfo([...info, { title: '', description: '', number: Date.now() }])
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => (i.number || i.id) === number ? { ...i, [key]: value } : i))
    }
    const removeInfo = (number) => {
        if (number.toString().length === 2) {
            return dispatch(fetchDeleteDeviceInfo(number)).then((data) => {
                if (data.payload) {
                    const infoChanged = info.filter(i => (i.number || i.id) !== number)
                    setInfo(infoChanged)
                }
            })
        } else if (number.toString().length !== 2) {
            const infoChanged = info.filter(i => (i.number || i.id) !== number)
            setInfo(infoChanged)
        }
    }

    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        if (file.size < 1024 * 1024) {
            setImg(file)
            console.log(file)
        }
    }

    const onSubmit = () => {
        if (!name || !price || !typeId || !brandId || !img || !id) {
            alert('Заполните все поля')
        } else {
            const formData = {
                name,
                price,
                typeId,
                brandId,
                img,
                info,
                id
            }
            dispatch(fetchUpdateDevice(formData)).then(() => navigate(`/device/${id}`))
        }
    }



    return (
        <Container maxWidth='md' sx={{ marginTop: 5 }}>
            <Typography variant='h4' component='div'>Update device</Typography>
            <Box sx={{ display: 'flex', marginBottom: 2 }}>
                <IconButton onClick={goBack} >
                    <ArrowBackOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <img src={('http://localhost:5000/' + imgLink)} style={{ maxWidth: '200px', borderRadius: '20px', marginRight: '10px' }} />
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderRadius: 2, padding: 2 }}>
                        <Typography variant='span' sx={{ marginRight: 2, display: 'flex', alignItems: 'center' }}>
                            <StarBorderIcon />
                            {rating}
                        </Typography>
                        <Box>
                            <TextField value={name} onChange={handleName} label='Name' sx={{ margin: 1 }} size='small' />
                            <TextField value={price} onChange={handlePrice} type='number' sx={{ margin: 1 }} label='Price' size='small' />
                        </Box>
                    </Box>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label='Type'
                        sx={{ minWidth: 100, margin: 1 }}
                        size='small'
                        value={type}
                        onChange={handleType}
                    >
                        {typesStore.map((option) => (
                            <MenuItem value={option.name} key={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label='Brand'
                        sx={{ minWidth: 100, margin: 1 }}
                        size='small'
                        value={brand}
                        onChange={handleBrand}
                    >
                        {brandsStore.map((option) => (
                            <MenuItem value={option.name} key={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box>
                        <Button onClick={() => inputFileRef.current.click()}>Выбрать фото с ПК</Button>
                        <input type="file" onChange={handleChangeFile} ref={inputFileRef} hidden />
                    </Box>
                </Box>
            </Box>
            <Container maxWidth='xs' sx={{ marginTop: 5 }}>
                <Typography variant='h4'>Сharacteristics</Typography>
                <Button onClick={addInfo}>Add info</Button>
                <List>
                    {info
                        ? info.map((info) => (
                            <ListItem divider>
                                <Box>
                                    <TextField size='small' sx={{ margin: 0.5 }} label='Название свойства' value={info.title} onChange={(e) => changeInfo('title', e.target.value, info.number || info.id)} />
                                    <TextField size='small' sx={{ margin: 0.5 }} label='Значение свойства' value={info.description} onChange={(e) => changeInfo('description', e.target.value, info.number || info.id)} />
                                </Box>
                                <Button onClick={() => removeInfo(info.number || info.id)}>Remove info</Button>
                            </ListItem>
                        ))
                        : [...Array(5)].map((info) => (
                            <ListItem divider>
                                <ListItemText primary={'text'} />
                            </ListItem>
                        ))}
                </List>
            </Container>
            <Button onClick={onSubmit} color='secondary'>Submit</Button>
        </Container>
    );
};

export default EditDevice;