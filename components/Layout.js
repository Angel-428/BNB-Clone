import Header from "./Header";
import { useState } from "react";
import Modal from "./Modal";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

const Layout = props => {
  const [showModal, setShowModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  return (
    <div>
      <Header />

      <main>{props.content}</main>
      {showModal && (
        <Modal close={() => setShowModal(false)}>
          {showLoginModal && (
            <LoginModal
              showSignUp={() => {
                setShowRegistrationModal(true);
                setShowLoginModal(false);
              }}
            />
          )}
          {showRegistrationModal && (
            <RegistrationModal
              showLogin={() => {
                setShowRegistrationModal(false);
                setShowLoginModal(true);
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
