import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import bgDashboard from '../assets/demo-dashboard-noitem.png';
import cardPenjualan from '../assets/TotalPenjualan.png';
import cardPembelian from '../assets/TotalPembelian.png';
import cardSample from '../assets/SampleChart.png';

const InteractiveDashboardCard = () => {
  const [transform, setTransform] = useState(
    'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // pusatkan di tengah viewport (0.5)
      const xRel = e.clientX / vw - 0.5;
      const yRel = e.clientY / vh - 0.5;

      const maxTilt = 15; // derajat
      const maxRoll = 3;  // derajat

      const rotateX = -yRel * maxTilt;   // atas–bawah
      const rotateY = -xRel * maxTilt;   // kiri–kanan
      const rotateZ =  xRel * maxRoll;   // sedikit roll

      setTransform(
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      );
    };

    const handleMouseLeave = () => {
      // reset semua axis
      setTransform('rotateX(0deg) rotateY(0deg) rotateZ(0deg)');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: { xs: 4, md: 8 },
      }}
    >

      <Box
        sx={{
          width: '90%',
          maxWidth: 1200,
          aspectRatio: '16 / 9',
          perspective: '1200px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 3,
            overflow: 'visible',
            transform,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out',
            boxShadow: '0 18px 60px rgba(76, 78, 100, 0.22)',
            backgroundColor: '#fff',
          }}
        >
          {/* LAYER 1 – background dashboard */}
          <Box
            component="img"
            src={bgDashboard}
            alt="Dashboard"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 3,
              display: 'block',
              transform: 'translateZ(0px)',
            }}
          />

          {/* LAYER 2 – Card Total Penjualan */}
          <Box
            component="img"
            src={cardPenjualan}
            alt="Total Penjualan"
            sx={{
              position: 'absolute',
              top: '17%',
              left: '18%',
              width: '25%',
              borderRadius: 2,
              boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
              transform: 'translateZ(60px)',
              pointerEvents: 'none',
            }}
          />

          {/* LAYER 3 – Card Total Pembelian */}
          <Box
            component="img"
            src={cardPembelian}
            alt="Total Pembelian"
            sx={{
              position: 'absolute',
              top: '17%',
              left: '44%',
              width: '25%',
              borderRadius: 2,
              boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
              transform: 'translateZ(60px)',
              pointerEvents: 'none',
            }}
          />

          {/* LAYER 4 – Sample Chart */}
          <Box
            component="img"
            src={cardSample}
            alt="Sample Chart"
            sx={{
              position: 'absolute',
              bottom: '5%',
              right: '4.5%',
              width: '26%',
              borderRadius: 2,
              boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
              transform: 'translateZ(60px)',
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InteractiveDashboardCard;
