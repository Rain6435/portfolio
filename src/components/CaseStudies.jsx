import { Link } from "@tanstack/react-router";

function CaseStudies() {
  return (
    <section id="projects" className="section-padding bg-light ">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 reveal">
            <h2 className="section-title">Case Studies</h2>
            <p className="lead">
              Explore my upcoming design projects for the SEG3125 course.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4 reveal">
            <div className="project-card">
              <img src="soon-svg.svg" alt="Service Site" />
              <div className="project-content">
                <h3 className="h5 mb-2">Service Website</h3>
                <p className="small mb-3">Dental Clinic Redesign</p>
                <Link
                  to="/projects/service-site"
                  className="btn btn-sm btn-gradient"
                >
                  View Project <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-4 reveal reveal-delay-1">
            <div className="project-card">
              <img src="soon-svg.svg" alt="Interactive Game" />
              <div className="project-content">
                <h3 className="h5 mb-2">Interactive Game</h3>
                <p className="small mb-3">Web-Based Experience</p>
                <Link to="/projects/game" className="btn btn-sm btn-gradient">
                  View Project <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-4 reveal reveal-delay-2">
            <div className="project-card">
              <img src="soon-svg.svg" alt="E-Commerce Platform" />
              <div className="project-content">
                <h3 className="h5 mb-2">E-Commerce</h3>
                <p className="small mb-3">Shopping Experience</p>
                <Link
                  to="/projects/ecommerce"
                  className="btn btn-sm btn-gradient"
                >
                  View Project <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 mb-4 reveal reveal-delay-3">
            <div className="project-card">
              <img src="soon-svg.svg" alt="Analytics Dashboard" />
              <div className="project-content">
                <h3 className="h5 mb-2">Analytics Dashboard</h3>
                <p className="small mb-3">Data Visualization</p>
                <Link
                  to="/projects/analytics"
                  className="btn btn-sm btn-gradient"
                >
                  View Project <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Project */}
        <div className="row mt-5">
          <div className="col-12 reveal">
            <h3 className="h4 mb-4">Featured Project</h3>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-6 reveal">
            <div className="card border-0 h-100">
              <div className="card-body p-4">
                <h3 className="h4 mb-3">Schedulo</h3>
                <p className="mb-4">
                  A full-stack academic scheduling platform built with Laravel,
                  React/TypeScript, Inertia.js, and Tailwind CSS. The
                  application features real-time conflict detection,
                  multi-language support, and integration with RateMyProfessor
                  API.
                </p>

                <div className="mb-4">
                  <span className="skill-badge">Laravel</span>
                  <span className="skill-badge">React</span>
                  <span className="skill-badge">TypeScript</span>
                  <span className="skill-badge">Inertia.js</span>
                  <span className="skill-badge">Tailwind CSS</span>
                </div>

                <div className="d-flex gap-3">
                  <a
                    href="https://www.schedulo.pro/"
                    className="btn btn-gradient"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-4 mt-lg-0 reveal reveal-delay-1 d-flex flex-column align-items-center">
            <img
              src="Logo(1).png"
              alt="Schedulo Project"
              className="img-fluid rounded-4 shadow"
            />
            <h1 className="my-2 text-center">Plan your academic journey!</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
