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
    </SessionProvider>
  );
};
export default App;
