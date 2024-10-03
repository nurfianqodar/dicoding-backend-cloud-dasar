const { Database } = require("./database");
const { Book } = require("./entities");
const { ApiError } = require("./utils");

const bookDb = new Database();

/**
 * Create One Book
 */
function createOne(request, h) {
  const newBookData = request.payload;

  try {
    const newBook = new Book(newBookData);
    bookDb.insertOne(newBook.id, newBook);

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: newBook.id,
        },
      })
      .code(201);
  } catch (err) {
    // TODO Error Handling
    if (err instanceof ApiError) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(err.statusCode);
    } else {
      return h.response({
        status: "fail",
        message: "Internal server error",
      });
    }
  }
}

/**
 * List All Books
 */
function list(request, h) {
  try {
    const query = request.query;
    let books = [];

    // List All Books
    if (Object.keys(query).length === 0) {
      books = bookDb.findMany();
    } else {
      // Find By Query
      if (query.name) {
        books = bookDb.findContainName(query.name);
      } else if (query.finished) {
        const finishedStatus = query.finished !== "0";
        books = bookDb.findByFinishedStatus(finishedStatus);
      } else if (query.reading) {
        const readingStatus = query.reading !== "0";
        books = bookDb.findByReadingStatus(readingStatus);
      }
    }

    return h
      .response({
        status: "success",
        data: { books },
      })
      .code(200);
  } catch (err) {
    // Error Logging
    console.log("Error from list book handler");
    console.error(err);

    return h
      .response({
        status: "fail",
        message: "Internal server error",
      })
      .code(500);
  }
}

/**
 * Get Detail Book By ID
 */
function getById(request, h) {
  const bookId = request.params.bookId;

  try {
    const book = bookDb.findUnique(bookId);
    return h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
  } catch (err) {
    if (err instanceof ApiError) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(err.statusCode);
    } else {
      return h.response({
        status: "fail",
        message: "Internal server error",
      });
    }
  }
}

/**
 * Update One Book
 */
function updateOne(request, h) {
  const bookId = request.params.bookId;
  const data = request.payload;

  try {
    bookDb.updateOne(bookId, data);
    return h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(err.statusCode);
    } else {
      return h.response({
        status: "fail",
        message: "Internal server error",
      });
    }
  }
}

/**
 * Delete One Book
 */
function deleteOne(request, h) {
  const bookId = request.params.bookId;
  try {
    bookDb.deleteOne(bookId);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  } catch (err) {
    if (err instanceof ApiError) {
      return h
        .response({
          status: "fail",
          message: err.message,
        })
        .code(err.statusCode);
    } else {
      return h.response({
        status: "fail",
        message: "Internal server error",
      });
    }
  }
}

module.exports = { createOne, getById, list, updateOne, deleteOne };
