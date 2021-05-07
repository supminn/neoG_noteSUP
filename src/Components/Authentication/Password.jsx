import { useState } from "react";

export const Password = ({ name, value, changeHandler }) => {
  const [viewPwd, setViewPwd] = useState(false);
  return (
    <div className="txt-box">
      <input
        required
        className="txt-input"
        type={viewPwd ? "text" : "password"}
        value={value}
        onChange={(e) =>
          changeHandler((data) => ({ ...data, [name]: e.target.value }))
        }
        placeholder={name === "password" ? "Password" : "Confirm Password"}
      />
      <span className="txt-icon" onClick={() => setViewPwd((val) => !val)}>
        <i className={`fas ${viewPwd?`fa-eye`:`fa-eye-slash`} fa-lg`}></i>
      </span>
    </div>
  );
};
