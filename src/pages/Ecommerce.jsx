import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import EcommercePage from "./Ecommerce/EcommercePage";

function EcommerceWrapper() {
  // Set a custom data attribute for page-specific cursor colors
  useEffect(() => {
    document.body.setAttribute("data-page", "ecommerce");

    return () => {
      document.body.removeAttribute("data-page");
    };
  }, []);

  return (
    <div className="ecommerce-wrapper">
      <EcommercePage />
    </div>
  );
}

export default EcommerceWrapper;
