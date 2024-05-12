import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Provider from "./Provider";
import { Provider as ReduxProvider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      {/* <ReduxProvider store={store}> */}
        <Component {...pageProps} />
      {/* </ReduxProvider> */}
    </Provider>
  );
}
