import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

function ServiceSitePage() {
  // Set a custom data attribute for page-specific cursor colors
  useEffect(() => {
    document.body.setAttribute("data-page", "service-site");

    return () => {
      document.body.removeAttribute("data-page");
    };
  }, []);

  return (
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <Link
            to="/"
            className="btn btn-outline d-inline-flex align-items-center gap-2 mb-5"
          >
            <i className="bi bi-arrow-left"></i> Back to Portfolio
          </Link>

          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="p-0">
              <div
                className="bg-dark text-white position-relative py-5"
                style={{
                  background:
                    "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://via.placeholder.com/1200x600')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="container py-5 text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <h1 className="display-4 mb-4">Dental Clinic Website</h1>
                      <p className="lead mb-4">
                        A modern service website redesign for a dental practice
                      </p>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <span className="badge-custom">HTML</span>
                        <span className="badge-custom">CSS</span>
                        <span className="badge-custom">JavaScript</span>
                        <span className="badge-custom">Bootstrap</span>
                        <span className="badge-custom">User Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body p-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="text-center mb-5">
                    <div
                      className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-4"
                      style={{ background: "rgba(139, 92, 246, 0.1)" }}
                    >
                      <i className="bi bi-tools fs-1 text-primary"></i>
                    </div>
                    <h2 className="h3 mb-4">Project Coming Soon</h2>
                    <p className="lead">
                      I'm currently working on a service site design for a
                      dental clinic as part of my SEG3125 course. This project
                      will demonstrate my skills in creating user-friendly
                      service websites with a focus on appointment booking,
                      service information, and patient education.
                    </p>
                  </div>

                  <div className="border-top pt-5">
                    <h3 className="h5 mb-4">Project Goals</h3>
                    <div className="row g-4 mb-5">
                      <div className="col-md-6">
                        <div className="d-flex">
                          <div className="me-3">
                            <i className="bi bi-check-circle text-primary fs-4"></i>
                          </div>
                          <div>
                            <h4 className="h6 mb-2">
                              Improved User Experience
                            </h4>
                            <p className="small text-muted mb-0">
                              Create an intuitive navigation and information
                              architecture
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex">
                          <div className="me-3">
                            <i className="bi bi-check-circle text-primary fs-4"></i>
                          </div>
                          <div>
                            <h4 className="h6 mb-2">Online Booking System</h4>
                            <p className="small text-muted mb-0">
                              Implement a seamless appointment scheduling
                              feature
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex">
                          <div className="me-3">
                            <i className="bi bi-check-circle text-primary fs-4"></i>
                          </div>
                          <div>
                            <h4 className="h6 mb-2">Service Showcase</h4>
                            <p className="small text-muted mb-0">
                              Highlight dental procedures and treatments
                              effectively
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex">
                          <div className="me-3">
                            <i className="bi bi-check-circle text-primary fs-4"></i>
                          </div>
                          <div>
                            <h4 className="h6 mb-2">Responsive Design</h4>
                            <p className="small text-muted mb-0">
                              Ensure perfect functionality across all devices
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-5">
                      <p className="mb-4">
                        Check back soon to see the completed project!
                      </p>
                      <Link to="/" className="btn btn-gradient">
                        Return to Portfolio
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSitePage;
