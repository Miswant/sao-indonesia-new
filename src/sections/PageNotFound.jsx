import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            p: 4,
            borderRadius: 2,
            backgroundColor: 'transparent',
          }}
        >
          {/* 404 Error Code */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '80px', sm: '120px' },
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 2,
              letterSpacing: '10px',
            }}
          >
            404
          </Typography>

          {/* Error Icon */}
          <Box sx={{ mb: 3 }}>
            <ErrorOutlineIcon sx={{ fontSize: '80px', color: 'error.main' }} />
          </Box>

          {/* Error Message */}
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
            Page Not Found
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Maaf, halaman yang Anda cari tidak ditemukan atau sudah dihapus.
          </Typography>

          {/* Additional Context */}
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              mb: 3,
              backgroundColor: 'background.paper',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              <ErrorOutlineIcon sx={{ fontSize: '18px', mr: 1, verticalAlign: 'middle' }} />
              Endpoint ini tidak terdaftar dalam sistem. Silakan kembali ke halaman utama atau hubungi administrator jika Anda merasa ini adalah kesalahan.
            </Typography>
          </Paper>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              sx={{ px: 3, py: 1.5 }}
            >
              Kembali ke Beranda
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PageNotFound;
