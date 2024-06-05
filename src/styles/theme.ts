import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#121418",
    },
  },
  typography: {
    fontFamily: "Space Grotesk",
    subtitle1: { fontWeight: 800, fontSize: "18px" },
  },
});
