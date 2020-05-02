import Link from "next/link";
import { useStoreActions, useStoreState, action } from "easy-peasy";
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
    <div className="nav-container">
      <Link href="/">
        <a>
          <img src="/images/housebin.png" alt="" />
        </a>
      </Link>

      <nav>
        <ul>
          {user ? (
            <>
              <li className="username">{user}</li>
              <li>
                <Link href="/bookings">
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
            </>
          ) : (
            <>
              <li>
                <a onClick={() => setShowRegistrationModal()}>Sign up</a>
              </li>
              <li>
                <a onClick={() => setShowLoginModal()}>Log in</a>
              </li>
            </>
          )}
        </ul>
      </nav>

      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
        }

        li {
          display: block;
          float: left;
        }

        a {
          text-decoration: none;
          display: block;
          margin-right: 15px;
          color: #333;
        }

        nav a {
          padding: 1em 0.5em;
        }

        .nav-container {
          border-bottom: 1px solid #eee;
          height: 50px;
        }

        img {
          float: left;
        }

        ul {
          float: right;
        }
        .username {
          padding: 1em 0.5em;
        }
      `}</style>
    </div>
  );
};

export default Header;
