import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

function EcommercePage() {
  // Set a custom data attribute for page-specific cursor colors
  useEffect(() => {
    document.body.setAttribute("data-page", "ecommerce");

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
                      <h1 className="display-4 mb-4">E-Commerce Platform</h1>
                      <p className="lead mb-4">
                        A modern shopping experience with seamless user flow
                      </p>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">
                        <span className="badge-custom">React</span>
                        <span className="badge-custom">Bootstrap</span>
                        <span className="badge-custom">E-Commerce UX</span>
                        <span className="badge-custom">Responsive Design</span>
                        <span className="badge-custom">
                          Shopping Experience
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
                      <i className="bi bi-cart3 fs-1 text-primary"></i>
                    </div>
                    <h2 className="h3 mb-4">Project Coming Soon</h2>
                    <p className="lead">
                      I'm currently designing an e-commerce platform as part of
                      my SEG3125 course. This project will showcase my ability
                      to create intuitive shopping experiences with a focus on
                      user flow and conversion optimization.
                    </p>
                  </div>

                  <div className="border-top pt-5">
                    <h3 className="h5 mb-4">Project Overview</h3>
                    <p>
                      The e-commerce site will feature a clean, modern design
                      with a focus on product discovery, easy checkout, and
                      responsive layout. It will include product filtering,
                      search functionality, cart management, and a streamlined
                      checkout process.
                    </p>

                    <div className="row mt-5">
                      <div className="col-12">
                        <h4 className="h5 mb-4">Key Features</h4>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="d-flex">
                          <div className="me-3 text-primary">
                            <i className="bi bi-search fs-4"></i>
                          </div>
                          <div>
                            <h5 className="h6 mb-2">
                              Advanced Product Search & Filtering
                            </h5>
                            <p className="small text-muted mb-0">
                              Help users quickly find what they're looking for
                              with intuitive filtering options
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="d-flex">
                          <div className="me-3 text-primary">
                            <i className="bi bi-phone fs-4"></i>
                          </div>
                          <div>
                            <h5 className="h6 mb-2">
                              Responsive Mobile Experience
                            </h5>
                            <p className="small text-muted mb-0">
                              Optimized for all devices with touch-friendly
                              interfaces
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="d-flex">
                          <div className="me-3 text-primary">
                            <i className="bi bi-credit-card fs-4"></i>
                          </div>
                          <div>
                            <h5 className="h6 mb-2">Streamlined Checkout</h5>
                            <p className="small text-muted mb-0">
                              Frictionless payment process with minimal steps
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="d-flex">
                          <div className="me-3 text-primary">
                            <i className="bi bi-cart-check fs-4"></i>
                          </div>
                          <div>
                            <h5 className="h6 mb-2">
                              Cart & Wishlist Management
                            </h5>
                            <p className="small text-muted mb-0">
                              Easy-to-use cart functionality with saved items
                              for later
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-5 p-4 rounded-3"
                      style={{ background: "rgba(139, 92, 246, 0.05)" }}
                    >
                      <h4 className="h5 mb-3">Design Approach</h4>
                      <p className="mb-0">
                        The e-commerce platform will be built using React for
                        the frontend with Bootstrap for responsive layouts. The
                        design will focus on minimizing friction in the buying
                        process while creating an engaging shopping experience.
                        Special attention will be paid to product photography,
                        descriptions, and reviews to help users make informed
                        purchasing decisions.
                      </p>
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

export default EcommercePage;
