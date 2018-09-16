import firebase from "firebase";

export const Config = {
  apiKey: "AIzaSyCZjnNOxYdO6e_GIBCn1GgUIQOnRnKa-a8",
  authDomain: "chat-living-room.firebaseapp.com",
  databaseURL: "https://chat-living-room.firebaseio.com",
  projectId: "chat-living-room",
  storageBucket: "chat-living-room.appspot.com",
  messagingSenderId: "330683344143"
};
firebase.initializeApp(Config);
export default firebase;