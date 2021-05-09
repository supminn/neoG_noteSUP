import { useEffect } from "react";
import Loader from "react-loader-spinner";
import { NewNote, Pinned, Others } from "../";
import { useAuthContext, useDataContext } from "../../Context";
import { fetchLabels, fetchNotes } from "../../Firebase/firestoreCalls";
import { LabelContainer } from "../Label/LabelContainer";

export const NotesContainer = () => {
  const { dispatch } = useDataContext();
  const { userData, showLoader, setShowLoader } = useAuthContext();

  useEffect(() => {
    document.title = "NoteSUP | Home";
    fetchNotes(userData.uid, dispatch, setShowLoader);
    fetchLabels(userData.uid, dispatch, setShowLoader);
  }, []);

  return showLoader ? (
    <div className="loader-container">
      {" "}
      <Loader type="Oval" color="#00BFFF" height={80} width={80} />{" "}
    </div>
  ) : (
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
