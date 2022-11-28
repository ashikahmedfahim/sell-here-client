import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { AuthContext } from '../../Contexts/AuthPovider/AuthPovider';

const drawerWidth = 240;
const navItems = ['Login'];
const settings = ['Logout'];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const { user, setUser, logout, accountType } = useContext(AuthContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const goToUrl = (url) => {
        navigate(url.toLowerCase());
    }

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    const handleLogout = () => {
        logout()
            .then((result) => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .catch((error) => { });
        setAnchorElUser(null);
    }


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }} onClick={() => goToUrl('/')}>
                Sell-here.com
            </Typography>
            <Divider />
            <List>
                {
                    user ?
                        <>
                            {
                                accountType === 'admin' &&
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='Blogs' onClick={() => goToUrl('blogs')} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='Dashboard' onClick={() => goToUrl('dashboard')} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            }
                            {
                                accountType === 'buyer' &&
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='Blogs' onClick={() => goToUrl('blogs')} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='My Orders' onClick={() => goToUrl('my-orders')} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            }
                            {
                                accountType === 'seller' &&
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='Blogs' onClick={() => goToUrl('blogs')} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='Add Product' onClick={() => goToUrl('add-product')} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <ListItemText primary='My Products' onClick={() => goToUrl('my-products')} />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            }
                        </>
                        :
                        navItems.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={item} onClick={() => goToUrl(item)} />
                                </ListItemButton>
                            </ListItem>

                        ))
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <Box sx={{ display: 'flex' }}>
            <AppBar
                component="nav"
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to='/' className='router-link'> Sell-here.com</Link>
                    </Typography>
                    {
                        user ?
                            <>
                                <Box sx={{
                                    marginRight: "20px"
                                }}>
                                    {
                                        accountType === 'admin' &&
                                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                            <Link to='/blogs' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    Blogs
                                                </Button>
                                            </Link>
                                            <Link to='/dashboard' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        </Box>
                                    }
                                    {
                                        accountType === 'seller' &&
                                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                            <Link to='/blogs' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    Blogs
                                                </Button>
                                            </Link>
                                            <Link to='/add-product' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    Add Product
                                                </Button>
                                            </Link>
                                            <Link to='/my-products' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    My Products
                                                </Button>
                                            </Link>
                                        </Box>
                                    }
                                    {
                                        accountType === 'buyer' &&
                                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                            <Link to='/blogs' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    Blogs
                                                </Button>
                                            </Link>
                                            <Link to='/my-orders' className='router-link'>
                                                <Button sx={{ color: '#fff' }}>
                                                    My Orders
                                                </Button>
                                            </Link>
                                        </Box>
                                    }
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title={user?.displayName}>
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}>
                                            <Avatar alt="" src={user?.photoURL} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleLogout}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </>
                            :
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {navItems.map((item) => (
                                    <Link key={item} to={item.toLowerCase()} className='router-link'>
                                        <Button sx={{ color: '#fff' }}>
                                            {item}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>
                    }
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main">
                <Toolbar />
            </Box>
        </Box>
    );
}


export default Navbar;