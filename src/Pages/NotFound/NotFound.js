import { Grid, Typography } from '@mui/material';
import React from 'react';
import NotFoundImage from '../../Images/not_found.svg';
import './NotFound.css';

const NotFound = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "80vh"
            }}
        >
            <Grid item sm={12} md={6}>
                <img className='not-found-img' src={NotFoundImage} alt='' />
                <Typography
                    variant="h2"
                    sx={{ margin: "50px 0", textAlign: "center" }}
                >
                    Page Not Found
                </Typography>
            </Grid>
        </Grid>
    );
};

export default NotFound;