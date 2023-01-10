import React from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch } from 'react-redux';
import { fetchBrands, fetchDeleteBrand, fetchUpdateBrand } from '../../redux/slices/brands';
import styles from './BrandListItem.module.css'
import { useState } from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';



const BrandListItem = ({ name, price, img, id }) => {


    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(name)

    const handleDelete = () => {
        dispatch(fetchDeleteBrand(id)).then(() => {
            dispatch(fetchBrands())
        })
    }

    const handleEdit = () => setIsEdit(true)
    const handleChange = (e) => setValue(e.target.value)

    const onSubmit = () => {
        try {
            setIsEdit(false)
            const formData = {
                name: value,
                id
            }
            dispatch(fetchUpdateBrand(formData)).then(() => {
                dispatch(fetchBrands())
            })
        } catch (err) {
            console.log(err)
            alert('Не удалось изменить бренд')
        }
    }


    return (
        <ListItem divider>
            <ListItemText primary={name} primaryTypographyProps={{ fontSize: 20 }} />
            <Box sx={{ display: 'flex' }}>
                {isEdit
                    ?
                    <>
                        <TextField value={value} onChange={handleChange} size='small' />
                        <ListItemButton onClick={onSubmit}>
                            <DoneRoundedIcon />
                        </ListItemButton>
                    </>
                    : <ListItemButton onClick={handleEdit}>
                        <EditOutlinedIcon />
                    </ListItemButton>
                }
                <ListItemButton onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon />
                </ListItemButton>
            </Box>
        </ListItem >
    );
};

export default BrandListItem;