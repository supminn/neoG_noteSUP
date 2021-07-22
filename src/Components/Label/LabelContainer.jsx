import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext, useDataContext } from "../../Context";
import { auth } from "../../Firebase/firebase";
import {
  addLabel,
  deleteLabel,
  deleteNote,
} from "../../Firebase/firestoreCalls";

export const LabelContainer = ({ setShowLabels }) => {
  const navigate = useNavigate();
  const { userData, setUserData, setShowLoader } = useAuthContext();
  const {
    state: { others, pinned, labels, filter },
    dispatch,
  } = useDataContext();
  const [text, setText] = useState("");

  const createLabel = async (e) => {
    if (e.key === "Enter" && text !== "") {
      await addLabel(userData.uid, text, dispatch, setShowLoader);
      setText("");
    }
  };

  const removeLabelAndNotes = async (label) => {
    others.forEach((note) =>
      note.label === label.name
        ? deleteNote(userData.uid, note, dispatch, setShowLoader)
        : ""
    );
    pinned.forEach((note) =>
      note.label === label.name
        ? deleteNote(userData.uid, note, dispatch, setShowLoader)
        : ""
    );
    await deleteLabel(userData.uid, label, dispatch, setShowLoader);
    if (setShowLabels) {
      setShowLabels(false);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUserData({ uid: "", email: "" });
    dispatch({ type: "CLEAR_NOTES" });
    localStorage.removeItem("user");
    if (setShowLabels) {
      setShowLabels(false);
    }
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
            <span className="label-data">
              <i className="fas fa-tag secondary-txt"> </i>
              <span className="label-value">{value.name}</span>
            </span>
            {value.id !== labels[0].id && (
              <i
                className="fas fa-trash-alt secondary-txt"
                onClick={() => removeLabelAndNotes(value)}
              >
                {" "}
              </i>
            )}
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
                if (text !== "") {
                  dispatch({ type: "ADD_LABEL", payload: text });
                  setText("");
                }
              }}
            ></i>
          </span>
        </div>
        <div className="user-action">
          <p className="txt-desc">
            <i className="fas fa-lg fa-user secondary-txt"></i>{" "}
            <em>{userData.email}</em>
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
