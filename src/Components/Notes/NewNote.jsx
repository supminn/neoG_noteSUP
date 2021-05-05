import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../../Context";
import { NoteIcons } from "..";

export const NewNote = ({ existingNote, setEditMode }) => {
  const { dispatch } = useDataContext();
  const initialState = {
    title: "",
    description: "",
    label: "General",
    color: "",
    pinFlag: false,
  };
  const [note, setNote] = useState(existingNote || initialState);
  const noteRef = useRef(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    noteRef.current.focus();
    if (existingNote) {
      setShowDetail(true);
    }
  }, [existingNote]);

  const createNote = (e) => {
    e.preventDefault();
    if (note.title || note.description) {
      if (existingNote) {
        dispatch({ type: "EDIT_NOTE", payload: note });
        setEditMode(false);
      } else {
        dispatch({ type: "ADD_NOTE", payload: note });
      }
    }
    setNote(initialState);
    setShowDetail(false);
  };

  const cancelHandler = () => {
    if (existingNote) {
      setEditMode(false);
    } else {
      setNote(initialState);
      setShowDetail(false);
    }
  };
  return (
    <>
      <form
        onSubmit={createNote}
        className="note-container"
        style={{ backgroundColor: note.color }}
      >
        {showDetail && (
          <input
            className="txt-input txt-title"
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={(e) =>
              setNote((note) => ({ ...note, title: e.target.value }))
            }
          />
        )}
        <textarea
          ref={noteRef}
          className={`txt-input ${
            existingNote
              ? `note-description`
              : showDetail
              ? `txt-description`
              : `txt-note`
          }`}
          type="text"
          placeholder="Take a note..."
          value={note.description}
          onClick={() => setShowDetail(true)}
          onChange={(e) => {
            setShowDetail(true);
            setNote((note) => ({ ...note, description: e.target.value }));
          }}
        />
        {showDetail && (
          <div className="note-footer">
            <NoteIcons note={note} setNote={setNote} />
            <button
              className="btn secondary-txt secondary-bg"
              onClick={cancelHandler}
            >
              <i className="fas fa-lg fa-times-circle"></i>
            </button>

            <button className="btn primary-txt primary-bg" type="submit">
              <i className="fas fa-lg fa-check-circle"></i>
            </button>
          </div>
        )}
      </form>
    </>
  );
};
