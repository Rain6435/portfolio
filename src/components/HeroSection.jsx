function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="container hero-content">
        <div className="row align-items-center">
          <div className="col-lg-7 text-white">
            <h5 className="mb-3 reveal">Hi there! I'm</h5>
            <h1 className="display-3 fw-bold mb-4 reveal reveal-delay-1">Mohammed <span className="text-primary-light">Elhasnaoui</span></h1>
            <p className="lead mb-4 reveal reveal-delay-2">
              Web Application Developer crafting elegant digital experiences with modern technologies.
              Currently building innovative tools at the Office of the Parliamentary Budget Officer.
            </p>
            <div className="d-flex flex-wrap gap-3 reveal reveal-delay-3">
              <a href="#projects" className="btn btn-gradient">View My Work</a>
              <a href="#contact" className="btn btn-outline">Contact Me</a>
            </div>
            
            <div className="mt-5 d-flex gap-4 reveal reveal-delay-3">
              <a href="https://github.com/Rain6435" target="_blank" rel="noreferrer" className="text-white text-decoration-none">
                <i className="bi bi-github me-2"></i>GitHub
              </a>
              <a href="https://www.linkedin.com/in/mohammed-elhasnaoui-43b8a42a0" target="_blank" rel="noreferrer" className="text-white text-decoration-none">
                <i className="bi bi-linkedin me-2"></i>LinkedIn
              </a>
              <a href="mailto:melhas134@gmail.com" className="text-white text-decoration-none">
                <i className="bi bi-envelope me-2"></i>Email
              </a>
            </div>
          </div>
          <div className="col-lg-5 d-none d-lg-block">
            <div className="position-relative">
              <div className="glowing-circle circle-1"></div>
              <div className="glowing-circle circle-2"></div>
              <img 
                src="pfp.png" 
                alt="Mohammed Elhasnaoui" 
                className="img-fluid rounded-4 border border-3 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection