import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TypeListItem from '../TypeListItem/TypeListItem';
import { Skeleton, Typography, List, Box } from '@mui/material';
import AddType from '../AddType/AddType';

const TypesBlock = () => {


    const dispatch = useDispatch()
    const areTypesLoading = Boolean(useSelector(state => state.types.status) === 'loaded')
    const types = useSelector(state => state.types.data)

    const typesEl = (types && areTypesLoading
        ? types.map(t => (<TypeListItem {...t} />))
        : [...Array(5)].map(d => (
            <Skeleton variant='rectangular' width='md' height='50px' sx={{ margin: 1 }} />
        ))
    )


    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h4' component='div'>Types</Typography>
                <AddType />
            </Box>
            <List>
                {typesEl}
            </List>
        </Box>
    );
};

export default TypesBlock;