import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../AxiosConfig';
import { AuthContext } from '../../Contexts/AuthPovider/AuthPovider';

const Register = () => {
    const { emailRegistration, updateUser, setUser, setIsLoading, isLoading } = useContext(AuthContext);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'buyer'
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const [image, setImage] = useState(null);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleChange = (event) => {
        const oldValues = { ...formValues };
        oldValues[event.target.name] = event.target.value;
        oldValues[event.target.name] = event.target.value;
        setFormValues({ ...oldValues });
    };

    const onSelectFile = e => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setApiError("");
            const formData = new FormData();
            formData.append('image', image);
            const url = `/upload`;
            const { data: imageUrl } = await axios.post(url, formData);
            emailRegistration(formValues.email, formValues.password)
                .then((result) => {
                    updateUser(formValues.name, imageUrl)
                        .then(async (res) => {
                            const response = await axios.post('/register', {
                                name: formValues.name,
                                email: formValues.email,
                                accountType: formValues.accountType,
                                img: imageUrl
                            });
                            if (response.data.token) {
                                localStorage.setItem('token', response.data.token);
                                setUser(res?.user);
                                navigate('/login');
                            }
                        })
                        .catch((err) => {
                            setApiError(err.message);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        })
                })
                .catch((error) => {
                    setApiError(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } catch (error) {
            setApiError(error?.message);
        }
    }

    useEffect(() => {
        if (formValues.name &&
            formValues.email &&
            formValues.password &&
            formValues.confirmPassword &&
            image
        ) {
            if (formValues.password === formValues.confirmPassword) {
                setIsDisabled(false);
            } else {
                setIsDisabled(true);
            }
        } else {
            setIsDisabled(true);
        }
    }, [
        formValues.name,
        formValues.email,
        formValues.password,
        formValues.confirmPassword,
        formValues.accountType,
        image
    ]);

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
                        padding: "50px 20px"
                    }}>
                    <Typography
                        variant='h4'
                        sx={{
                            marginBottom: "25px",
                            textAlign: "center"
                        }}
                    >
                        Register
                    </Typography>
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Full Name"
                        placeholder="Enter your full name"
                        variant="outlined"
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
                        label="Email"
                        placeholder="Enter your email"
                        variant="outlined"
                        type='email'
                        name='email'
                        value={formValues.email}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Password"
                        placeholder="Enter your password"
                        type='password'
                        variant="outlined"
                        name='password'
                        value={formValues.password}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
                    <TextField
                        sx={{
                            margin: "10px 0",
                        }}
                        id="outlined-basic"
                        label="Confirm Password"
                        placeholder="Enter your password"
                        type='password'
                        variant="outlined"
                        name='confirmPassword'
                        value={formValues.confirmPassword}
                        onChange={(event) => handleChange(event)}
                        fullWidth
                    />
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
                    <FormControl
                        sx={{
                            margin: "10px 0",
                        }}
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="accountType"
                            name='accountType'
                            value={formValues.accountType}
                            onChange={(event) => handleChange(event)}
                        >
                            <MenuItem value='buyer'>Buyer</MenuItem>
                            <MenuItem value='seller'>Seller</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography
                        sx={{
                            margin: "10px 2px",
                            textAlign: 'left'
                        }}
                    >
                        Already registered? <Link to='/login'>Login here</Link>
                    </Typography>
                    <Button
                        variant='contained'
                        sx={{
                            margin: "10px 2px",
                            textAlign: 'left'
                        }}
                        onClick={handleSubmit}
                        disabled={isDisabled}
                    >
                        Register
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

export default Register;