import { v4 as uuid } from "uuid";

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_NOTE":
      payload._id = uuid();
      return payload.pinFlag
        ? { ...state, pinned: state.pinned.concat(payload) }
        : { ...state, others: state.others.concat(payload) };
    case "TOGGLE_PIN":
      return payload.pinFlag
        ? {
            ...state,
            pinned: state.pinned.filter((note) => note._id !== payload._id),
            others: state.others.concat({
              ...payload,
              pinFlag: !payload.pinFlag,
            }),
          }
        : {
            ...state,
            others: state.others.filter((note) => note._id !== payload._id),
            pinned: state.pinned.concat({
              ...payload,
              pinFlag: !payload.pinFlag,
            }),
          };
    case "SET_COLOR": {
      const pinnedNote = state.pinned.some((note) => note._id === payload._id);
      return pinnedNote
        ? {
            ...state,
            pinned: state.pinned.map((note) =>
              note._id === payload._id
                ? { ...note, color: payload.shade }
                : note
            ),
          }
        : {
            ...state,
            others: state.others.map((note) =>
              note._id === payload._id
                ? { ...note, color: payload.shade }
                : note
            ),
          };
    }
    case "ADD_LABEL":
      const newLabel = { _id: state.labels.length + 1, name: payload };
      return { ...state, labels: state.labels.concat(newLabel) };
    case "SET_LABEL": {
      const pinnedNote = state.pinned.some((note) => note._id === payload._id);
      return pinnedNote
        ? {
            ...state,
            pinned: state.pinned.map((note) =>
              note._id === payload._id
                ? { ...note, label: payload.label }
                : note
            ),
          }
        : {
            ...state,
            others: state.others.map((note) =>
              note._id === payload._id
                ? { ...note, label: payload.label }
                : note
            ),
          };
    }
    case "SET_FILTER":
      return { ...state, filter: payload };
    default:
      return state;
  }
};
