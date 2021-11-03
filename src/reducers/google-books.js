import { CONSUME_BOOKS } from "../actions/types";

const initialState = [];

function GoogleBookReducer(googleBooks = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONSUME_BOOKS:
      return payload;

    default:
      return googleBooks;
  }
}

export default GoogleBookReducer;
