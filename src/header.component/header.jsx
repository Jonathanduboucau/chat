import React, { Component } from "react";

import { img, app } from "./style.js";

class Header extends Component {
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
        </header>
      </div>
    );
  }
}

export default Header;