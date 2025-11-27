import React from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  useTheme,
} from '@mui/material';

import EastRoundedIcon from '@mui/icons-material/EastRounded';
import demoDashboard from '../assets/dashboard-demo.png'; 

const TrustBadges = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 8, md: 10 },
        pb: { xs: 8, md: 0 },
        background:
          'linear-gradient(120deg, rgba(150,66,144,1) 0%, rgba(164,101,197,1) 40%, rgba(164,136,240,1) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
        >
       
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#fff',
                  
                }}
              >
                Siap mulai dengan SAO?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.85)',
                  maxWidth: 420,
                }}
              >
                Coba SAO dan lihat bagaimana laporan, penjualan, dan stok Anda
                bisa terhubung dalam satu dashboard terpusat.
              </Typography>

              <Box mt={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<EastRoundedIcon />}
                  href="#contact"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: '#5B6BFF',
                    boxShadow: '0 12px 28px rgba(15,23,42,0.35)',
                    '&:hover': {
                      backgroundColor: '#4650d6',
                      boxShadow: '0 18px 40px rgba(15,23,42,0.45)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Mulai Sekarang
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Right side: dashboard image */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Box
                component="img"
                src={demoDashboard}
                alt="SAO dashboard demo"
                sx={{
                  width: '65%',
                  maxWidth: 640,
                  boxShadow: '0 24px 60px rgba(15,23,42,0.45)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBadges;
