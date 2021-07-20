import { useState } from "react";
import { useAuthContext } from "../../Context";
import logo from "../../images/logo.png";
import { LabelContainer } from "../Label/LabelContainer";

export const Navigation = () => {
  const [showLabels, setShowLabels] = useState(false);
  const { userData } = useAuthContext();
  return (
    <nav className="nav">
      <div className="nav-logo">
        <img className="img-rd" src={logo} alt="logo" />
        <span className="nav-header">NoteSUP</span>
      </div>
      {userData.email && (
        <span className="nav-btn" onClick={() => setShowLabels((val) => !val)}>
          <i className="fas fa-chevron-circle-down fa-lg"></i>
        </span>
      )}
      {showLabels && (
        <div className="mobile-labels">
          <LabelContainer setShowLabels={setShowLabels} />
        </div>
      )}
    </nav>
  );
};
