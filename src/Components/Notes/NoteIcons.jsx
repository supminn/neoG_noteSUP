import { useAuthContext, useDataContext } from "../../Context";
import { updateNote } from "../../Firebase/firestoreCalls";

export const NoteIcons = ({ note, setNote = false }) => {
  const {
    state: { labels },
    dispatch,
  } = useDataContext();
  const { userData, setShowLoader } = useAuthContext();
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

  const togglePin = async () => {
    if (setNote) {
      setNote((note) => ({ ...note, pinFlag: !note.pinFlag }));
    } else {
      note.pinFlag = !note.pinFlag;
      await updateNote(userData.uid, note, "TOGGLE_PIN", dispatch, setShowLoader);
    }
  };

  const setColor = async (shade) => {
    if (setNote) {
      setNote((note) => ({ ...note, color: shade }));
    } else {
      note.color = shade;
      await updateNote(userData.uid, note, "EDIT_NOTE", dispatch, setShowLoader);
    }
  };

  const setLabel = async (e) => {
    if (setNote) {
      setNote((note) => ({ ...note, label: e.target.value }));
    } else {
      note.label = e.target.value;
      await updateNote(userData.uid, note, "EDIT_NOTE", dispatch, setShowLoader);
    }
  };

  return (
    <div className="note-icons">
      <i
        className={`fas fa-thumbtack fa-lg ${note.pinFlag ? "pinned" : ""}`}
        onClick={togglePin}
      ></i>
      <div className="palette-container">
        {/* <i className="fas fa-palette fa-lg primaryBg-txt"></i> */}
        <div className="color-palette">
          {colors.map((shade) => (
            <i
              className="fas fa-circle fa-lg"
              style={{ color: shade }}
              key={shade}
              onClick={() => setColor(shade)}
            ></i>
          ))}
        </div>
        <select
          className="label-container"
          value={note.label}
          onChange={setLabel}
        >
          {labels.map((value) => (
            <option key={value.id} value={value.name}>
              {value.name === "All Notes" ? "No Tag" : value.name}{" "}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
