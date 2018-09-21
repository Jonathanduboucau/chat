import React, { Component } from "react";
import { slide as MyMenu } from "react-burger-menu";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./menu.css";
import { img, app } from "./style.js";
import burger from "../img/burger.svg";

class Header extends Component {
  state = {
    menuOpen: false
  };

  handleClick = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    return (
      <div>
        <header style={app.positionHeader} className="App-header">
          <span style={app.spanH1}>Chat Living Room</span>
          <span style={app.span}>
            Made with
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/2000px-A_perfect_SVG_heart.svg.png"
              alt="heart"
              style={img}
            />
            by Jonathanduboucau
          </span>
          <MyMenu
            right
            className="menu"
            isOpen={this.state.menuOpen}
            customBurgerIcon={<img src={burger} alt="menu-burger-svg" />}
          >
            <Link to="/" onClick={this.handleClick}>
              Chat
            </Link>
            <Link to="/sign" onClick={this.handleClick}>
              Connexion
            </Link>
          </MyMenu>
        </header>
      </div>
    );
  }
}

export default Header;
