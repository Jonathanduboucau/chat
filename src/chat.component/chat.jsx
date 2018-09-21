import React, { Component } from "react";
import { TextField, ListItemText } from "@material-ui/core";
import firebase from "../db.component/firebase.jsx";

import { app } from "./style.js";

class Chat extends Component {

  writeMessageToDB = message => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message,
        pseudo: this.props.pseudoR,
        time: new Date(Date.now()).toLocaleString()
      });
  };

  renderMessages = () => {
    return this.props.message.map(message => (
      <ListItemText key={message.id} style={{ lineHeight: "5px" }}>
        <div className="textMessages">
          <i style={{ color: "grey" }}>{message.time} </i>
          <b>{message.pseudo}</b> a dit :
        </div>
        <span> {message.text}</span>
      </ListItemText>
    ));
  };

  onSubmit = event => {
    if (
      event.charCode === 13 &&
      this.props.textR.trim() !== "" &&
      this.props.pseudoR !== "" &&
      this.props.pseudoR.length >= 3
    ) {
      this.writeMessageToDB(this.props.textR);
      this.props.clearText(this.props.clearText);
    } 
    else {
      if (
        this.props.pseudoR.length >= 3 &&
        this.props.textR === "" &&
        event.charCode === 13
      ) {
        alert(
          "Attention ! Tu ne peux pas envoyer de message vide. Quel est l'intérêt ?!"
        );
        return event;
      }
      if (
        this.props.textR.length >= 3 &&
        this.props.pseudoR.length <= 0 &&
        event.charCode === 13
      ) {
        alert(
          "Attention ! Tu ne peux pas envoyer de message sans pseudo, sinon ça serait de la triche ! ;)"
        );
        // this.setState({ text: this.props.text });
      }
      if (
        this.props.textR.length === 0 &&
        this.props.pseudoR.length === 0 &&
        event.charCode === 13
      ) {
        alert(
          "Attention ! Tu ne peux pas envoyer de message sans pseudo ainsi qu'avec un message vide. Quel est l'intérêt ?!"
        );
        return event;
      }
    }
  };

  render() {
    return (
      <div>
        <div style={app.pseudo}>
          <TextField
            label="Pseudo"
            placeholder="Entre ton pseudo"
            onChange={this.props.pseudo}
          />
        </div>
        <div style={app.container} className="container">
          {this.renderMessages()}
        </div>
        <TextField
          autoFocus={true}
          placeholder="Message ..."
          onChange={this.props.textChar}
          value={this.props.textR}
          onKeyPress={this.onSubmit}
        />
      </div>
    );
  }
}

export default Chat;
