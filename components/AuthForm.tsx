import { signIn, useSession } from "next-auth/react";
import { useState, FormEvent, ChangeEvent } from "react";
import AuthFormInput from "./AuthFormInput";
import Router from 'next/router';
import axios from "axios";

const defaultEmailPassword = {
  email: "",
  password: "",
};

const AuthForm = () => {
  const { data: session } = useSession();
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };

  const [username, setUsername] = useState("");
  const [emailPassword, setEmailPassword] = useState(defaultEmailPassword);
  const { email, password } = emailPassword;

  const redirectToHome = () => {
    const { pathname } = Router;
    if(pathname == "/auth") Router.push("/home")
  }

  const registerUser = async () => {
    const registerCredentials = {username, ...emailPassword}
    console.log(registerCredentials)
    const res = await axios.post("/api/register", {
      username, ...emailPassword
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(async () => {
      await loginUser();
    }).catch((error) => console.log(error))

    console.log(res)
  };

  const loginUser = async () => {
    const res:any = signIn("credentials", {
      ...emailPassword,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });
    res.error ? console.log(res.error) : redirectToHome()
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authType == "Login" ? loginUser() : registerUser();
  };

  const handleEmailPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmailPassword({ ...emailPassword, [name]: value });
    console.log(emailPassword);
  };

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(username);
  };

  return (
    <div className="form-control">
      <h2 className="card-title justify-center">{authType}</h2>
      <div className="flex">
        <p className="text-center">
          {authType == "Login"
            ? "Not registered yet?"
            : "Already have an account? "}
        </p>
        <button
          className="text-black"
          onClick={() => setAuthType(oppAuthType[authType])}
        >
          {oppAuthType[authType]}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {authType != "Login" && (
          <AuthFormInput
            type="text"
            placeholder="BigStepper45"
            value={username}
            labelText="Username"
            onChange={handleUsername}
          />
        )}

        <AuthFormInput
          type="email"
          placeholder="me@myemail.com"
          value={email}
          name="email"
          labelText="Email"
          onChange={handleEmailPassword}
        />

        <AuthFormInput
          type="password"
          placeholder="shhhhh"
          value={password}
          labelText="Password"
          name="password"
          onChange={handleEmailPassword}
        />

        <div className="card-actions justify-center mt-5">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
