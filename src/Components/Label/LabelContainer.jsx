import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext, useDataContext } from "../../Context";
import { auth } from "../../Firebase/firebase";

export const LabelContainer = ({ setShowLabels }) => {
  const navigate = useNavigate();
  const { userData, setUserData } = useAuthContext();
  const {
    state: { labels, filter },
    dispatch,
  } = useDataContext();
  const [text, setText] = useState("");

  const createLabel = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "ADD_LABEL", payload: text });
      setText("");
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUserData({ uid: "", email: "" });
    navigate("/");
  };

  return (
    <div className="label-component">
      <div className="existing-labels">
        {labels.map((value) => (
          <div
            key={value.id}
            className={
              filter === value.name
                ? "labels-container label-active"
                : "labels-container"
            }
            onClick={() => {
              dispatch({ type: "SET_FILTER", payload: value.name });
              if (setShowLabels) {
                setShowLabels(false);
              }
            }}
          >
            <i className="fas fa-tag secondary-txt"> </i>
            <span className="label-value">{value.name}</span>
          </div>
        ))}
      </div>
      <div className="label-footer">
        <div className="txt-box">
          <input
            className="txt-input new-label"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new label"
            onKeyDown={createLabel}
          />
          <span className="txt-icon">
            <i
              className="fas fa-plus-circle fa-lg"
              onClick={() => {
                dispatch({ type: "ADD_LABEL", payload: text });
                setText("");
              }}
            ></i>
          </span>
        </div>
        <div className="user-action">
          <p className="txt-desc">
            <i className="fas fa-lg fa-user secondary-txt"></i> {userData.email}
          </p>
          <i className="fas fa-lg fa-sign-out-alt" onClick={signOut}></i>
        </div>
      </div>
    </div>
  );
};

export const getFilteredData = (data, filter) => {
  if (filter !== "All Notes") {
    data = data.filter((note) => note.label === filter);
  }
  data = data.slice(0).reverse();
  return data;
};
