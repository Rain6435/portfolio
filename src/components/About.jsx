import './About.css';

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
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/laravel-2.svg"
                        alt="Laravel"
                        className="tech-icon me-1"
                      />
                      PHP/Laravel
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/python-5.svg"
                        alt="Python"
                        className="tech-icon me-1"
                      />
                      Python/Flask
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                        alt="React"
                        className="tech-icon me-1"
                      />
                      TypeScript/React
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/vue-9.svg"
                        alt="Vue.js"
                        className="tech-icon me-1"
                      />
                      Vue.js
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Cloud & DevOps
                  </h4>
                  <div>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/aws-2.svg"
                        alt="AWS"
                        className="tech-icon me-1"
                      />
                      AWS (EC2, RDS, S3)
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/docker.svg"
                        alt="Docker"
                        className="tech-icon me-1"
                      />
                      Docker
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/gitlab-3.svg"
                        alt="CI/CD"
                        className="tech-icon me-1"
                      />
                      CI/CD
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Web Technologies
                  </h4>
                  <div>
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
                        src="https://laravel-livewire.com/img/twitter.png"
                        alt="Livewire"
                        className="tech-icon me-1"
                      />
                      Livewire
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/webpack-icon.svg"
                        alt="Webpack"
                        className="tech-icon me-1"
                      />
                      Webpack/Babel
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="h6 text-uppercase text-muted mb-3">
                    Tools & Databases
                  </h4>
                  <div>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/wordpress-icon-1.svg"
                        alt="WordPress"
                        className="tech-icon me-1"
                      />
                      WordPress
                    </span>
                    <span className="skill-badge">
                      <img
                        src="https://cdn.worldvectorlogo.com/logos/microsoft-5.svg"
                        alt="Active Directory"
                        className="tech-icon me-1"
                      />
                      Active Directory
                    </span>
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