import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import About from '../components/About'
import Experience from '../components/Experience'
import HowIWork from '../components/HowIWork'
import CaseStudies from '../components/CaseStudies'
import Contact from '../components/Contact'

function HomePage() {
  useEffect(() => {
    // Reveal animations on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el)
    })
    
    // Cleanup on unmount
    return () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <>
      <HeroSection />
      <About />
      <Experience />
      <HowIWork />
      <CaseStudies />
      <Contact />
    </>
  )
}

export default HomePage