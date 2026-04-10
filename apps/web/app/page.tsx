import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import WhyAurora from './components/WhyAurora';
import DestinationGrid from './components/DestinationGrid';
import ExperienceList from './components/ExperienceList';
import GuideGrid from './components/GuideGrid';
import Tiers from './components/Tiers';
import Testimonials from './components/Testimonials';
import PressAwards from './components/PressAwards';
import ConciergeForm from './components/ConciergeForm';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <WhyAurora />
        <DestinationGrid />
        <ExperienceList />
        <GuideGrid />
        <Tiers />
        <Testimonials />
        <PressAwards />
        <ConciergeForm />
      </main>
      <Footer />
    </>
  );
}
