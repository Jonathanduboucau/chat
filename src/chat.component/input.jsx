import React, { Component } from "react";
import { TextField, ListItemText } from "@material-ui/core";

import { app } from "./style.js";

class InputTextComponent extends Component {
  render() {
    return (
      <div style={app.input}>
        <TextField
          style={app.pseudo}
          label="Pseudo"
          placeholder="Entre ton pseudo"
          onChange={this.props.pseudo}
        />
        <TextField
          style={app.chat}
          required
          autoFocus={true}
          placeholder="Entre ton message ici ..."
          onChange={this.props.textChar}
          value={this.props.textR}
          onKeyPress={this.onSubmit}
        />
      </div>
    );
  }
}

export default InputTextComponent;