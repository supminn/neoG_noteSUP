import { useDataContext } from "../Context/DataProvider";
import { NoteIcons } from "./NoteIcons"

export const NoteCard = ({ note }) => {
  const {dispatch} = useDataContext();
  return (
    <div className="card" style={{backgroundColor:note.color}} key={note._id}>
      <h3 className="note-title">{note.title}</h3>
      <p className="note-body">{note.description}</p>
      <NoteIcons note={note}/>
      <i className="fas fa-trash fa-lg secondary-txt" onClick={() => dispatch({type:"REMOVE_NOTE", payload:note})}></i>
    </div>
  );
};
