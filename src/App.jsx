import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';

// Components
import Navbar from './components/Navbar';

// Sections
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, backgroundColor: theme.palette.background.default }}>
          <Navbar />
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
                  <Contact />
                  <Footer />
                  <FloatingActions />
                </>
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;