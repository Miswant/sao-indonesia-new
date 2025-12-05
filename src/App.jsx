// App.jsx
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import theme from './theme';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import FloatingActions from './sections/FloatingAction';
import Statistics from './sections/Statistics';
import OurUniqueTraits from './sections/OurUniqueTraits';
import TrustBadges from './sections/TrustBadges';
import Admin from './sections/Admin';
import NewPageContact from './sections/NewPageContact';

function ScrollToHash() {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToHash />

      <Box
        sx={{
          minHeight: '100vh',
          // pt: { xs: 10, md: 12 },
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />

        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <OurUniqueTraits />
                  <Statistics />
                  <FAQ />
                  <TrustBadges />
                  {/* <Contact /> */}
                </>
              }
            />
            <Route path="/kontak" element={<NewPageContact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Box>

        <Footer />
        <FloatingActions />
      </Box>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
