import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context";
import { auth } from "../../Firebase/firebase";
import { Password } from "./Password";

export const Signup = () => {
  const navigate = useNavigate();
  const { setUserData, showLoader, setShowLoader } = useAuthContext();
  const [ErrorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPwd: "",
  });

  useEffect(() => {
    document.title = "NoteSUP | Signup";
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      if (user.password !== user.confirmPwd) {
        setErrorMsg("Passwords do not match!");
      } else {
        const res = await auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
        setUserData({ email: res.user.email, uid: res.user.uid });
        navigate("/notes");
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Email is already registered!");
          break;
        case "auth/invalid-email":
          setErrorMsg("Entered email is invalid!");
          break;
        case "auth/operation-not-allowed":
          setErrorMsg("This operation is not allowed.");
          break;
        case "auth/weak-password":
          setErrorMsg("Password should be at least 6 characters.");
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
        Sign <span className="secondary-txt">up</span>
      </h2>
      <form className="div-container" onSubmit={registerUser}>
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
        <Password
          name="confirmPwd"
          value={user.confirmPwd}
          changeHandler={setUser}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        {ErrorMsg && <p className="txt-desc primaryBg-txt">{ErrorMsg}</p>}
      </form>
      <b className="txt-desc primaryBg-txt">
        Already a member?{" "}
        <NavLink to="/">
          <button className="btn btn-secondary">Login</button>
        </NavLink>
      </b>

      {showLoader && (
        <Loader type="Oval" color="#00BFFF" height={80} width={80} />
      )}
    </>
  );
};
