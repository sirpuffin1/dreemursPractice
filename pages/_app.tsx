import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider, useSession } from "next-auth/react";
import { UserProvider } from "../context/UserContext";
import { NextComponentType, NextPageContext } from "next";
import { AuthEnabledComponentConfig } from "../types/auth.utils";

type AppAuthProps = AppProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: NextComponentType<NextPageContext, any, {}> & Partial<AuthEnabledComponentConfig>;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppAuthProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <Layout>
          {Component.authenticationEnabled ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });
  const style = { "--value": 70 } as React.CSSProperties

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin radial-progress bg-primary text-primary-content border-4 border-primary " style={style}></div>
    </div>
  }

  return children;
}
