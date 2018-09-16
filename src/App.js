import React, { Component } from "react";
import { TextField, ListItemText, List } from "@material-ui/core";
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
    marginBottom: "0",
    lineHeigth: "1px"
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
      this.state.pseudo !== "" && this.state.pseudo.length >= 3
    ) {
      this.writeMessageToDB(this.state.text);
      this.setState({ text: "", pseudo: this.state.pseudo });
    } else {
      if(this.state.pseudo === 1 && this.state.message.length <= 0 && event.charCode === 13) {
        alert('Attention ! Tu ne peux pas envoyer de message vide. Quel est l\'intérêt ?!');
        console.log(this.state.pseudo)
      }
      if(this.state.pseudo !== 1 && event.charCode === 13) {
        alert('Attention ! Tu ne peux pas envoyer de message sans avoir défini de pseudo. Sinon, ça serait de la triche ! ;)');
        return event;
      }
      if(this.state.message !== 1 && event.charCode === 13) {
        alert('Attention ! Tu ne peux pas envoyer de message vide. Quel est l\'intérêt ?!');
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
      <List style={ {lineHeight: "5px"} } >
        <div className="textMessages" style={{ fontWeight: "bold" }}>
          {message.pseudo} a dit :</div><i>{message.text}</i>
      </List>
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
          multiline={true}
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
