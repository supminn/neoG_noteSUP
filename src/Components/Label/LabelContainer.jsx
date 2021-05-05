import { useState } from "react";
import { useDataContext } from "../../Context";

export const LabelContainer = ({setShowLabels}) => {
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
    <div className="label-component">
      <div className="existing-labels">
      {labels.map((value) => (
        <div
          key={value._id}
          className={
            filter === value.name
              ? "labels-container label-active"
              : "labels-container"
          }
          onClick={() => 
            {
              dispatch({ type: "SET_FILTER", payload: value.name });
              if(setShowLabels){
                setShowLabels(false);
              }
            }
          }
        >
          <i className="fas fa-tag secondary-txt"> </i>
          <span className="label-value">{value.name}</span>
        </div>
      ))}
      </div>
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
