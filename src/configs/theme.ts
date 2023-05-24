import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Helvetica", "sans-serif"].join(","),
  },

  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.3)",
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#93CEFF",
    },
    secondary: {
      main: "#FFC022",
    },
    error: {
      main: "#FF0000",
    },
  },
});
export default theme;
