import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Password } from "./Password";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Context";
import { Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { setUserData, showLoader, setShowLoader } = useAuthContext();
  const [ErrorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "NoteSUP | Login";
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      const res = await auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      const userData = { email: res.user.email, uid: res.user.uid };
      setUserData(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/notes");
    } catch (err) {
      switch (err.code) {
        case "auth/user-disabled":
          setErrorMsg("User has been disabled, contact admin.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Entered email is invalid!");
          break;
        case "auth/user-not-found":
          setErrorMsg("User not found! Register yourself.");
          break;
        case "auth/wrong-password":
          setErrorMsg("Password is incorrect!");
          break;
        default:
          setErrorMsg(err.message);
      }
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <>
      <h2 className="txt-header-2">
        Login to <span className="secondary-txt">continue!</span>
      </h2>
      <form className="div-container" onSubmit={loginHandler}>
        <div className="txt-box">
          <span className="txt-icon">
            <i className="fas fa-envelope fa-lg"></i>
          </span>
          <input
            required
            className="txt-input"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser((data) => ({ ...data, email: e.target.value }))
            }
            placeholder="Email address"
          />
        </div>
        <Password
          name="password"
          value={user.password}
          changeHandler={setUser}
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p
          className="btn-link"
          onClick={() =>
            setUser((data) => ({
              ...data,
              email: "test@note.com",
              password: "TestNote1",
            }))
          }
        >
          Use test credentials
        </p>
        {ErrorMsg && <p className="txt-desc primaryBg-txt">{ErrorMsg}</p>}
      </form>

      <p className="txt-desc primaryBg-txt">
        Forgotten password? <Link to="/reset-password">Reset here</Link>
      </p>
      <div className="signup-container">
        <b className="primaryBg-txt">Not a member? </b>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
      {showLoader && (
        <Loader type="Oval" color="#00BFFF" height={80} width={80} />
      )}
    </>
  );
};
