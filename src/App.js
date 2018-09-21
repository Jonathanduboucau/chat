import React, { Component } from "react";
import firebase from "./db.component/firebase.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./header.component/header.jsx";
import Sign from "./pages/login.jsx";
import Chat from "./chat.component/chat.jsx";
import Footer from "./footer.component/footer.jsx";
import "./style/app.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pseudo: "",
      text: "",
      messages: []
    };

    this.clearText = this.clearText.bind(this);
  }

  clearText() {
    this.setState({ text: "", pseudo: this.state.pseudo });
  }

  componentDidMount() {
    this.getMessages();
  }

  getMessages = () => {
    let messagesDB = firebase.database().ref(`messages/`);
    messagesDB.on("value", snapshot => {
      let newMessages = [];
      snapshot.forEach(child => {
        let message = child.val();
        newMessages.push({
          id: child.key,
          text: message.text,
          pseudo: message.pseudo,
          time: message.time
        });
      });
      this.setState({ messages: newMessages });
    });
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" />
              <Route exact path="/sign" />
            </Switch>
          </div>
        </BrowserRouter>
        <Chat
          clearText={this.clearText}
          message={this.state.messages}
          pseudo={event => this.setState({ pseudo: event.target.value })}
          textChar={event => this.setState({ text: event.target.value })}
          messagesText={this.props.messages}
          textR={this.state.text}
          pseudoR={this.state.pseudo}
          messagesR={this.state.messages}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
