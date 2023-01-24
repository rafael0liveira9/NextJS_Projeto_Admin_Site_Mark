import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/nextjs-material-dashboard.js";

const appStyle = (theme) => ({
  mainPanel: {
    ...transition,
    height: "100vh",
    width: "100vw",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1674562515404-55c2aa4a989d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80)",
  },
  mainContent: {
    ...transition,
    height: "100vh",
    width: "100vw",
    overflowScrolling: "touch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(1)",
    backgroundColor: "#1B1B1B9B",
  },
  container: {
    width: "450px",
    height: "600px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 20px #C0C0C078",
    backgroundColor: "#fff",
    padding: "0 50px",
  },
  inputBox: {
    width: "100%",
  },
  input: {
    color: "#fff !important",
  },
  buttonBox: {
    marginTop: "20px",
    width: "40%",
    height: "60px",
    backgroundColor: "#c9c9c9",
    justifySelf: "center",
  },
  logoPlaceholder: {
    fontSize: "50px",
    margin: 0,
    fontWeight: "900",
  },
});

export default appStyle;
