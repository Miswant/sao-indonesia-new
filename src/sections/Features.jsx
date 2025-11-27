import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Code as CodeIcon,
  Update as UpdateIcon,
  RocketLaunch as RocketIcon,
  Api as ApiIcon,
  SupportAgent as SupportIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';

const Features = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />,
      title: 'Kode Berkualitas',
      description:
        'Struktur kode yang mudah dipahami oleh pengembang dan mudah dikembangkan.',
    },
    {
      icon: <UpdateIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />,
      title: 'Pembaruan Berkala',
      description:
        'Pembaruan gratis selama periode dukungan termasuk demo dan fitur baru.',
    },
    {
      icon: <RocketIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />,
      title: 'Starter Kit',
      description:
        'Mulai proyek lebih cepat tanpa harus menghapus fitur yang tidak perlu.',
    },
    {
      icon: <ApiIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />,
      title: 'Siap API',
      description:
        'Mudah disambungkan ke API Anda — ganti endpoint dan data akan muncul.',
    },
    {
      icon: <SupportIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />,
      title: 'Dukungan Prima',
      description:
        'Dokumentasi dan dukungan yang membantu tim Anda cepat beradaptasi.',
    },
    {
      icon: <DocumentIcon sx={{ fontSize: '2rem', color: theme.palette.primary.main }} />,
      title: 'Dokumentasi Lengkap',
      description:
        'Dokumentasi terperinci dengan contoh dan referensi yang lengkap.',
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
      }}
    >
      {/* Background shape */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background:
            'linear-gradient(135deg, rgba(105, 108, 255, 0.1) 0%, rgba(91, 92, 230, 0.1) 100%)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={6}>
          {/* Section Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 700,
                mb: 2,
                position: 'relative',
                display: 'inline-block',
              }}
            >
              Segala yang Anda butuhkan
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                color: theme.palette.text.secondary,
                maxWidth: 680,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              untuk memulai proyek Anda berikutnya
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: theme.palette.text.secondary,
                maxWidth: 760,
                mx: 'auto',
              }}
            >
              Bukan sekadar kumpulan alat — paket ini termasuk aplikasi konseptual siap pakai.
            </Typography>
          </Box>

          {/* 2 rows × 3 columns on desktop */}
          <Box
            sx={{
              maxWidth: 1500,
              mx: 'auto',
              display: 'grid',
              gap: 4,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))', // 3 columns from md up
              },
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '12px',
                  transition: 'all 0.25s ease-in-out',
                  boxShadow: '0 2px 10px rgba(76,78,100,0.06)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 28px rgba(76,78,100,0.12)',
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, minHeight: 190 }}>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.12
                        ),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: '1.25rem',
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        maxWidth: 380,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Features;
