import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { alpha } from '@mui/material/styles';

import boySitting from '../assets/boy-sitting-with-laptop.png';

const items = [
  {
    q: 'Apa itu SAO (Sale Account Organizer)?',
    a: 'SAO (Sale Account Organizer) adalah perangkat lunak manajemen bisnis yang dirancang untuk membantu pengusaha mengelola berbagai aspek bisnis mereka. Dari manajemen persediaan hingga analisis data, pemrosesan penjualan, pengelolaan informasi klien, hingga alat akuntansi dan pencatatan yang efisien, SAO memberikan solusi lengkap untuk mengelola bisnis dari bawah ke atas, hingga alat akuntansi dan pencatatan yang efisien, SAO memberikan solusi lengkap untuk mengelola bisnis dari bawah ke atas.',
  },
  {
    q: 'Apa keunggulan utama SAO dalam menjalankan bisnis?',
    a: 'Salah satu keunggulan utama SAO adalah kemampuannya dalam mengintegrasikan berbagai fungsi bisnis menjadi satu platform. Ini memungkinkan Anda untuk dengan mudah mengontrol persediaan, menghasilkan laporan analisis yang mendalam, serta mengelola transaksi penjualan dan keuangan dengan efisien. SAO juga menawarkan alat pelacakan klien yang membantu Anda memahami kebutuhan dan preferensi pelanggan.',
  },
  {
    q: 'Apa manfaat penggunaan SAO bagi pemilik bisnis?',
    a: 'Penggunaan SAO memberikan beberapa manfaat bagi pemilik bisnis. Dengan SAO, Anda dapat menghemat waktu dan usaha dalam mengelola inventaris, mengelola data pelanggan, serta mengawasi kinerja bisnis Anda melalui analisis data yang mudah diakses. Selain itu, alat akuntansi yang terintegrasi membantu Anda melacak keuangan dengan lebih baik.',
  },
  {
    q: 'Apakah SAO cocok untuk jenis bisnis apa saja?',
    a: 'Ya, SAO dirancang untuk dapat diadaptasi ke berbagai jenis bisnis, baik itu ritel, layanan, atau bahkan bisnis online. Dengan fitur yang dapat disesuaikan, SAO dapat digunakan oleh berbagai industri, termasuk restoran, toko retail, agen travel, dan lainnya.',
  },
  {
    q: 'Apakah SAO dapat membantu meningkatkan efisiensi operasional?',
    a: 'Tentu, SAO dapat signifikan meningkatkan efisiensi operasional bisnis Anda. Dengan memudahkan manajemen persediaan, transaksi penjualan yang lancar, serta akses cepat ke informasi kinerja bisnis, Anda dapat mengambil keputusan yang lebih baik dan mengoptimalkan operasional bisnis Anda secara keseluruhan.',
  },
];

const FAQ = () => {
  const theme = useTheme();

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 8, md: 12 },
        background: alpha(theme.palette.primary.main, 0.045),
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Chip
              label="FAQ"
              size="small"
              sx={{
                mb: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                color: theme.palette.primary.main,
                fontWeight: 700,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Pertanyaan yang Sering{' '}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                Diajukan
              </Box>
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                color: theme.palette.text.secondary,
                maxWidth: 720,
                mx: 'auto',
              }}
              
            >
              Telusuri FAQ berikut untuk menemukan jawaban atas pertanyaan yang
              sering diajukan mengenai SAO.
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="flex-start">
          

            <Grid item xs={12} md={7}>
              <Stack spacing={1.5}>
                {items.map((it, idx) => (
                  <Accordion
                    key={idx}
                    disableGutters
                    elevation={0}
                    sx={{
                      border: `1px solid ${alpha(
                        theme.palette.text.primary,
                        0.12
                      )}`,
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundColor: 'white',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ px: 2, py: 1 }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>{it.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {Array.isArray(it.a) ? it.a.join(' ') : it.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default FAQ;
