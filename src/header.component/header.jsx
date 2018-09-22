import React, { Component } from "react";
import { slide as MyMenu } from "react-burger-menu";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./menu.css";
import { app } from "./style.js";
import burger from "../img/burger.svg";
import chat from "../img/chat.svg";

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
        <img src={chat} width={40} /><a href="/" style={app.a}>Chat.Ex</a>
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
