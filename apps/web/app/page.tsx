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
        {/* Act 1 — First Impression: Hero + Credibility */}
        <Hero />
        <TrustBar />

        {/* Act 2 — Expertise & Authority */}
        <WhyAurora />

        {/* Act 3 — Discovery: Browse the world */}
        <DestinationGrid />
        <ExperienceList />

        {/* Act 4 — Social Proof */}
        <Testimonials />
        <Interstitial />

        {/* Act 5 — Commitment */}
        <Tiers />
        <FAQ />
        <ConciergeForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
