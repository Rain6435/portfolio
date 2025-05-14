import { Link, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

function NotFoundPage() {
  const navigate = useNavigate()
  
  // Set a custom data attribute for the 404 page styling
  useEffect(() => {
    // Removed window.scrollTo(0, 0) - let ScrollToTop handle this
    document.body.setAttribute('data-page', 'not-found')
    
    return () => {
      document.body.removeAttribute('data-page')
    }
  }, [])
  
  return (
    <div className="not-found-container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="grid-background"></div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <div className="error-number" style={{ 
              fontSize: '12rem', 
              fontWeight: '800',
              lineHeight: '1',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))', 
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent'
            }}>
              404
            </div>
            
            <h1 className="display-4 mb-4">Page Not Found</h1>
            
            <p className="lead mb-5">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <Link to="/" className="btn btn-lg btn-gradient px-5 py-3">
              <i className="bi bi-house-door me-2"></i> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage