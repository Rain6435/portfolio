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
              <span className="skill-badge">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/laravel-2.svg"
                  alt="Laravel"
                  className="tech-icon me-1"
                />
                Laravel
              </span>
              <span className="skill-badge">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                  alt="React"
                  className="tech-icon me-1"
                />
                React
              </span>
              <span className="skill-badge">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
                  alt="TypeScript"
                  className="tech-icon me-1"
                />
                TypeScript
              </span>
              <span className="skill-badge">
                <img
                  src="https://avatars.githubusercontent.com/u/47703742?s=200&v=4"
                  alt="Inertia.js"
                  className="tech-icon me-1"
                />
                Inertia.js
              </span>
              <span className="skill-badge">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg"
                  alt="Tailwind CSS"
                  className="tech-icon me-1"
                />
                Tailwind CSS
              </span>
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
            src={`${import.meta.env.BASE_URL}Logo(2).png`}
            alt="Schedulo Project"
            className="img-fluid rounded-full shadow"
          />
        </div>
      </div>
    </section>
  );
}

export default Projects;
