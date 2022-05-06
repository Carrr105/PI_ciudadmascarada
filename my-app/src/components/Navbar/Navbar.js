import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
    state = {clicked: false}
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render(){
      return(
        <nav  className="navbar navbar-expand-lg bg-dark">
          <div className="menu-icon" onClick={this.handleClick}>
              <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
          <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
            {MenuItems.map((item,index)=> {
              return (
                <li className = "btn btn-outline-success ">
                  <a href={item.url} style={{color: "white"}}>
                    {item.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )
    }
  }

export default Navbar;
