import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DestinationGrid from './components/DestinationGrid';
import ExperienceList from './components/ExperienceList';
import Tiers from './components/Tiers';
import Testimonials from './components/Testimonials';
import ConciergeForm from './components/ConciergeForm';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DestinationGrid />
      <ExperienceList />
      <Tiers />
      <Testimonials />
      <ConciergeForm />
      <Footer />
    </>
  );
}
