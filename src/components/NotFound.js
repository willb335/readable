import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
    <Link to={"/"} style={{ cursor: "pointer", color: "#337ab7" }}>
      <h4>Home</h4>
    </Link>
  </div>
);

export default NotFound;
