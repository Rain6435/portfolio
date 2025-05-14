function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6 reveal">
            <h2 className="section-title">About Me</h2>
            <p className="lead">
              I'm a passionate Web Application Developer with expertise in
              building modern, user-focused digital experiences.
            </p>
            <p>
              Currently working at the Office of the Parliamentary Budget
              Officer in Ottawa, I specialize in developing innovative solutions
              using cutting-edge technologies. With a background in Computer
              Engineering from the University of Ottawa and Collège La Cité, I
              combine technical expertise with a strong understanding of user
              experience principles.
            </p>
            <p>
              Based in Gatineau, Quebec, I thrive on solving complex problems
              and creating applications that make a meaningful impact. When I'm
              not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or experimenting with AI and
              machine learning applications.
            </p>
          </div>
          <div className="col-lg-5 offset-lg-1 reveal reveal-delay-1">
            <div className="border-gradient h-100">
              <div className="border-gradient-content p-4">
                <h3 className="h4 mb-4">Technical Skills</h3>

                <div className="mb-4">
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Languages & Frameworks
                  </h4>
                  <div>
                    <span className="skill-badge">PHP/Laravel</span>
                    <span className="skill-badge">Python/Flask</span>
                    <span className="skill-badge">TypeScript/React</span>
                    <span className="skill-badge">Vue.js</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Cloud & DevOps
                  </h4>
                  <div>
                    <span className="skill-badge">AWS (EC2, RDS, S3)</span>
                    <span className="skill-badge">Docker</span>
                    <span className="skill-badge">Proxmox</span>
                    <span className="skill-badge">CI/CD</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Web Technologies
                  </h4>
                  <div>
                    <span className="skill-badge">Inertia.js</span>
                    <span className="skill-badge">Livewire</span>
                    <span className="skill-badge">Webpack/Babel</span>
                    <span className="skill-badge">SSR</span>
                  </div>
                </div>

                <div>
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Tools & Databases
                  </h4>
                  <div>
                    <span className="skill-badge">Wordpress</span>
                    <span className="skill-badge">MySQL/SQLite/T-SQL</span>
                    <span className="skill-badge">Active Directory</span>
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

export default About;
