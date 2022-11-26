import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});


instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default instance;