import { combineReducers } from "redux";
import books from "./books";
import googleBooks from "./google-books";

export default combineReducers({
  books, googleBooks,
});
