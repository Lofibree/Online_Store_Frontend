import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BrandListItem from '../BrandListItem/BrandListItem';
import { Skeleton, Typography, List, Box } from '@mui/material';
import AddBrand from '../AddBrand/AddBrand';

const BrandsBlock = () => {


    const dispatch = useDispatch()
    const areBrandsLoading = Boolean(useSelector(state => state.brands.status) === 'loaded')
    const brands = useSelector(state => state.brands.data)

    const brandsEl = (brands && areBrandsLoading
        ? brands.map(b => (<BrandListItem {...b} />))
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='md' height='50px' sx={{ margin: 1 }} />
        ))
    )


    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h4' component='div'>Brands</Typography>
                <AddBrand />
            </Box>
            <List>
                {brandsEl}
            </List>
        </Box>
    );
};

export default BrandsBlock;