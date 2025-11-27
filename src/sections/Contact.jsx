import React from 'react';
import boySitting from '../assets/boy-sitting-with-laptop.png';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  TextField,
  Button,
  Chip,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

const Contact = () => {
  const theme = useTheme();

  const [values, setValues] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = React.useState({});

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState('');

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackOpen(false);
  };

  const validate = () => {
    const e = {};
    if (!values.fullName.trim()) e.fullName = 'Nama lengkap wajib diisi';
    if (!values.email.trim()) e.email = 'Email wajib diisi';
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Format email tidak valid';
    if (!values.phone.trim()) e.phone = 'Telepon wajib diisi';
    else if (!/^[0-9+()\-\s]{6,}$/.test(values.phone)) e.phone = 'Nomor telepon tidak valid';
    if (!values.message.trim()) e.message = 'Pesan wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Prepare client token (store in localStorage so server can rate-limit per device)
    let clientToken = null;
    try {
      clientToken = localStorage.getItem('clientToken');
      if (!clientToken) {
        clientToken = `ct_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem('clientToken', clientToken);
      }
    } catch (err) {
      console.warn('localStorage not available', err);
    }

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(clientToken ? { 'x-client-token': clientToken } : {}),
        },
        body: JSON.stringify(values),
      });
      const data = await resp.json();
      if (!resp.ok) {
        const errMsg = data?.error || 'Gagal mengirim. Silakan coba lagi.';
        setSnackMessage(errMsg);
        setSnackOpen(true);
        return;
      }
      setSnackMessage('Terima kasih! Pesan Anda telah disimpan.');
      setSnackOpen(true);
      setValues({ fullName: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      setSnackMessage('Terjadi kesalahan jaringan. Silakan coba lagi.');
      setSnackOpen(true);
    }
  };

  return (
    <Box
      id="contact"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: theme.palette.background.paper }}
    >
      <Container maxWidth="xl">
        {/* Section header */}
        <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mb: 3 }}>
          <Chip
            label="Kontak"
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              fontWeight: 700,
            }}
          />
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', md: '2rem' } }}
          >
            Mari bekerja sama
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, maxWidth: 760 }}
          >
            Ada pertanyaan atau masukan? Kirimkan pesan kepada kami.
          </Typography>
        </Stack>

        {/* Centered block: image + form */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: 1100,
            mx: 'auto', // center horizontally
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 40,
              left: 40,
              width: 120,
              height: 80,
              borderTopLeftRadius: 32,
              border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
              borderRight: 'none',
              borderBottom: 'none',
            },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }} // column on mobile, row on desktop
            spacing={3}
            alignItems="stretch"
          >
            {/* LEFT: image + contacts */}
            <Box sx={{ flexBasis: { md: '40%' }, flexGrow: 1 }}>
              <Box
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  boxShadow: '0 8px 24px rgba(76,78,100,0.08)',
                }}
              >
                <Box
                  component="img"
                  src={boySitting}
                  alt="Working together"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1529336953121-4f555e86b56a?q=80&w=1200&auto=format&fit=crop';
                  }}
                  sx={{ width: '100%', height: { xs: 220, md: 360 }, objectFit: 'cover' }}
                />

                <Box
                  sx={{
                    p: 2.5,
                    borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                    backgroundColor: '#fafafa',
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: alpha('#6366f1', 0.12),
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            component="svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#6366f1"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary, display: 'block' }}
                          >
                            Email
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            booking@satu-tech.com
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: alpha('#10b981', 0.12),
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            component="svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#10b981"
                          >
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                          </Box>
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: theme.palette.text.secondary, display: 'block' }}
                          >
                            Phone
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            +6285719033486
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>

            {/* RIGHT: form */}
            <Box sx={{ flexBasis: { md: '60%' }, flexGrow: 1 }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.12)}`,
                  boxShadow: '0 8px 24px rgba(76,78,100,0.08)',
                  p: 3,
                }}
              >
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    Kirim Pesan
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Jika Anda ingin membahas pembayaran, akun, lisensi, kemitraan, atau memiliki
                    pertanyaan pra-penjualan, Anda berada di tempat yang tepat.
                  </Typography>
                </Box>

                <Stack spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}
                      >
                        Nama lengkap
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Nama lengkap"
                        type="text"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}
                      >
                        Alamat email
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Alamat email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}
                      >
                        Telepon
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Nomor telepon"
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'transparent',
                            borderRadius: '8px',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, fontWeight: 500, color: theme.palette.text.primary }}
                    >
                      Pesan
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Pesan"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={errors.message}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'transparent',
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 1,
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{
                        textTransform: 'none',
                        py: 1.25,
                        px: 4,
                        borderRadius: '8px',
                        boxShadow: '0 4px 14px rgba(145,85,253,0.25)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      Kirim
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
