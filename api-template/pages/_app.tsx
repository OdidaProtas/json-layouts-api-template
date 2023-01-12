// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Toast from "../components/Toast";
import { PagesContextProvider } from "../lib/builder";
import { SocketProvider } from "../lib/socket";

const AllanWidget = dynamic(import("../components/util/bot/Widget"), {
  ssr: false,
});


const App = ({ Component, pageProps }: AppProps) => {
  
  return (
    <SessionProvider session={pageProps.session}>
      <PagesContextProvider>
        <SocketProvider>
          <Component {...pageProps} />
          <AllanWidget  />
        </SocketProvider>
        <Toast />
      </PagesContextProvider>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
      `}</style>
    </SessionProvider>
  );
};
export default App;
