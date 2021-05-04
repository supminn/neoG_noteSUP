import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../Context/DataProvider";
import { NoteIcons } from "./NoteIcons";

export const NewNote = ({ existingNote }) => {
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
  }, []);

  const createNote = (e) => {
    e.preventDefault();
    if (note.title || note.description) {
      dispatch({ type: "ADD_NOTE", payload: note });
    }
    setNote(initialState);
    setShowDetail(false);
  };
  return (
    <>
      <h2>New Note</h2>
      <form
        onSubmit={createNote}
        className="note-container"
        style={{ backgroundColor: note.color }}
      >
        {showDetail && <input
          className="txt-input txt-title"
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) =>
            setNote((note) => ({ ...note, title: e.target.value }))
          }
        />}
        <textarea
          ref={noteRef}
          className="txt-input txt-description"
          type="text"
          placeholder="Take a note..."
          value={note.description}
          onClick={() => setShowDetail(true)}
          onChange={(e) =>{ setShowDetail(true);
            setNote((note) => ({ ...note, description: e.target.value }));}
          }
        />
        {showDetail && <div className="note-footer">
          <NoteIcons note={note} setNote={setNote} />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setNote(initialState)}
          >
            Clear
          </button>
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>}
      </form>
    </>
  );
};
