import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import LogoSao from '../assets/satu-andalan-optima.png';

const Footer = () => {
  const theme = useTheme();

  const footerLinks = {
    pages: [
      { text: 'Harga', href: '#pricing' },
      { text: 'Pembayaran', href: '#payment' },
      { text: 'Pemeliharaan', href: '#maintenance' },
      { text: 'Segera Hadir', href: '#coming-soon' },
    ],
    products: [
      { text: 'Pembuat Halaman', href: '#' },
      { text: 'Dashboard Admin', href: '#' },
      { text: 'Paket UI', href: '#' },
      { text: 'Ilustrasi', href: '#' },
    ],
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: '1.25rem' }} />,
      label: 'Email',
      value: 'booking@satu-tech.com',
      href: 'mailto:booking@satu-tech.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: '1.25rem' }} />,
      label: 'Telepon',
      value: '+6285719033486',
      href: 'tel:+6285719033486',
    },
    {
      icon: <LocationIcon sx={{ fontSize: '1.25rem' }} />,
      label: 'Alamat',
      value: 'Jl. Kartini Raya No.16, RT.13/RW.5, Jakarta Pusat',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, href: '#' },
    { icon: <FacebookIcon />, href: '#' },
    { icon: <TwitterIcon />, href: '#' },
    { icon: <LinkedInIcon />, href: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: '#0b0f19',
        color: 'rgba(255,255,255,0.8)',
        pt: { xs: 8, md: 12 },
        pb: 4,

      }}
      >
      <Container maxWidth="lg">
        
        <Grid container spacing={4} justifyContent={'center'}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>


            <Stack spacing={3}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
                  <img src={LogoSao} alt="Logo Sao" style={{ height: 60 }} />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {/* Template Dashboard Admin yang ramah pengembang & sangat dapat dikustomisasi. */}
                </Typography>
              </Box>
              
              {/* Newsletter */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 2 }}>
                  Berlangganan newsletter
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <TextField
                    size="small"
                    placeholder="Email Anda"
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        color: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '10px',
                      px: 3,
                    }}
                  >
                    Berlangganan
                  </Button>
                </Stack>
              </Box>
              
              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      backgroundColor: theme.palette.action.hover,
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Pages Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                  Halaman
                </Typography>
              {footerLinks.pages.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#fff',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Products Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                  Produk
                </Typography>
              {footerLinks.products.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#fff',
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Stack spacing={3} flex={1}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff' }}>
                Kontak
              </Typography>
              
              {contactInfo.map((contact, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mt: 0.5,
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Box >
                    {/* <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff', mb: 0.5 }}>
                      {contact.label}
                    </Typography> */}
                    {contact.href ? (
                      <Link
                        href={contact.href}
                        underline="none"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.875rem',
                          '&:hover': {
                            color: '#fff',
                          },
                        }}
                      >
                        {contact.value}
                      </Link>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.875rem',
                        }}
                        >
                        {contact.value}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.08)' }} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
                <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              © 2025{' '}
              <Link
                href="https://themeselection.com/"
                underline="none"
                sx={{
                  color: '#fff',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                SAO Indonesia
              </Link>
              , Dibuat dengan ❤️ untuk web yang lebih baik.
            </Typography>
            
            <Stack direction="row" spacing={3}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: '#fff',
                  },
                }}
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: '#fff',
                  },
                }}
              >
                Syarat Layanan
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;