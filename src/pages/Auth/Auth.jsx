import { useState } from "react";
import "./Auth.css";

import app from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";

import { CgSpinner } from "react-icons/cg";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleSwitch = (e) => {
    e.preventDefault();
    setIsSignup(!isSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (isSignup) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          navigate("/task-form");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          alert(errorCode);
        });
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          navigate("/task-form");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          alert(errorCode);
        });
    }
  };

  return (
    <div className="container">
      {isSignup ? <h1>SignUp Page</h1> : <h1>Login Page</h1>}
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-btn">
          {isSignup ? "Sign up" : "Log in"}
          {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
        </button>
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account"}
        <button
          type="button"
          className="handle-switch-btn"
          onClick={handleSwitch}
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
