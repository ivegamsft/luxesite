import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ScrollNav from './components/ScrollNav';

import WhyAurora from './components/WhyAurora';
import DestinationGrid from './components/DestinationGrid';
import ExperienceList from './components/ExperienceList';
import Testimonials from './components/Testimonials';
import Interstitial from './components/Interstitial';
import Tiers from './components/Tiers';
import FAQ from './components/FAQ';
import ConciergeForm from './components/ConciergeForm';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollNav />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <DestinationGrid />
        <ExperienceList />
        <WhyAurora />
        <Testimonials />
        <Interstitial />
        <Tiers />
        <FAQ />
        <ConciergeForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
