import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import LogoSao from '../assets/satu-andalan-optima.png';

import { Link as RouterLink, useLocation  } from 'react-router-dom'; 



const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  //Cek apakah menu navbar ini sedang aktif (cocok dengan path atau hash saat ini)
  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.hash;
    if (to.startsWith('/#')) return location.pathname === '/' && location.hash === to.slice(1);
    return location.pathname === to;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleWhatsApp = () => {
    const phone = '+6285719033486';
    const text = encodeURIComponent('Halo, saya mau tanya tentang SAO 🙂');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const menuItems = [
    { text: 'Beranda', to: '/' },
    { text: 'Fitur',   to: '/#features' },
    { text: 'FAQ',     to: '/#faq' },
    { text: 'Kontak',  to: '/kontak' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#9155FD', fontWeight: 700 }}>
          <img src={LogoSao} alt="Logo Sao" style={{ height: 40 }} />
        </Typography>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={RouterLink}
            to={item.to}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          top: 12,                                
          left: '50%',                            
          transform: 'translateX(-50%)',        
          width: { xs: '75%', md: '75%' }, 
          backgroundColor: 'rgba(255, 255, 255, 0.9) ',
          backdropFilter: 'blur(8px)',
          borderBottom: 'none',
          borderRadius: '50px',
          boxShadow: '0px 1px 8px 0px rgba(76, 78, 100, 0.12)',
          py: 0.5,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Toolbar disableGutters>
            {/* Logo → go to home */}
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: 'flex',
                alignItems: 'left',
                fontWeight: 700,
                color: '#9155FD',
                textDecoration: 'none',
                flexGrow: { xs: 1, md: 0 },
                fontSize: '1.5rem',
              }}
            >
              <img src={LogoSao} alt="Logo Sao" style={{ height: 64 }} />
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.to}
                    sx={{ 
                      mx: 1, 
                      color: isActive(item.to) ? '#9155FD' : theme.palette.text.primary,
                      fontWeight: isActive(item.to) ? 700 : 500,
                      backgroundColor: isActive(item.to) ? 'rgba(145, 85, 253, 0.1)' : 'transparent',
                      right: '20%', 
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(145, 85, 253, 0.1)',
                        color: '#9155FD',
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {!isMobile && (
              <Box sx={{ flexGrow: 0 }}>
                <Button 
                  variant="contained" 
                  onClick={handleWhatsApp}
                  sx={{ 
                    backgroundColor: '#9155FD',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#7C3AED',
                    }
                  }}
                >
                  Beli Sekarang
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
