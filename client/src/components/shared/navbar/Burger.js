import React, { useState } from "react";
import Menu from "./Menu";
import "./Burger.css";

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`burger-menu ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
      </div>
      <Menu open={open} />
    </>
  );
};

export default Burger;
