import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme
} from '@mui/material';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import dashboardDemo from '../assets/dashboard-demo.png';
import InteractiveDashboardCard from '../components/InteractiveDashboardCard';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      id="home"
      sx={{
        background: '#f8f7fa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 12, md: 16 },
        pb: { xs: 4, md: 8 },
      }}
    >
      {/* Top gradient panel to mimic Sneat hero background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          height: { xs: 520, md: 640 },
          background:
            'radial-gradient(1200px 520px at 10% -10%, rgba(145,85,253,0.28) 0%, rgba(145,85,253,0.10) 40%, rgba(248,247,250,0) 75%), radial-gradient(1100px 520px at 100% 0%, rgba(255,160,122,0.22) 0%, rgba(255,160,122,0.06) 40%, rgba(248,247,250,0) 75%)',
          borderBottomLeftRadius: { xs: '32px', md: '48px' },
          borderBottomRightRadius: { xs: '32px', md: '48px' },
          boxShadow: '0 20px 40px rgba(76,78,100,0.08) inset',
          zIndex: 0,
        }}
      />
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={3} sx={{ textAlign: 'center', alignItems: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.25rem', md: '3.25rem', lg: '3.5rem' },
                fontWeight: 700,
                color: theme.palette.text.primary,
                lineHeight: 1.25,
                mb: 1,
              }}
            >
              Semua dalam satu{' '}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                solusi manajemen
              </Box>
              <br />
              untuk usaha Anda
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: '1.05rem',
                color: theme.palette.text.secondary,
                maxWidth: 680,
                lineHeight: 1.7,
              }}
            >
              Tanpa perlu pemrograman. Penyesuai langsung menyediakan semua kebutuhan pemasaran Anda.
            </Typography>

            <Stack direction="row" alignItems="center" spacing={3} sx={{ mt: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Typography variant="body2" sx={{ color: '#9155FD', fontWeight: 500 }}>
                  Bergabung dengan komunitas
                </Typography>
                <EastRoundedIcon sx={{ color: '#9155FD' }} />
              </Stack>
              <Button
                variant="contained"
                size="large"
                href="#contact"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: 190,
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: '0 8px 22px rgba(145, 85, 253, 0.28)',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 14px 34px rgba(145, 85, 253, 0.35)',
                  },
                }}
              >
                Dapatkan Akses Awal
              </Button>
            </Stack>
          </Stack>

        
          <Box
            sx={{
              mt: { xs: 8, md: 1 },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 1100,
                borderRadius: 3,
                p: { xs: 0.75, md: 1 },
                
                transform: 'translateY(40px)',
                
              }}
            >
              <InteractiveDashboardCard/>
            </Box>
            
            
          </Box>
          <Box
            sx={{
              mt: { xs: 12, md: 16 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 3,
                fontWeight: 500,
                letterSpacing: 0.5,
              }}
            >
              Trusted by
            </Typography>

            <Stack
              direction="row"
              spacing={{ xs: 3, md: 6 }}
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box component="img" src="/src/assets/PartnerCompenies/BTS.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/CLOVER.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/GGS.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/MAP.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/Neutron.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/SAO.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/SAS.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/SDA.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/SGP.jpeg" sx={{ height: 40, opacity: 0.7 }} />
              <Box component="img" src="/src/assets/PartnerCompenies/SPK.jpeg" sx={{ height: 40, opacity: 0.7 }} />
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;