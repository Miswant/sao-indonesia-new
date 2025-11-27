// src/sections/Differentiators.jsx
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';

const items = [
  {
    icon: PeopleAltRoundedIcon,
    title: 'Unlimited User',
    desc: 'SAO dapat digunakan oleh banyak pengguna dalam satu perusahaan tanpa biaya tambahan per user.',
  },
  {
    icon: VerifiedRoundedIcon,
    title: 'Best Business Practices',
    desc: 'Workflow dan laporan dirancang mengikuti praktik bisnis yang sudah teruji di berbagai industri.',
  },
  {
    icon: LightbulbRoundedIcon,
    title: 'Innovative Development',
    desc: 'Modul terus dikembangkan dan bisa disesuaikan dengan proses unik di perusahaan Anda.',
  },
  {
    icon: TuneRoundedIcon,
    title: 'Customizable & Configurable',
    desc: 'Role, menu, dan laporan dapat dikonfigurasi sesuai struktur organisasi dan kebutuhan bisnis.',
  },
  {
    icon: HeadsetMicRoundedIcon,
    title: 'Fast Support',
    desc: 'Dukungan cepat melalui chat atau panggilan untuk memastikan operasional Anda selalu lancar.',
  },
  {
    icon: ExtensionRoundedIcon,
    title: 'Expert Advice',
    desc: 'Bimbingan ahli untuk membantu konfigurasi dan optimasi sistem sesuai kebutuhan bisnis Anda.',
  },
];

const OurUniqueTraits = () => {
  const theme = useTheme();

  return (
    <Box
      id="difference"
      sx={{
        pt: { xs: 2, md: 10 },   // margin atas kecil
        pb: { xs: 8, md: 4 },  // margin bawah tetap lega
        backgroundColor: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Stack
          spacing={2}
          alignItems="center"
          textAlign="center"
          sx={{ mb: { xs: 4, md: 4 } }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
            }}
          >
            Apa yang Membuat SAO{' '}
            <Box component="span" sx={{ color: theme.palette.primary.main }}>
              Berbeda
            </Box>
          </Typography>

          <Box
            sx={{
              width: 72,
              height: 3,
              borderRadius: 999,
              background:
                'linear-gradient(90deg, #9B2A93 0%, #A057C7 50%, #7C53ED 100%)',
            }}
          />

          <Typography
            variant="body2"
            sx={{
              maxWidth: 640,
              color: theme.palette.text.secondary,
            }}
          >
            Kami tidak hanya menyediakan software, tetapi juga pendekatan yang
            fleksibel dan berorientasi pada kebutuhan bisnis Anda.
          </Typography>
        </Stack>

        <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: {
            md: 'repeat(3, minmax(350px, 1fr))',   
            xs: 'repeat(2, minmax(350px, 1fr))',   
            },
            justifyContent: 'center',
        
            gap: { xs: 3, md: 4 },
        }}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Box
                key={idx}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  textAlign: 'center',
                  color: '#615d5dff',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  // transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  // '&:hover': {
                  //   transform: 'translateY(-6px)',
                  //   boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
                  // },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    // width: 64,
                    // height: 64,
                    // borderRadius: '24px',
                    mb: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                   
                  }}
                >
                  <Icon sx={{ fontSize: 34, color: '#9f64daff' }} />
                </Box>

                {/* Title */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Desc */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(37, 36, 36, 0.8)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default OurUniqueTraits;
