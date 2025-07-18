import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import NavigationUtils from '../utils/navigation';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get route information using navigation utils
  const routeType = NavigationUtils.getRouteType(location.pathname);
  const projectName = NavigationUtils.getProjectName(location.pathname);
  const isHomePage = NavigationUtils.isHomePage(location.pathname);
  const isProjectPage = NavigationUtils.isProjectPage(location.pathname);
  const isNotFoundPage = NavigationUtils.isNotFoundPage(location.pathname);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
    };

    // Initial check
    checkMobile();

    // Listen for window resize
    window.addEventListener("resize", checkMobile);

    // Handle scroll for navbar background
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Navigation handler with improved logic
  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu

    if (path.startsWith("#")) {
      // Handle section navigation
      if (isHomePage) {
        NavigationUtils.scrollToSection(path);
      } else {
        // Navigate to home first, then scroll
        navigate({ to: "/" });
        setTimeout(() => NavigationUtils.scrollToSection(path), 100);
      }
    } else {
      navigate({ to: path });
    }
  };

  // Get navigation items based on current page
  const getNavigationItems = () => {
    if (isNotFoundPage) {
      return (
        <li className="nav-item">
          <Link
            to="/"
            className="btn btn-gradient"
            onClick={(e) => handleNavigation(e, "/")}
          >
            <i className="bi bi-house-door me-2"></i> Go Home
          </Link>
        </li>
      );
    }

    if (isProjectPage) {
      const projectNav = NavigationUtils.getProjectNavigation();
      return (
        <>
          <li className="nav-item me-3">
            <Link
              to="/"
              className="btn btn-outline-light btn-sm d-inline-flex align-items-center gap-2"
              onClick={(e) => handleNavigation(e, "/")}
            >
              <i className="bi bi-arrow-left"></i> Back to Portfolio
            </Link>
          </li>
          {projectNav.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className="nav-link px-3"
                onClick={(e) => handleNavigation(e, item.path)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </>
      );
    }

    // Home page navigation
    const homeSections = NavigationUtils.getHomeSections();
    return (
      <>
        {homeSections.map((section, index) => (
          <li key={index} className="nav-item">
            <Link
              to={section.href}
              className="nav-link px-3"
              onClick={(e) => handleNavigation(e, section.href)}
            >
              {section.label}
            </Link>
          </li>
        ))}
        <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
          <a
            href="mailto:melhas134@gmail.com"
            className="btn btn-gradient"
          >
            Let's Talk
          </a>
        </li>
      </>
    );
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top ${
        scrolled ? "scrolled" : ""
      } ${isMobile ? "navbar-mobile" : ""} ${routeType === 'service-site' ? 'navbar-service-site' : ''}`}
    >
      <div className="container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={(e) => handleNavigation(e, "/")}
        >
          <span className="fw-bold">Mohammed.</span>
          <span className="d-md-inline">Elhasnaoui</span>
          {projectName && (
            <span className="project-indicator">
              <i className="bi bi-dot"></i>
              {projectName}
            </span>
          )}
        </Link>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {getNavigationItems()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;