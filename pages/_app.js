import App from "next/app";
import { StoreProvider } from "easy-peasy";
import store from "../store";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = (await Component.getInitialProps)
      ? await Component.getInitialProps(ctx)
      : {};

    const user = null;
    return { appProps, user };
  }

  // constructor(props) {
  //   super(props);
  // }

  render() {
    // console.log("this.props", this.props);
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

// MyApp.getInitialProps = async appContext => {
//   // const { id } = query;
//   const appProps = await App.getInitialProps(appContext);
//   let user = null;
//   console.log("app.context.req", appContext.ctx);
//   // if (appContext.ctx.req) {
//   //   user = appContext.ctx.req;
//   // }
//   if (
//     appContext.ctx.req &&
//     appContext.ctx.req.session &&
//     appContext.ctx.req.session.passport &&
//     appContext.ctx.req.session.passport.user
//   ) {
//     user = appContext.ctx.req.session.passport.user;
//   }
//   return { ...appProps, user: user };
// };

// export default MyApp;
