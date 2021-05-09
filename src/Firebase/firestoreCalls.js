import { firestore } from "./firebase";

export const fetchNotes = async (dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const data = await firestore.collection("notes").get();
    data.forEach((doc) => {
      let note = { ...doc.data(), id: doc.id };
      dispatch({ type: "SET_NOTE", payload: note });
      return note;
    });
  } catch (err) {
    console.error("Could not fetch data from firestore", err);
  } finally {
    setShowLoader(false);
  }
};

export const addNote = async (note, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const { id } = await firestore.collection("notes").add(note);
    note = { ...note, id };
    dispatch({ type: "ADD_NOTE", payload: note });
  } catch (error) {
    console.error("Error occured.", error);
  } finally {
    setShowLoader(false);
  }
};

export const updateNote = async (note, type, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const updatedNote = {
      title: note.title,
      description: note.description,
      label: note.label,
      color: note.color,
      pinFlag: note.pinFlag,
    };
    console.log(updatedNote);
    await firestore.collection("notes").doc(note.id).set(updatedNote);
    dispatch({ type, payload: note });
  } catch (error) {
    console.error("Error occured.", error);
  } finally {
    setShowLoader(false);
  }
};

export const deleteNote = async (note, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    await firestore.collection("notes").doc(note.id).delete();
    dispatch({ type: "DELETE_NOTE", payload: note });
  } catch (error) {
    console.error("Error occured.", error);
  } finally {
    setShowLoader(false);
  }
};
