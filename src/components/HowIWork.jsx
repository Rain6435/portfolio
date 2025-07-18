import "./HowIWork.css";

function HowIWork() {
  return (
    <section id="work" className="section-padding">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6 reveal">
            <h2 className="section-title">How I Work</h2>
            <p className="lead">
              My approach combines technical expertise with a focus on user
              experience to create impactful digital solutions.
            </p>
            <p>
              I'm currently enhancing my UI/UX design skills through the SEG3125
              Analysis and Design of User Interfaces course at the University of
              Ottawa. This portfolio is part of my learning journey where I'm
              exploring principles of visual communication and user-centered
              design.
            </p>
            <p className="mb-4">
              I believe that great software is built on a foundation of:
            </p>

            <div className="flex flex-col">
              <div className="mb-4">
                <div className="icon-box">
                  <div className="icon-box-icon">
                    <i className="bi bi-person-check"></i>
                  </div>
                  <div>
                    <h3 className="h6 mb-2">User-Centered Design</h3>
                    <p className="small text-muted mb-0">
                      Putting users' needs at the core of the development
                      process
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="icon-box">
                  <div className="icon-box-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>
                  <div>
                    <h3 className="h6 mb-2">Iterative Development</h3>
                    <p className="small text-muted mb-0">
                      Continuously improving through feedback and testing
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="icon-box">
                  <div className="icon-box-icon">
                    <i className="bi bi-code-square"></i>
                  </div>
                  <div>
                    <h3 className="h6 mb-2">Clean Code</h3>
                    <p className="small text-muted mb-0">
                      Writing readable, scalable, and well-documented code
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="icon-box">
                  <div className="icon-box-icon">
                    <i className="bi bi-speedometer2"></i>
                  </div>
                  <div>
                    <h3 className="h6 mb-2">Performance</h3>
                    <p className="small text-muted mb-0">
                      Ensuring applications are fast, responsive, and efficient
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1 reveal reveal-delay-1">
            <h3 className="h4 mb-4">My Development Process</h3>

            <div className="row">
              <div className="col-12 mb-4">
                <div className="process-card">
                  <div className="process-icon-container">
                    <div className="process-icon">
                      <i className="bi bi-search"></i>
                    </div>
                    <span className="process-step">1</span>
                  </div>
                  <div className="process-content">
                    <h4 className="h5 mb-3">Research & Planning</h4>
                    <p className="mb-0">
                      Every project begins with a thorough understanding of
                      requirements, goals, and target audience. I analyze
                      existing solutions, identify pain points, and create a
                      detailed project roadmap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="process-card">
                  <div className="process-icon-container">
                    <div className="process-icon">
                      <i className="bi bi-pencil-square"></i>
                    </div>
                    <span className="process-step">2</span>
                  </div>
                  <div className="process-content">
                    <h4 className="h5 mb-3">Design & Prototyping</h4>
                    <p className="mb-0">
                      Creating wireframes and visual designs that prioritize
                      user experience. I build interactive prototypes to
                      validate concepts and gather feedback before full-scale
                      development.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-4">
                <div className="process-card">
                  <div className="process-icon-container">
                    <div className="process-icon">
                      <i className="bi bi-code-slash"></i>
                    </div>
                    <span className="process-step">3</span>
                  </div>
                  <div className="process-content">
                    <h4 className="h5 mb-3">Development</h4>
                    <p className="mb-0">
                      Writing clean, modular code following best practices. I
                      leverage modern frameworks and development techniques to
                      create scalable, maintainable applications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="process-card">
                  <div className="process-icon-container">
                    <div className="process-icon">
                      <i className="bi bi-rocket-takeoff"></i>
                    </div>
                    <span className="process-step">4</span>
                  </div>
                  <div className="process-content">
                    <h4 className="h5 mb-3">Testing & Deployment</h4>
                    <p className="mb-0">
                      Rigorous testing across devices and browsers, implementing
                      CI/CD pipelines for smooth deployment, and monitoring
                      performance to ensure optimal user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowIWork;
