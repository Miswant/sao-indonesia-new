// src/sections/Testimonials.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const testimonials = [
    {
      id: 1,
      name: 'Eugenia Moore',
      position: 'Pendiri Pinterest',
      avatar:
        'https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/avatars/1.png',
      review:
        'SAO sangat membantu tim kami dalam mengelola data pelanggan dan transaksi.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Tommy Haffman',
      position: 'Pendiri Netflix',
      avatar:
        'https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/avatars/2.png',
      review:
        'Template ini unggul di banyak aspek. Kode, desain, pembaruan berkala, dan dukungannya sangat memuaskan.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Eugenia Moore',
      position: 'CTO Airbnb',
      avatar:
        'https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/avatars/3.png',
      review:
        'Semua kebutuhan pengembang dipertimbangkan dengan baik, sehingga saya bisa membangun antarmuka impian.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Sara Smith',
      position: 'Pendiri Coinbase',
      avatar:
        'https://demos.themeselection.com/sneat-mui-nextjs-admin-template/demo-1/images/avatars/4.png',
      review:
        'SAO jadi andalan kami untuk membangun dashboard yang cepat dan fleksibel.',
      rating: 5,
    },
  ];

  const visible = isMobile ? 1 : 3;
  const slides = [...testimonials, ...testimonials];

  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);

  const startAutoPlay = () => {
    if (autoPlayRef.current) return;
    autoPlayRef.current = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const next = () => {
    stopAutoPlay();
    setIndex(prev => prev + 1);
    startAutoPlay();
  };

  const prev = () => {
    stopAutoPlay();
    setIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
    startAutoPlay();
  };

  // reset saat mencapai batas clone (forward)
  useEffect(() => {
    if (!trackRef.current) return;

    if (index === testimonials.length) {
      setTimeout(() => {
        trackRef.current.style.transition = 'none';
        setIndex(0);
      }, 410);

      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.style.transition = 'transform 0.4s ease';
        }
      }, 450);
    }
  }, [index, testimonials.length]);

  return (
    <Box
      id="testimonials"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Apa kata mereka
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Lihat apa yang dikatakan pelanggan kami tentang pengalaman
              menggunakan SAO.
            </Typography>
          </Box>

          {/* Slider wrapper (arrows float di luar, cards tidak kepotong) */}
          <Box
            sx={{
              position: 'relative',
              mt: { xs: 2, md: 4 },
            }}
          >
            {/* Inner shell dengan overflow hidden */}
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: 4,
                px: { xs: 1, md: 3 },
                py: { xs: 3, md: 4 },
              }}
            >
              <motion.div
                ref={trackRef}
                style={{
                  display: 'flex',
                  gap: 0,
                  transition: 'transform 0.4s ease',
                  transform: `translateX(-${index * (100 / visible)}%)`,
                }}
              >
                {slides.map((t, i) => (
                <Box
                  key={i}
                  sx={{
                    flex: `0 0 ${100 / visible}%`,
                    px: { xs: 1, md: 1.5 },
                  }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 3.5 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between', // ⬅️ penting
                      }}
                    >
                      {/* TOP: review text */}
                      <Typography
                        sx={{
                          color: theme.palette.text.secondary,
                          fontStyle: 'italic',
                        }}
                      >
                        “{t.review}”
                      </Typography>

                      {/* BOTTOM: rating + user info (selalu di bawah) */}
                      <Box sx={{ mt: 3 }}>
                        <Rating
                          value={t.rating}
                          readOnly
                          size="small"
                          sx={{
                            mb: 1,
                            '& .MuiRating-iconFilled': {
                              color: '#FFB400',
                            },
                          }}
                        />

                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar src={t.avatar} sx={{ width: 48, height: 48 }} />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>{t.name}</Typography>
                            <Typography
                              sx={{
                                fontSize: '0.85rem',
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {t.position}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}

              </motion.div>
            </Box>

            {/* Nav arrows, mengambang dan tidak kepotong */}
            <IconButton
              onClick={prev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: { xs: 4, md: -18 },
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: '0 8px 20px rgba(15,23,42,0.18)',
                '&:hover': { bgcolor: theme.palette.action.hover },
              }}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              onClick={next}
              sx={{
                position: 'absolute',
                top: '50%',
                right: { xs: 4, md: -18 },
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: '0 8px 20px rgba(15,23,42,0.18)',
                '&:hover': { bgcolor: theme.palette.action.hover },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Testimonials;
