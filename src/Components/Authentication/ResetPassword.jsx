import Loader from "react-loader-spinner";
import { useEffect, useState } from "react";
import { Password } from "./Password";
import { auth } from "../../Firebase/firebase";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../Context";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { setUserData } = useAuthContext();
  const [ErrorMsg, setErrorMsg] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "SupVision | Reset Password";
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      await auth.sendPasswordResetEmail(user.email);
      setErrorMsg("Check your email for the reset link!");
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
          setErrorMsg(
            "You seemed to have entered the wrong password. Try again"
          );
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
        Reset your <span className="secondary-txt">password!</span>
      </h2>
      <form className="div-container" onSubmit={resetPassword}>
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
        <button type="submit" className="btn btn-primary">
          Reset
        </button>
        {ErrorMsg && <p className="txt-desc primaryBg-txt">{ErrorMsg}</p>}
        <p className="txt-desc primaryBg-txt">
          Go back to login? <Link to="/">Click here</Link>
        </p>
      </form>

      <div className="signup-container">
        <b className="primaryBg-txt">Need an account? </b>
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
