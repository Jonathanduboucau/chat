import React, { Component } from "react";
import {
  TextField,
  ListItemText
} from "@material-ui/core";
import firebase from "firebase";

const header = {
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
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { text: "", messages: [] };
  }

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyCZjnNOxYdO6e_GIBCn1GgUIQOnRnKa-a8",
      authDomain: "chat-living-room.firebaseapp.com",
      databaseURL: "https://chat-living-room.firebaseio.com",
      projectId: "chat-living-room",
      storageBucket: "chat-living-room.appspot.com",
      messagingSenderId: "330683344143"
    };
    firebase.initializeApp(config);
    this.getMessages();
  }

  onSubmit = event => {
    if (event.charCode === 13 && this.state.text.trim() !== "") {
      this.writeMessageToDB(this.state.text);
      this.setState({ text: "" });
    }
  };

  writeMessageToDB = message => {
    firebase
      .database()
      .ref("messages/")
      .push({
        text: message
      });
  };

  getMessages = () => {
    let messagesDB = firebase.database().ref("messages/");
    messagesDB.on("value", snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        let message = child.val();
        newMessages.push({ id: child.key, text: message.text });
      });
      this.setState({ messages: newMessages, loading: false });
    });
  };

  renderMessages = () => {
    return this.state.messages.map(message => (
      <ListItemText>{message.text}</ListItemText>
    ));
  };
  render() {
    return (
      <div className="App">
        <header style={header.positionHeader} className="App-header">
          <span style={header.spanH1}>Chat Living Room</span>
          <span style={header.span}>Made with <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/2000px-A_perfect_SVG_heart.svg.png" alt="heart" style={{width: "15px"}} /> by Jonathanduboucau</span>
        </header>
          {this.renderMessages()}
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
