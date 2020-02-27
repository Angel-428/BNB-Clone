import App from "next/app";
import store from "../store";
import { StoreProvider } from "easy-peasy";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}
