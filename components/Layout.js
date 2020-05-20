import Header from "./Header";
import Modal from "./Modal";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";

const Layout = (props) => {
  const showModal = useStoreState((state) => state.modals.showModal);
  const showLoginModal = useStoreState((state) => state.modals.showLoginModal);
  const showRegistrationModal = useStoreState(
    (state) => state.modals.showRegistrationModal
  );
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const setHideModal = useStoreActions(
    (actions) => actions.modals.setHideModal
  );
  const setShowRegistrationModal = useStoreActions(
    (actions) => actions.modals.setShowRegistrationModal
  );
  const setShowLoginModal = useStoreActions(
    (actions) => actions.modals.setShowLoginModal
  );
  useEffect(() => {
    (function fetchData() {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        fetch("http://localhost:4000/api/login", {
          method: "post",
          headers: {
            "content-type": "application/json",
            authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.id) {
              fetch(`http://localhost:4000/api/user/${data.id}`, {
                method: "get",
                headers: {
                  "content-type": "application/json",
                  authorization: token,
                },
              })
                .then((response) => response.json())
                .then((user) => {
                  if (user && user.email) {
                    setUser(user.email);
                  }
                });
            }
          });
      }
    })();
  });

  return (
    <div>
      <Header />

      <main>{props.content}</main>
      {showModal && (
        <Modal close={() => setHideModal()}>
          {showLoginModal && (
            <LoginModal
              showSignUp={() => {
                setShowRegistrationModal();
              }}
            />
          )}
          {showRegistrationModal && (
            <RegistrationModal
              showLogin={() => {
                setShowLoginModal();
              }}
            />
          )}
        </Modal>
      )}
      <style jsx global>{`
        body {
          margin: 0;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
        }
      `}</style>

      <style jsx>{`
        main {
          position: relative;
          max-width: 56em;
          background-color: white;
          padding: 2em;
          margin: 0 auto;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Layout;
