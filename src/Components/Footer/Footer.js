import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

const Footer = () => {
    return (
        <Box
            sx={{
                borderTop: "3px solid #e0e0e0",
                backgroundColor: "#75757515",
                padding: "50px 0",
                textAlign: "center"
            }}
        >
            <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item>
                    <Typography variant='h5'>
                        <strong>Sign up for our newsletter</strong>
                    </Typography>
                </Grid>
                <Grid justifyContent='center' alignItems='center'>
                    <Grid container justifyContent='center' style={{ margin: "30px auto" }}>
                        <Grid item xs={12} md={6} sx={{ marginTop: "15px" }}>
                            <TextField
                                variant='outlined'
                                type="text"
                                id="form5Example2"
                                className="form-control"
                                placeholder='Enter your email'
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant='contained' sx={{ padding: "15px 30px", marginTop: "15px" }}>
                                Subscribe
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box>
                all rights reserved by &copy; Sell-here.com
            </Box>
        </Box >
    );
};

export default Footer;