import { Box, Card, CardContent, CardActions, CardMedia, Container, IconButton } from '@mui/material';
import React from 'react';
import styles from './Device.module.css'
import { Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate, useParams } from 'react-router-dom';



const Device = ({ name, price, id, typeId, brandId, img }) => {


    const navigate = useNavigate()


    return (
        <Container maxWidth='xs'>
            <Card className={styles.card} onClick={() => navigate(`/device/${id}`)}>
                <CardMedia
                    sx={{ height: 300 }}
                    image={'http://localhost:5000/' + img}
                    // "https://sun9-11.userapi.com/impg/XVBKYk4GOjcZIa48mPAAK-MMevFP9u8MvTC6rQ/Ggu4IENVeWY.jpg?size=1045x965&quality=96&sign=c12e33dcb23c7c82c41d46f4be0d602e&type=album"
                    title={name ? name : 'title'}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h5' component='div'>{name ? name : 'no name'}</Typography>
                        <Typography variant='h6' component='div'>{price ? price : 'no price'}</Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};

export default Device;