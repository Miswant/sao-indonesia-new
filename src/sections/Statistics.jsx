// src/sections/Differentiators.jsx
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import StarRateIcon from '@mui/icons-material/StarRate';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const items = [
  // {
  //   icon: TrendingUpIcon,
  //   title: '7.1k+',
  //   desc: 'Tiket dukungan terselesaikan',
  //   color : '#7C3AED'
  // },
  // {
  //   icon: GroupsIcon,
  //   title: '50k+',
  //   desc: 'Bergabung dengaan komunitas kreatif',
  //   color: '#7C3AED',
  // },
  // {
  //   icon: StarRateIcon,
  //   title: '4.8/5',
  //   desc: 'Produk bernilai tinggi',
  //   color: '#7C3AED'
  // },
  // {
  //   icon: VerifiedUserIcon,
  //   title: '100%',
  //   desc: 'Jaminan uang kembali',
  //   color: '#7C3AED',
  // },
];

const Statistics = () => {
  const theme = useTheme();

  return (
    <Box
      id="difference"
      sx={{
        pt: { xs: 2, md: 4 },   
        pb: { xs: 8, md: 4 },  
        backgroundColor: '#ffffffff',
        alignItems: 'center',
        justifyContent : 'center',
      }}
    >
      <Container maxWidth="lg">

        

        <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: {
            xs: 'repeat(2, minmax(350px, 1fr))',  
            md: 'repeat(4, minmax(300px, 1fr))',   
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
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#ffffffff',
                  color: '#7C3AED',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  // transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  // '&:hover': {
                  //   transform: 'translateY(-6px)',
                  // },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    mb: 0.2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                  }}
                >
                  <Icon sx={{ fontSize: 34, color: '#7C3AED' }} />
                </Box>

                {/* Title */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 1.2,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Desc */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(0, 0, 0, 1)',
                    lineHeight: 1.3,
                    fontSize: '.95rem',
                    fontWeight: 400
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

export default Statistics;
