import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import './Footer.css';

function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Updated navigation handler to match Header.jsx
  const handleNavigation = (e, path) => {
    e.preventDefault()
    
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
    <footer className="footer">
      <div className="footer-grid"></div>
      <div className="container position-relative">
        <div className="row mb-5">
          <div className="col-lg-5">
            <h2 className="h4 text-white mb-4">Mohammed Elhasnaoui</h2>
            <p className="text-white-50 mb-4">
              Web Application Developer passionate about creating elegant, 
              user-focused digital experiences with modern technologies.
            </p>
            <div className="d-flex mb-4">
              <a href="https://github.com/Rain6435" className="social-link" target="_blank" rel="noreferrer">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/mohammed-elhasnaoui-43b8a42a0" className="social-link" target="_blank" rel="noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:melhas134@gmail.com" className="social-link">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 mt-5 mt-lg-0">
            <h3 className="h6 text-white mb-4">Quick Links</h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#about" onClick={(e) => handleNavigation(e, '#about')} className="text-white-50 text-decoration-none">About</a>
              </li>
              <li className="mb-2">
                <a href="#experience" onClick={(e) => handleNavigation(e, '#experience')} className="text-white-50 text-decoration-none">Experience</a>
              </li>
              <li className="mb-2">
                <a href="#work" onClick={(e) => handleNavigation(e, '#work')} className="text-white-50 text-decoration-none">How I Work</a>
              </li>
              <li className="mb-2">
                <a href="#projects" onClick={(e) => handleNavigation(e, '#projects')} className="text-white-50 text-decoration-none">Projects</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavigation(e, '#contact')} className="text-white-50 text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4 mt-5 mt-lg-0">
            <h3 className="h6 text-white mb-4">Case Studies</h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a 
                  href="/projects/service-site" 
                  onClick={(e) => handleNavigation(e, '/projects/service-site')} 
                  className="text-white-50 text-decoration-none"
                >
                  Service Site
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/projects/game" 
                  onClick={(e) => handleNavigation(e, '/projects/game')} 
                  className="text-white-50 text-decoration-none"
                >
                  Interactive Game
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="/projects/ecommerce" 
                  onClick={(e) => handleNavigation(e, '/projects/ecommerce')} 
                  className="text-white-50 text-decoration-none"
                >
                  E-Commerce
                </a>
              </li>
              <li>
                <a 
                  href="/projects/analytics" 
                  onClick={(e) => handleNavigation(e, '/projects/analytics')} 
                  className="text-white-50 text-decoration-none"
                >
                  Analytics Dashboard
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-4 mt-5 mt-lg-0">
            <h3 className="h6 text-white mb-4">Contact</h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-2 text-white-50">
                <i className="bi bi-geo-alt me-2"></i> Gatineau, Quebec
              </li>
              <li>
                <a href="mailto:melhas134@gmail.com" className="text-white-50 text-decoration-none">
                  <i className="bi bi-envelope me-2"></i> melhas134@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-secondary my-4" />
        
        <div className="row">
          <div className="col-md-6 text-center text-md-start text-white-50">
            <p className="small mb-0">&copy; {new Date().getFullYear()} Mohammed Elhasnaoui. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end text-white-50">
            <p className="small mb-0">
              Designed for <a href="#" className="text-decoration-none text-white">SEG3125</a> at uOttawa
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer