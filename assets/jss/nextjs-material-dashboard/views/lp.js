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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    width: "100%",
    height: "100%",
    maxWidth: "1440px",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.up("xs")]: {
      width: `calc(100% - 100px)`,
    },
    justifyContent: "center",
  },
  row: {
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: "25px",
      fontWeight: "400",
    },
  },
  rowSub: {
    display: "flex",
    alignItems: "center",
    marginLeft: "40px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    "& p": {
      fontSize: "25px",
      fontWeight: "400",
    },
  },
  marginLeft: {
    [theme.breakpoints.up("md")]: {
      marginLeft: "10px",
    },
  },
  rowEnd: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonStyle: {
    backgroundColor: "#3F2CA0",
    color: "#fff",
  },
});

export default appStyle;
