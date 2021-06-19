import { firestore } from "./firebase";

export const fetchNotes = async (uid, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const data = await firestore.collection(`users/${uid}/notes`).get();
    data.forEach((doc) => {
      let note = { ...doc.data(), id: doc.id };
      dispatch({ type: "SET_NOTE", payload: note });
    });
  } catch (err) {
    console.error("Could not fetch data from firestore", err);
  } finally {
    setShowLoader(false);
  }
};

export const fetchLabels = async (uid, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const data = await firestore.collection(`users/${uid}/labels`).orderBy("name","asc").get();
    let label;
    if (data.docs.length > 0) {
      data.forEach((doc) => {
        label = { ...doc.data(), id: doc.id };
        dispatch({ type: "ADD_LABEL", payload: label });
      });
    } else {
      addLabel(uid, "All Notes", dispatch, setShowLoader);
    }
  } catch (err) {
    console.error("Could not fetch labels from firestore", err);
  } finally {
    setShowLoader(false);
  }
};

export const addNote = async (uid, note, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const { id } = await firestore.collection(`users/${uid}/notes`).add(note);
    note = { ...note, id };
    dispatch({ type: "ADD_NOTE", payload: note });
  } catch (error) {
    console.error("Error occured while adding new note.", error);
  } finally {
    setShowLoader(false);
  }
};

export const updateNote = async (uid, note, type, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const updatedNote = {
      title: note.title,
      description: note.description,
      label: note.label,
      color: note.color,
      pinFlag: note.pinFlag,
    };
    await firestore
      .collection(`users/${uid}/notes`)
      .doc(note.id)
      .set(updatedNote);
    dispatch({ type, payload: note });
  } catch (error) {
    console.error("Error occured while updating the note.", error);
  } finally {
    setShowLoader(false);
  }
};

export const deleteNote = async (uid, note, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    await firestore.collection(`users/${uid}/notes`).doc(note.id).delete();
    dispatch({ type: "DELETE_NOTE", payload: note });
  } catch (error) {
    console.error("Error occured. Unable to delete note.", error);
  } finally {
    setShowLoader(false);
  }
};

export const addLabel = async (uid, name, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    const { id } = await firestore
      .collection(`users/${uid}/labels`)
      .add({ name });
    let label = { id, name };
    dispatch({ type: "ADD_LABEL", payload: label });
  } catch (error) {
    console.error("Error occured while creating new label.", error);
  } finally {
    setShowLoader(false);
  }
};

export const deleteLabel = async (uid, label, dispatch, setShowLoader) => {
  try {
    setShowLoader(true);
    await firestore.collection(`users/${uid}/labels`).doc(label.id).delete();
    dispatch({ type: "DELETE_LABEL", payload: label });
  } catch (error) {
    console.error("Error occured. Unable to delete label.", error);
  } finally {
    setShowLoader(false);
  }
};