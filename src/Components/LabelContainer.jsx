import { useState } from "react";
import { useDataContext } from "../Context/DataProvider";

export const LabelContainer = () => {
  const {
    state: { labels, filter },
    dispatch,
  } = useDataContext();
  const [text, setText] = useState("");

  const createLabel = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      dispatch({ type: "ADD_LABEL", payload: text });
      setText("");
    }
  };
  return (
    <>
      <h2>Labels</h2>
      {labels.map((value) => (
        <div
          key={value._id}
          className={
            filter === value.name
              ? "labels-container label-active"
              : "labels-container"
          }
          onClick={() => dispatch({ type: "SET_FILTER", payload: value.name })}
        >
          <i className="fas fa-tag secondary-txt"> </i>
          <span className="label-value">{value.name}</span>
        </div>
      ))}
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
    </>
  );
};

export const getFilteredData = (data, filter) => {
  if (filter !== "General") {
    data = data.filter((note) => note.label === filter);
  }
  return data;
};
