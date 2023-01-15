import { Box, Container, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneDevice } from '../../redux/slices/devices';
import styles from './FullDevice.module.css'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const FullDevice = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const device = useSelector(state => state.devices.data)

    useEffect(() => {
        dispatch(fetchOneDevice(id))
    }, [])

    const goBack = () => navigate(-1)

    return (
        <Container maxWidth='md' sx={{ marginTop: 5 }} className={styles.full}>
            {device
                ? <>
                    <Box sx={{ display: 'flex', marginBottom: 2 }}>
                        <IconButton onClick={goBack} >
                            <ArrowBackOutlinedIcon sx={{ fontSize: '30px', color: 'black' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <img src={'http://localhost:5000/' + device[0].img} className={styles.img} />
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderRadius: 2, padding: 2 }}>
                            <Typography variant='span' sx={{ marginRight: 2, display: 'flex', alignItems: 'center' }}>
                                <StarBorderIcon />
                                {device[0].rating}
                            </Typography>
                            <Box>
                                <Typography variant='h4'>{device[0].name}</Typography>
                                <Typography variant='h6' sx={{ color: 'grey' }}>{device[0].price}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Container maxWidth='sm' sx={{ marginTop: 5 }}>
                        <Typography variant='h4'>Сharacteristics</Typography>
                        {device && device[0].info
                            ? device[0].info.map(info => (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey', marginBottom: 2 }}>
                                    <Typography component='div' sx={{ color: 'grey' }}>{info.title}</Typography>
                                    <Typography component='div' sx={{ color: 'black' }}>{info.description}</Typography>
                                </Box>
                            ))
                            : <List>
                                {[...Array(5)].map((info) => (
                                    <ListItem divider>
                                        <ListItemText primary={'text'} />
                                    </ListItem>
                                ))}
                            </List>
                        }
                    </Container>
                </>
                : ''
            }
        </Container>
    );
};

export default FullDevice;