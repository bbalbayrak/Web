// import React from "react";
// import "./Menu.css";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

// const Menu = ({ open, setOpen }) => {
//   return (
//     <>
//       <div
//         className={`hamburger-icon ${open ? "" : "open"}`}
//         onClick={() => setOpen(!open)}
//       >
//         <FontAwesomeIcon icon={faBars} />
//       </div>
//       <ul className={`menu ${open ? "open" : ""}`}>
//         <Link className="link" to="/">
//           Home
//         </Link>
//         <Link className="link" to="/vendors">
//           Vendors
//         </Link>
//         <Link className="link" to="/customers">
//           Customers
//         </Link>
//         <Link className="link" to="/login">
//           Login
//         </Link>
//         <Link className="link" to="/register">
//           Sign Up
//         </Link>
//       </ul>
//     </>
//   );
// };

// export default Menu;
