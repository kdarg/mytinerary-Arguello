import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { UilChatBubbleUser } from '@iconscout/react-unicons';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';


const pages = [{name: 'Home', url: '/'}, { name: 'Cities', url: '/cities'}];
const settings = [{name: 'Sign up', url: 'signup'}, { name: 'Log in', url: 'login'}];

const Navbar = (props) => {

  // console.log(props.user)
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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


  function handleCloseLogOut(){
    props.LogOutUser(props.user.userEmail)
  }

  return (
    <AppBar position="static" style={{ background: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (

                <Link to={page.url} className="text-my-nav" key={page.name}>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem> 
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {pages.map((page) => (
                    <Link to={page.url} className="text-my-nav" key={page.name} >
              <Button className='text-my-nav'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}>
                {page.name}
              </Button>
              </Link>
            ))}
          </Box>
          


          <Box sx={{ flexGrow: 0 }}>


              {props.user ? 
        

              <>

              <Tooltip title="User" arrow placement="left">

              <IconButton  onClick={handleOpenUserMenu} sx={{ p: 2 }}>
              <img src={props.user.urlimage }  className='avatarusersize' />  
              </IconButton>
              
              </Tooltip>
            
            
              <img className="image_logo" src={process.env.PUBLIC_URL+"/assets/imgs/newlogo.png"}  alt='MyTinerary-logo' />
              
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


            <MenuItem  onClick={handleCloseUserMenu}>
            <p className='logoutmargin' onClick={handleCloseLogOut}>Log out</p>
            </MenuItem>

            </Menu>



              </>
            
            : <>
                <Tooltip title="User" arrow placement="left">
              <IconButton  onClick={handleOpenUserMenu} sx={{ p: 2 }}>
              <Avatar  sx={{ width: 50, height: 50}} > <UilChatBubbleUser>  </UilChatBubbleUser> </Avatar> 
                
              </IconButton>
            </Tooltip>

            <img className="image_logo" src={process.env.PUBLIC_URL+"/assets/imgs/newlogo.png"}  alt='MyTinerary-logo' />

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

                <Link to={setting.url} className="text-my-nav" key={setting.name}>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>

                </Link>

              ))}


            </Menu>
            </>
            
            }


          </Box>





        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state) => {

  return{
    user: state.userReducer.user,
  }

}

const mapDispatchToProps = {
  LogOutUser: userActions.LogOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
