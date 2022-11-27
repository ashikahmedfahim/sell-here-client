import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../AxiosConfig';
import { UtilityContext } from '../../Contexts/UtilityPovider/UtilityPovider';

const conditions = ["Excellent", "Good", "Fair"];

const AddProduct = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        location: '',
        originalPrice: '',
        resalePrice: '',
        yearsOfUse: '',
        yearOfPurchase: '',
        category: '',
        condition: '',
        description: '',
        mobile: '',
    });
    const [categories, setCategories] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [image, setImage] = useState(null);
    const [apiError, setApiError] = useState('');
    const { setMessage, setMessageType } = useContext(UtilityContext);
    const navigate = useNavigate();

    const getCategories = async () => {
        try {
            const response = await axios.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const oldValues = { ...formValues };
        oldValues[event.target.name] = event.target.value;
        oldValues[event.target.name] = event.target.value;
        setFormValues({ ...oldValues });
    };

    const onSelectFile = e => {
        setImage(e.target.files[0]);
    }

    const handleFormSubmit = async () => {
        try {
            setApiError("");
            const formData = new FormData();
            formData.append('name', formValues.name);
            formData.append('location', formValues.location);
            formData.append('originalPrice', formValues.originalPrice);
            formData.append('resalePrice', formValues.resalePrice);
            formData.append('yearsOfUse', formValues.yearsOfUse);
            formData.append('yearOfPurchase', formValues.yearOfPurchase);
            formData.append('category', formValues.category);
            formData.append('condition', formValues.condition);
            formData.append('description', formValues.description);
            formData.append('mobile', formValues.mobile);
            formData.append('image', image);
            const url = `/products`;
            const response = await axios.post(url, formData);
            if (response.data.insertedId) {
                setMessage('Product added successfully');
                setMessageType('success');
                navigate('/my-products');
            } else {
                setMessage('Product not added');
                setMessageType('error');
            }
        } catch (error) {
            setApiError(error?.message);
            setMessage('Product not added');
            setMessageType('error');
        }
    }

    useEffect(() => {
        if (formValues.name &&
            formValues.location &&
            formValues.originalPrice &&
            formValues.resalePrice &&
            formValues.yearsOfUse &&
            formValues.yearOfPurchase &&
            formValues.category &&
            formValues.condition &&
            formValues.description &&
            formValues.mobile &&
            image
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [formValues, image]);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
                margin: "50px 0"
            }}
        >
            <Grid item xs={12} md={6}>
                <Card
                    sx={{
                        padding: "50px 20px",
                    }}>
                    <Typography
                        variant='h4'
                        sx={{
                            marginBottom: "25px",
                            textAlign: "center"
                        }}
                    >
                        Add Product
                    </Typography>
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Name"
                        placeholder="Enter product name"
                        variant="outlined"
                        type='text'
                        name='name'
                        value={formValues.name}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Mobile"
                        placeholder="Enter your mobile number"
                        variant="outlined"
                        type='text'
                        name='mobile'
                        value={formValues.mobile}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Location"
                        placeholder="Enter your location"
                        variant="outlined"
                        type='text'
                        name='location'
                        value={formValues.location}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Description"
                        placeholder="Enter product description"
                        variant="outlined"
                        type='text'
                        name='description'
                        value={formValues.description}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <TextField
                            sx={{
                                margin: "10px 0",
                            }}
                            id="outlined-basic"
                            label="Original Price"
                            placeholder="Enter original price"
                            variant="outlined"
                            type='number'
                            name='originalPrice'
                            value={formValues.originalPrice}
                            onChange={(event) => handleChange(event)}
                        />
                        <TextField
                            sx={{
                                margin: "10px 0",
                            }}
                            id="outlined-basic"
                            label="Resale Price"
                            placeholder="Enter resale price"
                            variant="outlined"
                            type='number'
                            name='resalePrice'
                            value={formValues.resalePrice}
                            onChange={(event) => handleChange(event)}
                        />
                    </Box>
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Years of Use"
                        placeholder="Enter years of use"
                        variant="outlined"
                        type='number'
                        name='yearsOfUse'
                        value={formValues.yearsOfUse}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Years of Purchase"
                        placeholder="Enter years of purchase"
                        variant="outlined"
                        type='number'
                        name='yearOfPurchase'
                        value={formValues.yearOfPurchase}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <FormControl
                        sx={{
                            margin: "10px 0",
                        }}
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">Select Condition</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.condition}
                            label="Select Condition"
                            name='condition'
                            onChange={(event) => handleChange(event)}
                        >
                            {
                                conditions.map((condition) => (
                                    <MenuItem key={condition} value={condition}>{condition}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl
                        sx={{
                            margin: "10px 0",
                        }}
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formValues.category}
                            label="Select Category"
                            name='category'
                            onChange={(event) => handleChange(event)}
                        >
                            {
                                categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        type='file'
                        variant="outlined"
                        name='img'
                        onChange={(event) => onSelectFile(event)}
                        fullWidth
                    />
                    <Button
                        variant='contained'
                        sx={{
                            margin: "10px 2px",
                            textAlign: 'left'
                        }}
                        disabled={isDisabled}
                        onClick={handleFormSubmit}
                    >
                        Save Product
                    </Button>
                    {
                        apiError && <Typography
                            sx={{
                                margin: "10px 0",
                                textAlign: 'center',
                                color: 'red'
                            }}
                        >
                            {apiError}
                        </Typography>
                    }
                </Card>
            </Grid>
        </Grid>
    );
};

export default AddProduct;