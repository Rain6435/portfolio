function Experience() {
  return (
    <section id="experience" className="section-padding bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 reveal">
            <h2 className="section-title">Professional Journey</h2>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-8 reveal">
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot "></div>
                <div className="card mb-4">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 mb-0">Web Applications Developer</h3>
                      <span className="badge-custom">Current</span>
                    </div>
                    <p className="text-primary mb-2">Office of the Parliamentary Budget Officer</p>
                    <p className="text-muted small mb-3">January 2024 - Present | Ottawa, ON</p>
                    <div className="mb-0">
                      <p>Leading development of <strong>Paneloj</strong>, an innovative analysis tool for parliamentary debates using Laravel and LLMs, streamlining legislative analysis workflows.</p>
                      <p>Spearheading migration from WordPress to Livewire, modernizing internal systems while maintaining critical government operations.</p>
                      <p className="mb-0">Enhancing application architecture by upgrading to Vue 3 and implementing TypeScript, improving code maintainability and type safety.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="card mb-4">
                  <div className="card-body p-4">
                    <h3 className="h5 mb-3">Information Technology Intern</h3>
                    <p className="text-primary mb-2">CISSSO</p>
                    <p className="text-muted small mb-3">May 2022 - August 2022 | Gatineau, QC</p>
                    <div className="mb-0">
                      <p>Managed IT support for 1000+ healthcare professionals, resolving hardware and software issues with 95% satisfaction rate.</p>
                      <p>Configured and maintained enterprise infrastructure including SQL Server databases and network systems.</p>
                      <p className="mb-0">Streamlined user management through Active Directory and PowerShell automation.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="card">
                  <div className="card-body p-4">
                    <h3 className="h5 mb-3">Administrative Agent - Team Leader</h3>
                    <p className="text-primary mb-2">CISSSO</p>
                    <p className="text-muted small mb-3">May 2021 - May 2022 | Gatineau, QC</p>
                    <div className="mb-0">
                      <p className="mb-0">Led a team of administrative staff, coordinating workflows and ensuring operational efficiency in a healthcare environment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 reveal reveal-delay-1">
            <div className="sticky-sidebar">
              <div className="card">
                <div className="card-body p-4">
                  <h3 className="h5 mb-4">Education</h3>
                  
                  <div className="mb-4">
                    <h4 className="h6">University of Ottawa</h4>
                    <p className="text-primary mb-1">Computer Engineering Bachelor's Degree</p>
                    <p className="text-muted small">Sep. 2023 - May 2026 (Expected)</p>
                  </div>
                  
                  <div>
                    <h4 className="h6">Collège La Cité</h4>
                    <p className="text-primary mb-1">Computer Engineering Associate's Degree - COOP</p>
                    <p className="text-muted small">Sep. 2020 - Dec. 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience