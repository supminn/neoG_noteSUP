// import { v4 as uuid } from "uuid";

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_FILTER":
      return { ...state, filter: payload };

    case "SET_NOTE":
      return payload.pinFlag
        ? { ...state, pinned: state.pinned.concat(payload) }
        : { ...state, others: state.others.concat(payload) };

    case "ADD_NOTE":
      return payload.pinFlag
        ? { ...state, pinned: state.pinned.concat(payload) }
        : { ...state, others: state.others.concat(payload) };

    case "EDIT_NOTE": {
      const pinnedNote = state.pinned.some((note) => note.id === payload.id);
      return pinnedNote
        ? payload.pinFlag
          ? {
              ...state,
              pinned: state.pinned.map((note) =>
                note.id === payload.id ? { ...payload } : note
              ),
            }
          : {
              ...state,
              pinned: state.pinned.filter((note) => note.id !== payload.id),
              others: state.others.concat(payload),
            }
        : payload.pinFlag
        ? {
            ...state,
            others: state.others.filter((note) => note.id !== payload.id),
            pinned: state.pinned.concat(payload),
          }
        : {
            ...state,
            others: state.others.map((note) =>
              note.id === payload.id ? { ...payload } : note
            ),
          };
    }

    case "TOGGLE_PIN":
      return payload.pinFlag
        ? {
            ...state,
            others: state.others.filter((note) => note.id !== payload.id),
            pinned: state.pinned.concat({
              ...payload,
              pinFlag: payload.pinFlag,
            }),
          }
        : {
            ...state,
            pinned: state.pinned.filter((note) => note.id !== payload.id),
            others: state.others.concat({
              ...payload,
              pinFlag: payload.pinFlag,
            }),
          };

    case "DELETE_NOTE": {
      const pinnedNote = state.pinned.some((note) => note.id === payload.id);
      return pinnedNote
        ? {
            ...state,
            pinned: state.pinned.filter((note) => note.id !== payload.id),
          }
        : {
            ...state,
            others: state.others.filter((note) => note.id !== payload.id),
          };
    }

    case "ADD_LABEL":
      const newLabel = { id: state.labels.length + 1, name: payload };
      return { ...state, labels: state.labels.concat(newLabel) };

    default:
      return state;
  }
};
