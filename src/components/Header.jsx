import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'

function Header({ hideContactButton = false }) {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Simplified navigation handler
  const handleNavigation = (e, path) => {
    e.preventDefault()
    
    // If we're already on the homepage and clicking a section link
    if (location.pathname === '/' && path.startsWith('#')) {
      // Smooth scroll to the section
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // This is navigation to a new route - let ScrollToTop handle scrolling
      navigate({ to: path })
    }
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link 
          to="/" 
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: '/' });
          }}
        >
          <span className="fw-bold">Mohammed.</span>
          <span className="d-none d-md-inline">Elhasnaoui</span>
        </Link>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Only show navigation items if not on NotFound page */}
            {!hideContactButton && (
              <>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#about" onClick={(e) => handleNavigation(e, '#about')}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#experience" onClick={(e) => handleNavigation(e, '#experience')}>Experience</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#work" onClick={(e) => handleNavigation(e, '#work')}>How I Work</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#projects" onClick={(e) => handleNavigation(e, '#projects')}>Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-3" href="#contact" onClick={(e) => handleNavigation(e, '#contact')}>Contact</a>
                </li>
                <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                  <a 
                    href="mailto:melhas134@gmail.com" 
                    className="btn btn-gradient"
                  >
                    Let's Talk
                  </a>
                </li>
              </>
            )}
            {/* Always show a home button on error page */}
            {hideContactButton && (
              <li className="nav-item">
                <Link 
                  to="/" 
                  className="btn btn-gradient"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate({ to: '/' });
                  }}
                >
                  <i className="bi bi-house-door me-2"></i> Go Home
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header