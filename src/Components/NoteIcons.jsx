import { useDataContext } from "../Context/DataProvider";

export const NoteIcons = ({ note, setNote = false }) => {
  const {
    state: { labels },
    dispatch,
  } = useDataContext();
  const colors = [
    "#FDD892",
    "#C3E1A1",
    "#FAAEB8",
    "#B6A3D0",
    "#CBCBCB",
    "#8CD6F1",
    "#FA976C",
    "#FFFFFF",
  ];
  return (
    <div className="note-icons">
      <i
        className={`fas fa-thumbtack fa-lg ${note.pinFlag ? "pinned" : ""}`}
        onClick={() =>
          setNote
            ? setNote((note) => ({ ...note, pinFlag: !note.pinFlag }))
            : dispatch({ type: "TOGGLE_PIN", payload: note })
        }
      ></i>
      <div className="palette-container">
        <i className="fas fa-palette fa-lg primaryBg-txt"></i>
        <div className="color-palette">
          {colors.map((shade) => (
            <i
              className="fas fa-circle fa-lg"
              style={{ color: shade }}
              key={shade}
              onClick={() =>
                setNote
                  ? setNote((note) => ({ ...note, color: shade }))
                  : dispatch({
                      type: "SET_COLOR",
                      payload: { _id: note._id, shade },
                    })
              }
            ></i>
          ))}
        </div>
        <select
          className="label-container"
          value={note.label}
          onChange={(e) =>
            setNote
              ? setNote((note) => ({ ...note, label: e.target.value }))
              : dispatch({
                  type: "SET_LABEL",
                  payload: { _id: note._id, label: e.target.value },
                })
          }
        >
          {labels.map((value) => (
            <option key={value._id} value={value.name}>
              {value.name}{" "}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
