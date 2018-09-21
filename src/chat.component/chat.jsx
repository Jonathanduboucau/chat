import React, { Component } from "react";
import { TextField, ListItemText } from "@material-ui/core";
import firebase from "../db.component/firebase.jsx";

import "./chat.css";
import { app, input } from "./style.js";

class Chat extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.el.scrollHeight;
    const height = this.el.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.el.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  writeMessageToDB = message => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message,
        pseudo: this.props.pseudoR,
        time: new Date(Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      });
  };

  renderMessages = () => {
    return this.props.message.map(message => (
      <ListItemText key={message.id} style={{ lineHeight: "5px" }}>
        <div className="textMessages" style={{ display: "block" }}>
          <i style={{ color: "grey" }}>{message.time} </i>
        </div>
        <b>{message.pseudo}</b> a dit :
        <span title={message.pseudo}> {message.text}</span>
        <hr />
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
    } else {
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
      <div style={{ margin: "auto" }}>
        <div
          style={app.container}
          className="container"
          ref={el => {
            this.el = el;
          }}
        >
          {this.renderMessages()}
        </div>
        <div style={app.input}>
          <TextField
            className="textFieldPseudo"
            style={input.pseudo}
            label="Pseudo"
            placeholder="Entre ton pseudo"
            onChange={this.props.pseudo}
          />
          <TextField
            style={input.text}
            required
            autoFocus={true}
            placeholder="Entre ton message ici ..."
            onChange={this.props.textChar}
            value={this.props.textR}
            onKeyPress={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
