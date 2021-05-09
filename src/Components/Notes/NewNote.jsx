import { useEffect, useRef, useState } from "react";
import { useAuthContext, useDataContext } from "../../Context";
import { NoteIcons } from "..";
import { addNote, updateNote } from "../../Firebase/firestoreCalls";

export const NewNote = ({ existingNote, setEditMode }) => {
  const {userData, setShowLoader} = useAuthContext();
  const { dispatch } = useDataContext();
  const initialState = {
    title: "",
    description: "",
    label: "All Notes",
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

  const createNote = async (e) => {
    e.preventDefault();
    if (note.title || note.description) {
      if (existingNote) {
        await updateNote(userData.uid, note,"EDIT_NOTE", dispatch, setShowLoader);
        setEditMode(false);
      } else {
        await addNote(userData.uid, note, dispatch, setShowLoader);
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
