import React from "react";
import { Link } from "react-router-dom";
import hero from "../../images/hero_home.svg";

export const Home = () => {
  return (
    <div className="flex-home">
      <img className="img-res img-svg" src={hero} alt="landing page hero" />
      <div className="intro-container">
        <h2 className="txt-header-2">
          Welcome to <span className="secondary-txt">NoteSUP</span>
        </h2>
        <ul>
          <li>
            <em>Keep important info handy</em> by syncing your notes to all your
            devices.
          </li>
          <li>
            <em>Your notes, Your way!</em> Express yourself that help you write
            how you think.
          </li>
          <li>
            <em>Find things fast. </em>Get what you need, when you need it.
          </li>
        </ul>
        <p className="txt-desc">
          One stop shop to create and maintain your notes. Quick and easy to get
          started.
        </p>
        <Link to="/login" className="link btn btn-primary">
          Login
        </Link>
        <em> OR </em>
        <Link to="/signup" className="link btn btn-secondary">
          Sign up
        </Link>
      </div>
    </div>
  );
};
