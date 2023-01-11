import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react"
import { UserProvider } from "../context/UserContext";

export default function App({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
    
      <SessionProvider session={session}>
        <UserProvider>
        <Layout>
      <Component {...pageProps} />
      </Layout>
      </UserProvider>
      </SessionProvider>
  );
}
