const { ApiError } = require("./utils");

class Database {
  db;

  constructor() {
    this.db = new Map();
  }

  insertOne(id, data) {
    this.db.set(id, data);
  }

  findMany() {
    return this._findBooks(() => true);
  }

  findByReadingStatus(readingStatus) {
    return this._findBooks((book) => book.reading === readingStatus);
  }

  findByFinishedStatus(finishedStatus) {
    return this._findBooks((book) => book.finished === finishedStatus);
  }

  findContainName(name) {
    return this._findBooks((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  findUnique(id) {
    const book = this.db.get(id);
    if (!book) {
      throw new ApiError("Buku tidak ditemukan", 404);
    } else {
      return book;
    }
  }

  updateOne(id, data) {
    const book = this.db.get(id);
    if (!book) {
      throw new ApiError("Gagal memperbarui buku. Id tidak ditemukan", 404);
    }
    book.update(data);
  }

  deleteOne(id) {
    const book = this.db.get(id);
    if (!book) {
      throw new ApiError("Buku gagal dihapus. Id tidak ditemukan", 404);
    }
    this.db.delete(id);
  }

  // Private method
  _findBooks(condition) {
    const books = [];
    this.db.forEach((book, bookId) => {
      if (condition(book)) {
        books.push({ id: bookId, name: book.name, publisher: book.publisher });
      }
    });
    return books;
  }
}

module.exports = { Database };
