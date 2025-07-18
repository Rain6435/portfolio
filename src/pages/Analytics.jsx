import { useEffect } from 'react'
import Dashboard from './Analytics/Dashboard'
import '../i18n'

function AnalyticsPage() {
  // Set a custom data attribute for page-specific cursor colors
  useEffect(() => {
    // Removed window.scrollTo(0, 0) - let ScrollToTop handle this
    document.body.setAttribute('data-page', 'analytics')
    
    return () => {
      document.body.removeAttribute('data-page')
    }
  }, [])
  
  return (
    <>
      <Dashboard />
    </>
  )
}

export default AnalyticsPage