import { useSession } from "next-auth/react";
import { useState, FormEvent, ChangeEvent } from "react";
import AuthFormInput from "./AuthFormInput";

const defaultEmailPassword = {
  email: "",
  password: ""
}

const AuthForm = () => {
  const { data: session } = useSession();
  const [authType, setAuthType] = useState("Login");
  const oppAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  };

  const [username, setUsername] = useState("");
  const [ emailPassword, setEmailPassword ] = useState(defaultEmailPassword)
  const { email, password } = emailPassword
  

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authType == "Login" ? "logging in" : "registering";
    console.log(emailPassword)
  };

  const handleEmailPassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEmailPassword({...emailPassword, [name]: value})
    console.log(emailPassword)
  }

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    console.log(username)
  }
  return (
    <div className="form-control">
      <form onSubmit={handleSubmit}>
        <AuthFormInput
          type="email"
          placeholder="me@myemail.com"
          value={email}
          name="email"
          labelText="Email"
          onChange={handleEmailPassword}
        />

<AuthFormInput
          type="text"
          placeholder="BigStepper45"
          value={username}
          labelText="Username"
          onChange={handleUsername}
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
