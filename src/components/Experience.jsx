import './Experience.css';

function Experience() {
  return (
    <section id="experience" className="section-padding bg-light">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 reveal">
            <h2 className="section-title">Professional Journey</h2>
            <p className="section-subtitle text-center">Building innovative solutions through diverse experiences</p>
          </div>
        </div>
        
        {/* Experience Cards Grid */}
        <div className="experience-grid mb-5">
          <div className="experience-card reveal" data-category="current">
            <div className="experience-header">
              <div className="company-icon">
                <i className="bi bi-building"></i>
              </div>
              <div className="experience-meta">
                <span className="status-badge current">Current Position</span>
                <div className="experience-duration">Jan 2024 - Present</div>
              </div>
            </div>
            <div className="experience-content">
              <h3 className="position-title">Web Applications Developer</h3>
              <h4 className="company-name">Office of the Parliamentary Budget Officer</h4>
              <div className="location">Ottawa, ON</div>
              <div className="responsibilities">
                <div className="highlight-achievement">
                  <i className="bi bi-star-fill"></i>
                  <span>Leading development of <strong>Paneloj</strong> - parliamentary debate analysis tool</span>
                </div>
                <ul className="achievement-list">
                  <li>Modernizing systems from WordPress to Livewire</li>
                  <li>Upgrading to Vue 3 and implementing TypeScript</li>
                  <li>Streamlining legislative analysis workflows with LLMs</li>
                </ul>
              </div>
              <div className="tech-stack">
                <span className="tech-tag">Laravel</span>
                <span className="tech-tag">Vue.js</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Livewire</span>
              </div>
            </div>
          </div>

          <div className="experience-card reveal reveal-delay-1" data-category="internship">
            <div className="experience-header">
              <div className="company-icon">
                <i className="bi bi-hospital"></i>
              </div>
              <div className="experience-meta">
                <span className="status-badge internship">Internship</span>
                <div className="experience-duration">May - Aug 2022</div>
              </div>
            </div>
            <div className="experience-content">
              <h3 className="position-title">Information Technology Intern</h3>
              <h4 className="company-name">CISSSO</h4>
              <div className="location">Gatineau, QC</div>
              <div className="responsibilities">
                <div className="highlight-achievement">
                  <i className="bi bi-graph-up"></i>
                  <span>Supported 1000+ healthcare professionals with 95% satisfaction</span>
                </div>
                <ul className="achievement-list">
                  <li>Managed enterprise IT infrastructure and SQL Server databases</li>
                  <li>Automated user management with Active Directory & PowerShell</li>
                  <li>Resolved critical hardware and software issues</li>
                </ul>
              </div>
              <div className="tech-stack">
                <span className="tech-tag">SQL Server</span>
                <span className="tech-tag">Active Directory</span>
                <span className="tech-tag">PowerShell</span>
              </div>
            </div>
          </div>

          <div className="experience-card reveal reveal-delay-2" data-category="leadership">
            <div className="experience-header">
              <div className="company-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="experience-meta">
                <span className="status-badge leadership">Leadership</span>
                <div className="experience-duration">May 2021 - May 2022</div>
              </div>
            </div>
            <div className="experience-content">
              <h3 className="position-title">Administrative Agent - Team Leader</h3>
              <h4 className="company-name">CISSSO</h4>
              <div className="location">Gatineau, QC</div>
              <div className="responsibilities">
                <div className="highlight-achievement">
                  <i className="bi bi-award"></i>
                  <span>Led administrative team in healthcare environment</span>
                </div>
                <ul className="achievement-list">
                  <li>Coordinated workflows and ensured operational efficiency</li>
                  <li>Managed team resources and performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="row">
          <div className="col-12">
            <div className="education-section reveal reveal-delay-3">
              <h3 className="education-title">Education & Certifications</h3>
              <div className="education-grid">
                <div className="education-card current-education">
                  <div className="education-icon">
                    <i className="bi bi-mortarboard-fill"></i>
                  </div>
                  <div className="education-info">
                    <h4 className="degree-title">Computer Engineering Bachelor's</h4>
                    <div className="university-name">University of Ottawa</div>
                    <div className="education-period">Sep 2023 - May 2026 (Expected)</div>
                    <span className="education-status">In Progress</span>
                  </div>
                </div>
                
                <div className="education-card completed-education">
                  <div className="education-icon">
                    <i className="bi bi-mortarboard"></i>
                  </div>
                  <div className="education-info">
                    <h4 className="degree-title">Computer Engineering Associate's - COOP</h4>
                    <div className="university-name">Collège La Cité</div>
                    <div className="education-period">Sep 2020 - Dec 2023</div>
                    <span className="education-status">Completed</span>
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