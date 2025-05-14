function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center reveal">
            <h2 className="section-title mx-auto">Let's Connect</h2>
            <p className="lead mb-0">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4 reveal">
            <div className="card h-100">
              <div className="card-body p-4 text-center">
                <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))'
                  }}>
                  <i className="bi bi-envelope-fill text-white fs-3"></i>
                </div>
                <h3 className="h5 mb-3">Email Me</h3>
                <p className="mb-3">Feel free to reach out via email anytime</p>
                <a href="mailto:melhas134@gmail.com" className="btn btn-outline">melhas134@gmail.com</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4 reveal reveal-delay-1">
            <div className="card h-100">
              <div className="card-body p-4 text-center">
                <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))'
                  }}>
                  <i className="bi bi-telephone-fill text-white fs-3"></i>
                </div>
                <h3 className="h5 mb-3">Call Me</h3>
                <p className="mb-3">Available weekdays from 9am to 5pm EST</p>
                <a href="tel:8193195572" className="btn btn-outline">(819) 319-5572</a>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 mb-4 reveal reveal-delay-2">
            <div className="card h-100">
              <div className="card-body p-4 text-center">
                <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, var(--primary-light), var(--primary-dark))'
                  }}>
                  <i className="bi bi-geo-alt-fill text-white fs-3"></i>
                </div>
                <h3 className="h5 mb-3">Location</h3>
                <p className="mb-3">Based in the Ottawa-Gatineau region</p>
                <span className="btn btn-outline">Gatineau, Quebec</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-lg-8 mx-auto text-center reveal">
            <h3 className="h4 mb-4">Let's Work Together</h3>
            <p className="mb-4">
              Whether you're looking to build a new web application, need help with an existing project, 
              or just want to discuss tech, I'm always open to new opportunities and collaborations.
            </p>
            <a href="mailto:melhas134@gmail.com" className="btn btn-gradient btn-lg">
              Start a Conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact