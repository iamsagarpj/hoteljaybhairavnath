import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import QuickInfo from '../components/QuickInfo.jsx'
import About from '../components/About.jsx'
import ExperienceCards from '../components/ExperienceCards.jsx'
import Rooms from '../components/Rooms.jsx'
import FoodSection from '../components/FoodSection.jsx'
import BoatingSection from '../components/BoatingSection.jsx'
import VasotaSection from '../components/VasotaSection.jsx'
import Attractions from '../components/Attractions.jsx'
import Seasons from '../components/Seasons.jsx'
import Packages from '../components/Packages.jsx'
import TripPlanner from '../components/TripPlanner.jsx'
import Gallery from '../components/Gallery.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FAQ from '../components/FAQ.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import MobileBottomBar from '../components/MobileBottomBar.jsx'

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] bg-forest-deep px-5 py-3 text-offwhite focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <QuickInfo />
        <About />
        <ExperienceCards />
        <Rooms />
        <FoodSection />
        <BoatingSection />
        <VasotaSection />
        <Attractions />
        <Seasons />
        <Packages />
        <TripPlanner />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  )
}
