import { useEffect } from "react";
import { NewNote, Pinned, Others } from "../";
import { LabelContainer } from "../Label/LabelContainer";

export const NotesContainer = () => {
  useEffect(() => {
    document.title = "NoteSUP | Home";
  }, []);

  return (
    <>
      <div className="desktop-labels">
        <LabelContainer />
      </div>
      <div className="notes-container">
        <NewNote />
        <Pinned />
        <Others />
      </div>
    </>
  );
};
