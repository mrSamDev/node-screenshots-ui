import { createMuiTheme } from "@material-ui/core/styles";
import Colors from "./Constants/Colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.primary,
      contrastText: Colors.white,
    },
    secondary: {
      main: Colors.secondary,
      contrastText: Colors.white,
    },
    error: {
      main: Colors.error,
      contrastText: Colors.white,
    },
    warning: {
      main: Colors.warning,
      contrastText: Colors.white,
    },

    white: {
      main: Colors.white,
    },
    black: {
      main: Colors.black,
    },
    light: {
      main: Colors.light,
    },
    dark: {
      main: Colors.dark,
    },

    background: {
      default: Colors.background,
    },
    text: { primary: "#1E1E2D", secondary: "#707070" },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),

    button: {
      fontSize: "0.875rem",
      fontWeight: 800,
    },

    subtitle1: {
      fontSize: "1rem",
      fontWeight: 800,
    },

    subtitle2: {
      fontSize: "1rem",
      fontWeight: 400,
    },

    body1: {
      fontSize: "0.875rem",
      fontWeight: 800,
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },

    caption: {
      fontSize: ".75rem",
      // fontWeight: 800
    },

    h1: {
      fontWeight: 800,
    },

    h2: {
      fontWeight: 800,
    },

    h3: {
      fontWeight: 800,
    },

    h4: {
      fontWeight: 800,
    },

    h5: {
      fontWeight: 800,
    },

    h6: {
      // fontSize: "14px",
      fontWeight: 800,
    },
  },
  overrides: {
    MuiButton: {
      sizeSmall: {
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        minWidth: 90,
      },
      sizeLarge: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: "2rem",
        paddingRight: "2rem",
        minWidth: 200,
      },
      contained: {
        padding: ".625rem 2rem",
        boxShadow: "none",
        borderRadius: 5,
        fontSize: ".75rem",
      },
      outlined: {
        padding: ".625rem 2rem",
        boxShadow: "none",
        borderRadius: 5,
        fontSize: ".75rem",
        minWidth: 100,
      },
    },
    MuiInputBase: {
      input: {
        fontWeight: 600,
      },
      root: {
        minWidth: 120,
      },
    },
    MuiChip: {
      root: {
        minWidth: 80,
        color: "#fff !important",
        backgroundColor: Colors.very_light_grey,
      },
    },
  },
});
let shadows = [...theme.shadows];
shadows[1] = "0px 5px 15px rgba(0, 0, 0, 0.08)";
theme.shadows = shadows;

export default theme;
