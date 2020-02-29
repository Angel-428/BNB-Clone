import axios from "axios";
import { useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

export default props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const setUser = useStoreActions(action => action.user.setUser);
  const setHideModal = useStoreActions(actions => actions.modals.setHideModal);
  return (
    <>
      <h2>Sign up</h2>
      <div>
        <form
          onSubmit={async ev => {
            try {
              ev.preventDefault();
              const register = await axios.post(
                "http://localhost:4000/api/user/register",
                {
                  name,
                  lastName,
                  email,
                  password,
                  passwordConfirmation
                }
              );
              const data = await register.data;
              console.log("register", data);
              if (data.status === "error") {
                alert(response.data.message);
              }
              setUser(email);
              setHideModal();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <input
            id="name"
            type="name"
            placeholder="First Name"
            onChange={e => {
              setName(e.target.value);
            }}
          />
          <input
            id="lastname"
            type="lastname"
            placeholder="Last Name"
            onChange={e => {
              setLastName(e.target.value);
            }}
          />
          <input
            id="email"
            type="email"
            placeholder="Email address"
            onChange={e => {
              setEmail(e.target.value);
            }}
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <input
            id="passwordconfirmation"
            type="password"
            placeholder="Enter password again"
            onChange={e => {
              setPasswordConfirmation(e.target.value);
            }}
          />
          <button>Sign up</button>
        </form>
        <p>
          Already have an account?{" "}
          <a href="#" onClick={() => props.showLogin()}>
            Log in
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
            input[type="password"],
            input[type="name"],
            input[type="lastname"],
            input[type="passwordconfirmation"] {
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
