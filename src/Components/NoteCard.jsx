export const NoteCard = ({ note }) => {
  return (
    <div className="card" style={{backgroundColor:note.color}} key={note._id}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
    </div>
  );
};
