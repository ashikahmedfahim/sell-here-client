import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Blog from './Pages/Blog/Blog';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* private routes  */}
        {/* Not found route  */}
        <Route path="*" element={<NotFound/>} />
      </Routes>

    </div>
  );
};

export default App;