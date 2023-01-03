// _app.tsx

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Toast from "../components/Toast";
import { PagesContextProvider } from "../lib/builder";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <PagesContextProvider>
        <Component {...pageProps} />
        <Toast />
      </PagesContextProvider>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
      `}</style>
    </SessionProvider>
  );
};
export default App;
