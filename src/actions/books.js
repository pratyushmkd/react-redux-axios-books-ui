import { CREATE_BOOK, RETRIEVE_BOOKS, UPDATE_BOOK, DELETE_BOOK } from "./types";

import BooksDataService from "../services/books.service";

export const createBook =
  (title, description, author, price, quantity, image) => async (dispatch) => {
    try {
      const res = await BooksDataService.create({
        title,
        description,
        author,
        price,
        quantity,
        image,
      });

      dispatch({
        type: CREATE_BOOK,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveBooks = () => async (dispatch) => {
  try {
    const res = await BooksDataService.getAll();

    dispatch({
      type: RETRIEVE_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = (id, data) => async (dispatch) => {
  try {
    const res = await BooksDataService.update(id, data);

    dispatch({
      type: UPDATE_BOOK,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await BooksDataService.delete(id);

    dispatch({
      type: DELETE_BOOK,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

// export const deleteAllBooks = () => async (dispatch) => {
//   try {
//     const res = await BooksDataService.deleteAll();

//     dispatch({
//       type: DELETE_ALL_BOOKS,
//       payload: res.data,
//     });

//     return Promise.resolve(res.data);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

export const findBooksByTitle = (text) => async (dispatch) => {
  try {
    const res = await BooksDataService.findByTitle(text);

    dispatch({
      type: RETRIEVE_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findBooksByAuthor = (text) => async (dispatch) => {
  try {
    const res = await BooksDataService.findByAuthor(text);

    dispatch({
      type: RETRIEVE_BOOKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const upload = (image, author) => async (dispatch) => {
//   try {
//     const res = await BooksDataService.upload(image, author);

//     dispatch({
//       type: RETRIEVE_BOOKS,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
