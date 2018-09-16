import React, { Component, Children } from "react";
import { TextField, ListItemText } from "@material-ui/core";
import firebase, { Config } from "./db.component/firebase.jsx";

import "./style/app.css";

const app = {
  spanH1: {
    fontSize: "2.5em",
    fontFamily: "Arial, sans-serif",
    textShadow: "0 0 2px white",
    fontWeight: "bold",
    margin: "0",
    padding: "10px 0"
  },
  span: {
    display: "inline",
    marginLeft: "5px"
  },
  positionHeader: {
    textAlign: "left",
    paddingLeft: "10px",
    backgroundColor: "rgba(0,0,0,0.5)",
    boxShadow: "0 0 15px black"
  },
  positionTextField: {
    marginBottom: "0"
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pseudo: "",
      text: "",
      messages: []
    };
  }

  componentDidMount() {
    <Config />;
    this.getMessages();
  }

  onSubmit = event => {
    if (
      event.charCode === 13 &&
      this.state.text.trim() !== "" &&
      this.state.pseudo !== "" &&
      this.state.pseudo.length >= 3
    ) {
      this.writeMessageToDB(this.state.text);
      this.setState({ text: "", pseudo: this.state.pseudo });
    } else {
      if (
        this.state.pseudo.length >= 3 &&
        this.state.text === "" &&
        event.charCode === 13
      ) {
        alert(
          "Attention ! Tu ne peux pas envoyer de message vide. Quel est l'intérêt ?!"
        );
        return event;
      }
      if (
        this.state.text.length >= 3 &&
        this.state.pseudo.length <= 0 &&
        event.charCode === 13
      ) {
        alert(
          "Attention ! Tu ne peux pas envoyer de message sans pseudo, sinon ça serait de la triche ! ;)"
        );
        this.setState({ text: this.state.text });
      }
      if (
        this.state.text.length === 0 &&
        this.state.pseudo.length === 0 &&
        event.charCode === 13
      ) {
        alert(
          "Attention ! Tu ne peux pas envoyer de message sans pseudo ainsi qu'avec un message vide. Quel est l'intérêt ?!"
        );
        return event;
      }
    }
  };

  writeMessageToDB = message => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message,
        pseudo: this.state.pseudo
      });
  };

  getMessages = () => {
    let messagesDB = firebase.database().ref(`messages/`);
    messagesDB.on("value", snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        let message = child.val();
        newMessages.push({
          id: child.key,
          text: message.text,
          pseudo: message.pseudo
        });
      });
      this.setState({ messages: newMessages, loading: false });
    });
  };

  renderMessages = () => {
    return this.state.messages.map(message => (
      <ListItemText key={message.id} style={{ lineHeight: "5px" }}>
        <div className="textMessages" style={{ fontWeight: "bold" }}>
          {message.pseudo} a dit :
        </div>
        <i>{message.text}</i>
      </ListItemText>
    ));
  };

  render() {
    return (
      <div className="App">
        <header style={app.positionHeader} className="App-header">
          <span style={app.spanH1}>Chat Living Room</span>
          <span style={app.span}>
            Made with
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/2000px-A_perfect_SVG_heart.svg.png"
              alt="heart"
              style={{ width: "15px" }}
            />
            by Jonathanduboucau
          </span>
          <div>
            <TextField
              placeholder="Pseudonyme"
              onChange={event => this.setState({ pseudo: event.target.value })}
            />
          </div>
        </header>
        <div style={app.container}>{this.renderMessages()}</div>
        <TextField
          autoFocus={true}
          multiline={false}
          fullWidth
          rowsMax={3}
          placeholder="Message ..."
          onChange={event => this.setState({ text: event.target.value })}
          value={this.state.text}
          onKeyPress={this.onSubmit}
        />
      </div>
    );
  }
}

export default App;
