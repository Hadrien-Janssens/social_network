import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="navigation text-blue-500 font-semibold p-3 border-b  m-auto flex justify-between mb-10 bg-white">
        <p>Social Network</p>
        <ul className="flex justify-end ">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : " ")}
          >
            <li className="px-5 rounded duration-300 hover:bg-slate-100 duration-300">
              <i className="fa-solid fa-house"></i>
            </li>
          </NavLink>
          <NavLink
            to="/profil"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="px-5 rounded duration-300 hover:bg-slate-100 duration-300">
              <i className="fa-solid fa-user"></i>
            </li>
          </NavLink>
          <NavLink
            to="/Setting"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="px-5 rounded duration-300 hover:bg-slate-100 ">
              <i className="fa-solid fa-gear"></i>
            </li>
          </NavLink>
        </ul>
        <i className="fa-solid fa-arrow-right-from-bracket text-slate-400 duration-200 hover:text-blue-500 duration-300"></i>
      </div>
    </>
  );
};

export default Navigation;
