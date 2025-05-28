import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

function AnalyticsPage() {
  useEffect(() => {
    document.body.setAttribute("data-page", "analytics");

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
                      <h1 className="display-4 mb-4">Analytics Dashboard</h1>
                      <p className="lead mb-4">
                        Data visualization platform for meaningful insights
                      </p>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <span className="badge-custom">Data Visualization</span>
                        <span className="badge-custom">React</span>
                        <span className="badge-custom">Chart.js</span>
                        <span className="badge-custom">Dashboard Design</span>
                        <span className="badge-custom">
                          Information Architecture
                        </span>
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
                      <i className="bi bi-graph-up fs-1 text-primary"></i>
                    </div>
                    <h2 className="h3 mb-4">Project Coming Soon</h2>
                    <p className="lead">
                      I'm currently designing a data visualization dashboard as
                      part of my SEG3125 course. This project will demonstrate
                      my ability to transform complex data into clear,
                      actionable insights through intuitive interface design.
                    </p>
                  </div>

                  <div className="border-top pt-5">
                    <h3 className="h5 mb-4">Dashboard Concept</h3>
                    <p>
                      The analytics dashboard will provide meaningful insights
                      from complex datasets, with a focus on clear data
                      visualization and interactive filtering. Users will be
                      able to customize views, export reports, and identify
                      trends through an intuitive interface.
                    </p>

                    <div className="row g-4 my-5">
                      <div className="col-md-6">
                        <div className="card h-100 bg-light border-0">
                          <div className="card-body p-4">
                            <h4 className="h6 mb-3">Interactive Charts</h4>
                            <p className="small mb-3">
                              Dynamic visualizations that respond to user
                              interaction, allowing for deeper exploration of
                              data patterns.
                            </p>
                            <div className="text-center py-3">
                              <i className="bi bi-bar-chart-line fs-1 text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card h-100 bg-light border-0">
                          <div className="card-body p-4">
                            <h4 className="h6 mb-3">Customizable Filters</h4>
                            <p className="small mb-3">
                              Advanced filtering options that allow users to
                              segment data based on various parameters.
                            </p>
                            <div className="text-center py-3">
                              <i className="bi bi-funnel fs-1 text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card h-100 bg-light border-0">
                          <div className="card-body p-4">
                            <h4 className="h6 mb-3">Real-time Updates</h4>
                            <p className="small mb-3">
                              Live data streaming capabilities for monitoring
                              metrics as they change in real-time.
                            </p>
                            <div className="text-center py-3">
                              <i className="bi bi-activity fs-1 text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card h-100 bg-light border-0">
                          <div className="card-body p-4">
                            <h4 className="h6 mb-3">Export & Reporting</h4>
                            <p className="small mb-3">
                              Functionality to save, export, and schedule
                              reports in various formats.
                            </p>
                            <div className="text-center py-3">
                              <i className="bi bi-file-earmark-text fs-1 text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-light p-4 rounded-3 mb-5">
                      <h4 className="h5 mb-3">Technical Stack</h4>
                      <p className="mb-4">The dashboard will be built using:</p>
                      <div className="d-flex flex-wrap gap-3">
                        <span className="skill-badge">React</span>
                        <span className="skill-badge">Chart.js/D3.js</span>
                        <span className="skill-badge">Bootstrap</span>
                        <span className="skill-badge">API Integration</span>
                        <span className="skill-badge">Responsive Design</span>
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

export default AnalyticsPage;
