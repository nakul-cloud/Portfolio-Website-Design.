import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Music from './components/Music'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Toaster } from './components/ui/sonner'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { CustomCursor } from './components/ui/CustomCursor'
import SmoothScroll from './components/ui/SmoothScroll'


export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] selection:bg-red-500/30 selection:text-white relative overflow-hidden">

        {/* Navigation */}
        <Navigation />

        {/* Sections with their own backgrounds */}
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Music />
        <Contact />
        <Footer />

        {/* UI Components */}
        <Toaster />
        <ScrollToTop />
        <CustomCursor />
      </div>
    </SmoothScroll>
  )
}
