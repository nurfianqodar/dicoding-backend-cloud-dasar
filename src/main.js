"use strict";

const Hapi = require("@hapi/hapi");
const {
  createOne,
  deleteOne,
  getById,
  list,
  updateOne,
} = require("./handlers");

const HOST = "localhost";
const PORT = 9000;

// Server Initialization
const init = async () => {
  // Create Server ================
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  // Routing ======================

  // -- Create Book
  server.route({
    method: "POST",
    path: "/books",
    handler: createOne,
  });

  // -- List Books
  server.route({
    method: "GET",
    path: "/books",
    handler: list,
  });

  // -- Get Book By Id
  server.route({
    method: "GET",
    path: "/books/{bookId}",
    handler: getById,
  });

  // -- Update Book
  server.route({
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateOne,
  });

  // -- Delete Book
  server.route({
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteOne,
  });

  // Start Server
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

// Exit On Unhandeled Rejection ======
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

// Start
init();
