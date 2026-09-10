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
      {/* Navbar fijo arriba: acompaña todo el scroll del documento */}
      <Navbar />
      <Hero />
      <main>
        <StadiumImmersion />
        <JerseySection />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
