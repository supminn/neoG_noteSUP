import { useState } from "react";
import { useDataContext } from "../Context/DataProvider";

export const LabelContainer = () => {
  const {
    state: { labels },
    dispatch,
  } = useDataContext();
  const [text, setText] = useState("");
  return (
    <>
      <h2>Labels</h2>
      {labels.map((value) => (
        <div key={value._id}>
          <i className="fas fa-tag"> </i>
          <span>{value.name}</span>
        </div>
      ))}
      <div className="txt-box">
      <input
        className="txt-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create Label"
      />
      <i
        className="fas fa-plus-circle fa-lg primaryBg-txt"
        onClick={() => {
          dispatch({ type: "ADD_LABEL", payload: text });
          setText("");
        }}
      ></i>
      </div>
    </>
  );
};
