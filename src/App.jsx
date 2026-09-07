import Hero from './sections/Hero'
import StadiumImmersion from './sections/StadiumImmersion'
import JerseySection from './sections/JerseySection'
import Plans from './sections/Plans'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <StadiumImmersion />
        <JerseySection />
        <Plans />
        <Contact />
      </main>
      <Footer />
      {/* Sticky bottom: va al final del documento para que acompañe todo el scroll desde el primer viewport */}
      <Navbar />
    </>
  )
}
