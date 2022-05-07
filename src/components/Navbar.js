import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../css/nav.css";
export const Navbar = () => {

var activePage = window.location.pathname

useEffect(() => {

}, [activePage])


  return (
    <Nav activeKey="/home">
      <div className="navMain">
        <div className="left-nav">
                <div className="logo">
                        VOVID
                </div>
        </div>

        <div className="right-nav">
      
            <NavLink
             to="/"
             className={({isActive}) => (isActive ? "active" : "default")}

             >Overview statistic</NavLink>
   
            <NavLink  to="/Cluster"
           className={({isActive}) => (isActive ? "active" : "default")}
            
            >Clustering</NavLink>
      
        </div>
      </div>
    </Nav>
  );
};
