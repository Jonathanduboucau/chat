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
      ]
    });
  }

  render() {
    return (
      <div
        style={ foo }
      >
        {this.state.list.map((list, i) => (
          <ListItem key={i}>
            <a href={this.state.link[i]} style={ foo.href }>{list}</a>
          </ListItem>
        ))}
      </div>
    );
  }
}

export default Footer;
