import firebase from "../db.component/firebase.jsx";

const getMessages = () => {
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

export { getMessages }