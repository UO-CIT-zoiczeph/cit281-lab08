/*
    CIT 281 Lab 8
    Name: Zoe Turnbull
*/

/* VARIABLES & IMPORTS */
// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require("fastify")();

// #2 TODO: Declare fetch object from node-fetch
const fetch = require("node-fetch");

/* REQUESTS */
fastify.get("/photos", (request, reply) => {
  // #3 TODO:
  // Adapt the following code to attempt to retrieve
  // all photos from JSONPlaceholder site
  // using fetch, and handle returned Promise using:
  // - two .then() chain methods, return 200
  // - single .catch() chain method, return 404
    function getPhotos() {
        return new Promise((resolve, reject) =>
            fetch("https://jsonplaceholder.typicode.com/photos")
            .then(
                (response) => response.json()
                )
            .then(
                photos = (json) => {const photos = new Array(json); return photos},
                reply
                .code(200)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: "", statusCode: 200 , photos: photos}))
            .catch(
                reply
                .code(404)
                .header("Content-Type", "text/json; charset=utf-8")
                .send({ error: "Page not found.", statusCode: 404, photos: [] })
            )
        );
    }

    getPhotos();
});

fastify.get("/photos/:id", (request, reply) => {
  // #4 TODO:
  // Adapt the following code to attempt to retrieve
  // a single photo from JSONPlaceholder site
  // using fetch, and handle returned Promise using:
  // - single .then() chain method, return 200
  // - single .catch() chain method, return 404
  // You may also try to use Object.keys() to
  // ensure JSONPlaceholder returns an object with
  // properties. An empty object returned from
  // JSONPlaceholder means that the passed photo ID
  // was invalid. Your server would also return
  // a 404 status code for an invalid Photo ID.

  function getPhoto() {
    const { id = "" } = request.params;
    return new Promise((resolve, reject) =>
        fetch("https://jsonplaceholder.typicode.com/photos")
        .then(
            (response) => response.json()
            )
        .then(
            photos = (json) => {const photos = new Array(json); return photos},
            reply
            .code(200)
            .header("Content-Type", "text/json; charset=utf-8")
            .send({ error: "", statusCode: 200 , photos: photos[id]}))
        .catch(
            reply
            .code(404)
            .header("Content-Type", "text/json; charset=utf-8")
            .send({ error: "Page not found.", statusCode: 404, photos: {} })
        )
    );
}

getPhoto();
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
