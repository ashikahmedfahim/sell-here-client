import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

const SellerProductCard = ({ product, handleAdvertise, handleDelete }) => {

    return (
        <Grid item xs={12} md={4}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <img src={product.imageUrl} alt='' width='100%' />
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography color="text.secondary">
                        Resale Price: {product.resalePrice}
                    </Typography>
                    <Typography color="text.secondary">
                        Original Price: {product.originalPrice}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{
                            fontSize: 14,
                        }}
                    >
                        Posted on
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            mb: 1.5,
                        }}
                    >
                        {new Date(product.createdAt).toLocaleTimeString()}.
                        {new Date(product.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography
                        color={product.isSold ? "red" : "green"}
                    >
                        {product.isSold ? "Sold" : "Available"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(product._id)}
                    >
                        Delete
                    </Button>
                    {
                        !product.isSold && !product.isAdvertised &&
                        <Button
                            size="small"
                            variant="contained"
                            color='success'
                            onClick={() => handleAdvertise(product._id)}
                        >
                            Advertise
                        </Button>

                    }
                </CardActions>
            </Card>
        </Grid>
    );
};

export default SellerProductCard;