import { v4 as uuid } from "uuid";

export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_NOTE": 
        payload._id = uuid(); 
      return payload.pinFlag
        ? { ...state, pinned: state.pinned.concat(payload) }
        : { ...state, others: state.others.concat(payload) };
    // case "CLEAR_NOTE":
    //     return {...state, note:{
    //         title:"",
    //         desciption:"",
    //         label:"Personal",
    //         color:"",
    //         pinFlag: false
    //     }}
    default:
      return state;
  }
};
