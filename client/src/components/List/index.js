// import React dependencies
import React from "react";
// Import local style.css files
import "./style.css";

// This component exports both the List and ListItem components
export const List = ({ children }) => (
  <ul className="list-group">
    {children}
  </ul>
);
// This exports a function called ListItem which list the results of the user's book search.
export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}
