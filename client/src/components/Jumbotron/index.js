// import React dependencies
import React from "react";
// import local style.css files
import "./style.css";

// Create a function called Jumbotron
function Jumbotron({ children }) {
  return <div className="jumbotron mt-4">{children}</div>;
}

// Exporting a file to be used elsewhere in the application
export default Jumbotron;
