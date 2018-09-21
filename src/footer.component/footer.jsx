import React, { Component } from "react";
import { ListItem } from "@material-ui/core";

import { foo } from "./style.js";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      link: []
    };
  }

  componentDidMount() {
    this.setState({
      list: ["GitHub", "LinkedIn"],
      link: [
        "https://github.com/Jonathanduboucau",
        "https://www.linkedin.com/in/jonathan-domingues/"
      ],
      img: ["https://cdn1.iconfinder.com/data/icons/logotypes/32/github-512.png","https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-512.png"]
    });
  }

  render() {
    return (
      <div style={foo.container}>
        <div style={foo}>
          {this.state.list.map((list, i) => (
              <ListItem key={i}>
                <a href={this.state.link[i]} style={foo.href} target="_blank">
                  <img src={this.state.img[i]} width={25} /> {list}
                </a>
              </ListItem>
          ))}
        </div>
      </div>
    );
  }
}

export default Footer;
