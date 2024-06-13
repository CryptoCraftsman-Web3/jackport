import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#121418",
    },
    primary: {
      main: "#7E18FF",
    },
  },
  typography: {
    fontFamily: "Space Grotesk",
    subtitle1: { fontWeight: 800, fontSize: "18px" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});
