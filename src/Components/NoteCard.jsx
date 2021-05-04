import { NoteIcons } from "./NoteIcons"

export const NoteCard = ({ note }) => {
  return (
    <div className="card" style={{backgroundColor:note.color}} key={note._id}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-body">{note.description}</p>
      <NoteIcons note={note}/>
    </div>
  );
};
