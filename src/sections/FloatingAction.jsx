// src/components/FloatingActions.jsx
import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
        const scrollY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

        setShowScrollTop(scrollY > 150);
        
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const phone = '+6285719033486';
    const text  = encodeURIComponent('Halo, saya mau tanya tentang SAO 🙂');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 32 },
        bottom: { xs: 16, md: 32 },
        zIndex: 1500,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          onClick={handleWhatsApp}
          startIcon={<WhatsAppIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '999px',
            px: 3,
            py: 1.2,
            fontSize: '0.9rem',
            background:
              'linear-gradient(135deg, #9B2A93 0%, #8D57C7 50%, #538BED 100%)',
            // boxShadow:
            //   '0 0 0 0 rgba(255, 99, 132, 0.0), 0 18px 40px rgba(133, 21, 148, 0.45)',
            '&:hover': {
              background:
                'linear-gradient(135deg, #9B2A93 0%, #8D57C7 50%, #538BED 100%)',
              boxShadow: '0 22px 50px rgba(133, 21, 148, 0.45)',
              transform: 'translateY(-1px)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -8,
              borderRadius: '999px',
              background:
                'radial-gradient(circle, rgba(133, 21, 148, 0.45) 0%, transparent 60%)',
              filter: 'blur(10px)',
              zIndex: -1,
            },
          }}
        >
          Contact Us
        </Button>

        {/* {showScrollTop && (
          <IconButton
            onClick={handleScrollTop}
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #5a6bff 0%, #7b5cff 100%)',
              color: '#fff',
              boxShadow: '0 16px 35px rgba(90, 107, 255, 0.45)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4a5cf0 0%, #6c4cff 100%)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        )} */}
      </Stack>
    </Box>
  );
};

export default FloatingActions;
