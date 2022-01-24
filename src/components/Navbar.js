import React from "react";
import { Nav } from "react-bootstrap";
import "../css/nav.css";
export const Navbar = () => {
  return (
    <Nav activeKey="/home">
      <div className="navMain">
        <div className="left-nav">
                <div className="logo">
                        VOVID
                </div>
        </div>

        <div className="right-nav">
          <Nav.Item>
            <Nav.Link href="/home">Overview statistic</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Clustering</Nav.Link>
          </Nav.Item>
        </div>
      </div>
    </Nav>
  );
};
