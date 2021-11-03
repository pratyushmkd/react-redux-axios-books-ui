import http from "../http-common";

class BooksDataService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  update(id, data) {
    return http.put(`/${id}`, data);
  }

  delete(id) {
    return http.delete(`/${id}`);
  }

  findByTitle(text) {
    return http.get(`/title?title=${text}`);
  }

  findByAuthor(text) {
    return http.get(`/author?author=${text}`);
  }

  upload(image, author) {
    let formData = new FormData();
    formData.append("file", image);
    formData.append("userid", author);
    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  consumeAll(searchText) {
    return http.get(`/search?searchText=${searchText}`);
  }
}

export default new BooksDataService();
