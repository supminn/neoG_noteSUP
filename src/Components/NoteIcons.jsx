
export const NoteIcons = ({ note, setNote }) => {
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
        onClick={() => setNote((note) => ({ ...note, pinFlag: !note.pinFlag }))}
      ></i>
      <div className="palette-container">
        <i className="fas fa-palette fa-lg primaryBg-txt"></i>
          <div className="color-palette">
            {colors.map((shade) => (
              <i
                className="fas fa-circle fa-lg"
                style={{ color: shade }}
                key={shade}
                onClick={() => setNote((note) => ({ ...note, color: shade }))}
              ></i>
            ))}
          </div>
      </div>
    </div>
  );
};
