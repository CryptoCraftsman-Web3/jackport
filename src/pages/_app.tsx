import "../styles/globals.css";
import SocketProvider from "../context/SocketContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import Wallet from "../components/wallet/Wallet";
import { ToastContainer } from "react-toastify";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/styles/theme";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Wallet>
          <WalletModalProvider>
            <ThemeProvider theme={theme}>

            <Component {...pageProps} />
            <ToastContainer
              style={{ fontSize: 15 }}
              pauseOnFocusLoss={false}
            />
            </ThemeProvider>
          </WalletModalProvider>
        </Wallet>
      </SocketProvider>
    </QueryClientProvider>
  )
}