const { nanoid } = require("nanoid");
const { ApiError } = require("./utils");

class Book {
  /**
   * Create New Book
   */
  constructor(data) {
    // Validation
    // Check name
    if (!data.name) {
      throw new ApiError("Gagal menambahkan buku. Mohon isi nama buku", 400);
    }

    // Check readPage <= pageCount
    if (!(data.readPage <= data.pageCount)) {
      throw new ApiError(
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        400
      );
    }

    this.id = nanoid(10);
    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.finished = data.readPage === data.pageCount;
    this.reading = data.reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(data) {
    // Validation
    // Check name
    if (!data.name) {
      throw new ApiError("Gagal memperbarui buku. Mohon isi nama buku", 400);
    }

    // Check readPage <= pageCount
    if (!(data.readPage <= data.pageCount)) {
      throw new ApiError(
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        400
      );
    }

    this.name = data.name;
    this.year = data.year;
    this.author = data.author;
    this.summary = data.summary;
    this.publisher = data.publisher;
    this.pageCount = data.pageCount;
    this.readPage = data.readPage;
    this.finished = data.readPage === data.pageCount;
    this.reading = data.reading;
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = { Book };
