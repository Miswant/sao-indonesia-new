import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Check as CheckIcon, SendRounded, BuildRounded, RocketLaunchRounded } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const Pricing = () => {
  const theme = useTheme();
  const [billingYearly, setBillingYearly] = React.useState(false);

  const pricingPlans = [
    {
      name: 'Starter',
      price: 49,
      yearlyPrice: 529,
      isPopular: false,
      features: [
        'Manajemen inventaris dasar',
        'Modul penjualan & pelanggan (CRM) dasar',
        'Pencatatan transaksi & laporan sederhana',
        'Formulir dan alur kerja dasar',
        'Integrasi email dan notifikasi',
        'Akses 3 pengguna',
      ],
      buttonText: 'Mulai',
      buttonVariant: 'outlined',
    },
    {
      name: 'Bisnis',
      price: 149,
      yearlyPrice: 1589,
      isPopular: true,
      features: [
        'Semua fitur paket Starter',
        'Akuntansi lengkap & multi-mata uang',
        'Manajemen pembelian & pemasok',
        'Otomasi proses dan aturan bisnis',
        'Manajemen SDM (cuti, gaji dasar)',
        'API & integrasi pihak ketiga',
        'Akses hingga 25 pengguna',
      ],
      buttonText: 'Coba Sekarang',
      buttonVariant: 'contained',
    },
    {
      name: 'Enterprise',
      price: 399,
      yearlyPrice: 4269,
      isPopular: false,
      features: [
        'Semua fitur paket Bisnis',
        'Kustomisasi perizinan & alur kerja lanjutan',
        'Pelaporan lanjutan & dashboard BI',
        'SLA + dukungan prioritas',
        'Sandbox untuk pengujian & deployment',
        'Onboarding & integrasi khusus',
      ],
      buttonText: 'Hubungi Penjualan',
      buttonVariant: 'outlined',
    },
  ];

  const handleWhatsApp = (plan) => {
    const phone = '+6285719033486';
    const priceLabel = billingYearly ? `${plan.yearlyPrice}/tahun` : `${plan.price}/bln`;
    const text = encodeURIComponent(
      `Halo, saya tertarik dengan paket *${plan.name}* (${priceLabel}). Bisa bantu informasi lebih lanjut?`
    );
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, '_blank');
  };

  // const stats = [
  //   { number: '7.1k+', label: 'Tiket dukungan terselesaikan' },
  //   { number: '50k+', label: 'Bergabung dengan komunitas kreatif' },
  //   { number: '4.8/5', label: 'Produk bernilai tinggi' },
  //   { number: '100%', label: 'Jaminan uang kembali' },
  // ];

  return (
    <Box
      id="pricing"
      sx={{
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
      }}
    >
      {/* Background shape */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '250px',
          height: '250px',
          background: 'linear-gradient(135deg, rgba(105, 108, 255, 0.1) 0%, rgba(91, 92, 230, 0.1) 100%)',
          borderRadius: '50%',
          transform: 'translate(30%, 30%)',
          zIndex: 1,
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.045),
            borderRadius: { xs: 4, md: 6 },
            py: { xs: 6, md: 8 },
            
          }}
        >
        <Container maxWidth="xl">
        <Stack spacing={6}>
          {/* Section Header */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Paket harga yang disesuaikan
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.375rem', md: '1.875rem' },
                fontWeight: 600,
                color: theme.palette.text.secondary,
                mb: 3,
              }}
            >
              dirancang untuk bisnis Anda
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                color: theme.palette.text.secondary,
                maxWidth: 720,
                mx: 'auto',
                lineHeight: 1.6,
                
              }}
            >
              Semua paket termasuk 40+ fitur canggih untuk membantu mengelola transaksi, pelanggan, dan pelaporan. Pilih paket yang paling sesuai untuk kebutuhan SAO Anda.
            </Typography>
            {/* Billing toggle */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Bayar Bulanan</Typography>
              <Box
                component="input"
                type="checkbox"
                checked={billingYearly}
                onChange={() => setBillingYearly((v) => !v)}
                aria-label="Toggle yearly billing"
                sx={{
                  
                  appearance: 'none',
                  width: 42,
                  height: 24,
                  borderRadius: 12,
                  position: 'relative',
                  outline: 'none',
                  cursor: 'pointer',
                  backgroundColor: billingYearly ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.3),
                  transition: 'all .2s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 2,
                    left: billingYearly ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    transition: 'all .2s ease',
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Bayar Tahunan</Typography>
              <Chip
                label="Hemat 25%"
                size="small"
                sx={{
                  ml: 1,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  fontWeight: 700,
                  px: 1.5,
                  height: 24,
                  borderRadius: '999px',
                  letterSpacing: 0.3,
                }}
              />
            </Stack>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: `1px solid ${plan.isPopular ? alpha(theme.palette.primary.main, 0.45) : theme.palette.divider}`,
                    borderRadius: '12px',
                    transition: 'all 0.25s ease-in-out',
                    boxShadow: plan.isPopular
                      ? '0 12px 28px rgba(76,78,100,0.14)'
                      : '0 4px 14px rgba(76,78,100,0.08)',
                    background: plan.isPopular
                      ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, rgba(255,255,255,1) 14%)`
                      : 'white',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 36px rgba(76,78,100,0.16)',
                    },
                  }}
                >
                  {/* {plan.isPopular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        px: 2.25,
                        py: 0.5,
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: 0.3,
                        textTransform: 'uppercase',
                      }}
                    >
                      Most Popular
                    </Box>
                  )} */}
                  
                  <CardContent sx={{ p: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Stack spacing={3}>
                      <Box>
                        {/* Top icon */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                          <Box sx={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: alpha(theme.palette.primary.main, 0.12), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {plan.name === 'Dasar' && <SendRounded sx={{ color: theme.palette.primary.main }} />}
                            {plan.name === 'Tim' && <BuildRounded sx={{ color: theme.palette.primary.main }} />}
                            {plan.name === 'Perusahaan' && <RocketLaunchRounded sx={{ color: theme.palette.primary.main }} />}
                          </Box>
                        </Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 1,
                          }}
                        >
                          {plan.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 2 }}>
                          <Typography
                            variant="h2"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              fontSize: '3rem',
                            }}
                          >
                            ${billingYearly ? plan.yearlyPrice : plan.price}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              ml: 0.5,
                            }}
                          >
                            {billingYearly ? '/tahun' : '/bln'}
                          </Typography>
                        </Box>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            mb: 3,
                          }}
                        >
                          {billingYearly ? `~$${Math.round(plan.yearlyPrice/12)}/bln (rata-rata)` : `$${plan.yearlyPrice} / tahun`}
                        </Typography>
                      </Box>

                      <List dense sx={{ py: 0, mx: 'auto', textAlign: 'left', width: '100%', maxWidth: 320 }}>
                        {plan.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ px: 0.5, py: 0.4 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckIcon 
                                sx={{ 
                                  fontSize: '1.25rem', 
                                  color: theme.palette.success.main 
                                }} 
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                fontSize: '0.875rem',
                                color: theme.palette.text.secondary,
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Button
                        variant={plan.buttonVariant}
                        size="large"
                        fullWidth
                        onClick={() => handleWhatsApp(plan)}
                        sx={{
                          py: 1.5,
                          borderRadius: '0.5rem',
                          fontWeight: 600,
                          mt: 'auto',
                          ...(plan.buttonVariant === 'outlined' && {
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: theme.palette.primary.main,
                              color: 'white',
                            },
                          }),
                          ...(plan.buttonVariant === 'contained' && {
                            boxShadow: '0 8px 22px rgba(145,85,253,0.28)',
                            '&:hover': { boxShadow: '0 12px 30px rgba(145,85,253,0.38)' }
                          })
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Stats Section */}
          {/* <Grid container spacing={4} sx={{ mt: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid> */}
        </Stack>
        </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;