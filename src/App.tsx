import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
