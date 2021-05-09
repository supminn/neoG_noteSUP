import { useEffect, useState } from "react";
import { useAuthContext, useDataContext } from "../../Context";
import { NewNote, NoteIcons } from "../";
import { deleteNote } from "../../Firebase/firestoreCalls";

export const NoteCard = ({ note }) => {
  const { dispatch } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const { userData, setShowLoader } = useAuthContext();

  useEffect(() => {
    const modal = document.querySelector(".modal-container");
    window.onclick = (event) => {
      if (event.target === modal) {
        setEditMode(false);
      }
    };
  }, [editMode]);

  return (
    <div className="card" style={{ backgroundColor: note.color }} key={note.id}>
      <div className="note-editor" onClick={() => setEditMode(true)}>
        <h3 className="note-title">{note.title}</h3>
        <p className="note-body">{note.description}</p>
      </div>
      <NoteIcons note={note} />
      <i
        className="fas fa-trash fa-lg secondary-txt"
        onClick={() => deleteNote(userData.uid, note, dispatch, setShowLoader)}
      ></i>
      {editMode && (
        <div className="modal-container">
          <NewNote existingNote={note} setEditMode={setEditMode} />
        </div>
      )}
    </div>
  );
};
