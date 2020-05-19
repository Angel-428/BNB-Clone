import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import axios from "axios";
export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStoreActions((action) => action.user.setUser);
  const setHideModal = useStoreActions(
    (actions) => actions.modals.setHideModal
  );

  return (
    <>
      <h2>Log in</h2>
      <div>
        <form
          onSubmit={async (ev) => {
            try {
              ev.preventDefault();
              const saveAuthTokenInSession = (token) => {
                window.sessionStorage.setItem("token", token);
              };
              const res = await axios.post("http://localhost:4000/api/login", {
                email,
                password,
              });

              if (res.status === 200 && res.data.userId) {
                saveAuthTokenInSession(res.data.token);
                const response = await axios.get(
                  `http://localhost:4000/api/user/${res.data.userId}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      authorization: res.data.token,
                    },
                  }
                );

                if (response && response.data.email) {
                  setUser(response.data.email);
                  setHideModal();
                }
              }
            } catch (error) {
              alert("wrong credentials");
              return;
            }
          }}
        >
          <input
            id="email"
            type="email"
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Log in</button>
        </form>
        <p>
          Don't have an account yet?{" "}
          <a href="#" onClick={() => props.showSignUp()}>
            Sign up
          </a>
        </p>
        <style jsx>
          {`
            button {
              background-color: rgb(255, 90, 95);
              color: white;
              font-size: 13px;
              width: 100%;
              border: none;
              height: 40px;
              border-radius: 4px;
              cursor: pointer;
            }

            input[type="text"],
            input[type="email"],
            input[type="password"] {
              display: block;
              padding: 20px;
              font-size: 20px !important;
              width: 100%;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
              margin-bottom: 10px;
            }
          `}
        </style>
      </div>
    </>
  );
};
