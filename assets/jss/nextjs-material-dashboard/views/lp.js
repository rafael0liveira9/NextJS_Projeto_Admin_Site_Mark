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
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.up("xs")]: {
      width: `calc(100% - 100px)`,
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: "25px",
      fontWeight: "400",
    },
  },
});

export default appStyle;
