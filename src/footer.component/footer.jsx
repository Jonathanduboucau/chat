import React, { Component } from "react";
import { ListItem } from "@material-ui/core";

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
        style={{
          margin: "auto",
          display: "inline-flex",
          float: "right",
          bottom: "0"
        }}
      >
        {this.state.list.map((list, i) => (
          <ListItem key={i}>
            <a href={this.state.link[i]}>{list}</a>
          </ListItem>
        ))}
      </div>
    );
  }
}

export default Footer;
