import Link from "next/link";
import Head from "next/head";
import { useStoreActions, useStoreState } from "easy-peasy";

import Router from "next/router";

const Header = () => {
  const setShowLoginModal = useStoreActions(
    (actions) => actions.modals.setShowLoginModal
  );
  const setShowRegistrationModal = useStoreActions(
    (actions) => actions.modals.setShowRegistrationModal
  );
  const user = useStoreState((state) => state.user.user);
  const setUser = useStoreActions((actions) => actions.user.setUser);

  return (
    <nav>
      <div className="nav-container">
        <Link href="/">
          <a>
            <img src="/static/housebin.png" alt="logo" width="42" height="42" />
          </a>
        </Link>
        <div>
          <h3 className="username"> Welcome {user ? user : "Please Log in"}</h3>
        </div>

        <div className="menu-wrap">
          <input type="checkbox" className="toggler" />
          <div className="hamburger">
            <div></div>
          </div>
          <div className="menu">
            <div>
              <div>
                {user ? (
                  <ul>
                    <li>
                      <Link href="/bookings/bookings" as="/bookings/bookings">
                        <a>Bookings</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/host/new">
                        <a>Add House</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/host">
                        <a>My Houses</a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={async () => {
                          let token = window.sessionStorage.getItem("token");
                          if (user && token !== "") {
                            token = window.sessionStorage.setItem("token", "");
                            setUser(null);
                            Router.push("/");
                          }
                        }}
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    <li>
                      <a onClick={() => setShowRegistrationModal()}>Sign up</a>
                    </li>
                    <li>
                      <a onClick={() => setShowLoginModal()}>Log in</a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <Head>
          <title>Welcome To Housebin</title>
        </Head>
        <style jsx>{`

          .nav-container {
            margin: auto;
            max-width: 1100px;
            overflow: auto;
            padding: 0 20px;
          }
          .nav-container {
            overflow: auto
            background-color: gray
          }
          .nav-container img {
            float: left;
            padding-top: 20px
          }
          a {
            text-decoration: none;
            color: #333;
          }
          li {
            list-style: none;
          }
          .nav-container .username {
            font-size; 20px;
            font-weight: bold;
            float: left;
            padding-top: 10px;
            text-align: center
          }
          .nav-container ul {
            float: right
          }
          .nav-container ul li {
            float: left
          }

          .nav-container ul li a {
            display: block;
            padding: 10px 20px;
            text-align: center;
          }
          .nav-container ul li a:hover {
            color: #f7c08a;
            background: #444;
            cursor: pointer
          }


        `}</style>
      </div>
    </nav>
  );
};

export default Header;
