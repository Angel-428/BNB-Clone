import App from "next/app";
import { StoreProvider } from "easy-peasy";
import store from "../store";
import "./style.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = (await Component.getInitialProps)
      ? await Component.getInitialProps(ctx)
      : {};

    const user = null;
    return { appProps, user };
  }

  render() {
    const { Component, appProps, user } = this.props;
    if (user) {
      store.getActions().user.setUser(user);
    }
    return (
      <StoreProvider store={store}>
        <Component {...appProps} />
      </StoreProvider>
    );
  }
}
