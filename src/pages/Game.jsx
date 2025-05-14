import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

function GamePage() {
  // Set a custom data attribute for page-specific cursor colors
  useEffect(() => {
    document.body.setAttribute("data-page", "game");

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
                      <h1 className="display-4 mb-4">Interactive Web Game</h1>
                      <p className="lead mb-4">
                        An engaging browser-based gaming experience
                      </p>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <span className="badge-custom">JavaScript</span>
                        <span className="badge-custom">Canvas</span>
                        <span className="badge-custom">Game Design</span>
                        <span className="badge-custom">User Experience</span>
                        <span className="badge-custom">Interaction Design</span>
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
                      <i className="bi bi-controller fs-1 text-primary"></i>
                    </div>
                    <h2 className="h3 mb-4">Project Coming Soon</h2>
                    <p className="lead">
                      I'm currently developing an interactive web game as part
                      of my SEG3125 course. This project will showcase my skills
                      in creating engaging user experiences with JavaScript and
                      canvas animations.
                    </p>
                  </div>

                  <div className="border-top pt-5">
                    <h3 className="h5 mb-4">Game Concept</h3>
                    <p>
                      The game will be a browser-based interactive experience
                      that combines puzzle-solving elements with quick reflexes.
                      Players will navigate through challenging levels while
                      collecting points and avoiding obstacles.
                    </p>

                    <div className="row g-4 my-5">
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-joystick text-white"></i>
                              </div>
                              <h4 className="h6 mb-0">Intuitive Controls</h4>
                            </div>
                            <p className="small text-muted mb-0">
                              Simple keyboard/mouse controls that are easy to
                              learn but difficult to master
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-layers text-white"></i>
                              </div>
                              <h4 className="h6 mb-0">Progressive Challenge</h4>
                            </div>
                            <p className="small text-muted mb-0">
                              Gradually increasing difficulty with new game
                              mechanics introduced in each level
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-trophy text-white"></i>
                              </div>
                              <h4 className="h6 mb-0">Scoring System</h4>
                            </div>
                            <p className="small text-muted mb-0">
                              Points-based achievements with local leaderboard
                              tracking
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div
                                className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}
                              >
                                <i className="bi bi-palette text-white"></i>
                              </div>
                              <h4 className="h6 mb-0">Visual Appeal</h4>
                            </div>
                            <p className="small text-muted mb-0">
                              Modern, engaging graphics with satisfying
                              animations and feedback
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-5">
                      <p className="mb-4">Check back soon to play the game!</p>
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

export default GamePage;
