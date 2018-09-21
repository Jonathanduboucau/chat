const app = {
  container: {
    width: "80%",
    border: "solid 1px rgba(0,0,0,0.1)",
    margin: "20px auto",
    backgroundColor: "beige",
    padding: "10px",
    height: "70vh",
    overflow: "auto"
  },
  pseudo: {
    float: "left",
    marginLeft: "10px",
    textAlign: "center",
    backgroundColor: "beige",
    border: "solid 1px rgba(0,0,0,0.1)"
  },
  chat: {
    width: "80%",
    margin: "auto",
    display: "flex"
  },
  input: {
    display: "flex",
    margin: "auto",
    width: "81%",
    padding: "0 10px"
  }
};

const input = {
  pseudo: {
    margin: "0 10px",
    backgroundColor: "beige",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "5px"
  },
  text: {
    width: "80%",
    margin: "auto",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "5px"
  }
}
export { app, input };
