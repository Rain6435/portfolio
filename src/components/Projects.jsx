function Projects() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 fade-in">
            <h2 className="section-title">Featured Project</h2>
            <h3 className="mb-3">Schedulo</h3>
            <p>
              Full-stack academic scheduling platform using Laravel,
              React/TypeScript, Inertia.js, and Tailwind CSS. Features real-time
              conflict detection, multi-language support, and integration with
              RateMyProfessor API.
            </p>
            <div className="mb-4">
              <span className="skill-tag">Laravel</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">Inertia.js</span>
              <span className="skill-tag">Tailwind CSS</span>
            </div>
            <a
              href="https://www.schedulo.pro/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary me-2"
            >
              View Project
            </a>
          </div>
          <img
            src="https://via.placeholder.com/800x500"
            alt="Schedulo Project"
            className="img-fluid rounded-full shadow"
          />
        </div>
      </div>
    </section>
  );
}

export default Projects;
