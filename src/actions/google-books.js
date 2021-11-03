import { CONSUME_BOOKS } from "./types";

import BooksDataService from "../services/books.service";

export const consumeBooks = (searchText) => async (dispatch) => {
  try {
    const res = await BooksDataService.consumeAll(searchText);
    console.log(res.data[0].items);

    dispatch({
      type: CONSUME_BOOKS,
      payload: res.data[0].items,
    });
  } catch (err) {
    console.log(err);
  }
};
