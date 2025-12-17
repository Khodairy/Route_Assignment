// ========================= Assignment 3 (Node.JS Basics) ==========================

const path = require("node:path");
const fs = require("node:fs");

// ===================================== Part 1 ========================================

// 1. Use a readable stream to read a file in chunks and log each chunk.

// let stream = fs.createReadStream(path.resolve("./data.txt"), {
//   highWaterMark: 50,
// });
// stream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// =====================================================================================

// 2. Use readable and writable streams to copy content from one file to another.

// let readstream = fs.createReadStream(
//   path.resolve("./readData.txt"),
//   { encoding: "utf-8" },
//   {
//     highWaterMark: 50,
//   }
// );
// readstream.on("data", (chunk) => {
//   console.log(chunk.toString());
//   writeStream.write(chunk);
// });

// let writeStream = fs.createWriteStream(path.resolve("./writeData.txt"), {
//   flags: "a",
// });

// writeStream.on("finish", () => {
//   console.log("Stream is written successfully");
// });

// =====================================================================================

// 3. Create a pipeline that reads a file, compresses it, and writes it to another file.
// =========== make a compresses stream ===========
// const zlib = require("node:zlib");

// // =========== compresses stream ===========
// let gzib = zlib.createGzip();

// // =========== uncompressed stream ===========
// const gunZib = zlib.createGunzip();

// let readstream = fs.createReadStream(
//   path.resolve("./readData.txt"),
//   { encoding: "utf-8" },
//   {
//     highWaterMark: 50,
//   }
// );
// readstream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// let writeStream = fs.createWriteStream(path.resolve("./writeData.txt"), {
//   flags: "a",
// });

// readstream.pipe(gzib).pipe(gunZib).pipe(writeStream);

// writeStream.on("finish", () => {
//   console.log("Stream is written successfully");
// });

// =====================================================================================
// =====================================================================================
// =====================================================================================

// ===================================== Part 2 ========================================
// Simple CRUD Operations Using HTTP

const http = require("node:http");
const port = 4000;

// ========= get users from JSON file =========
let users = fs.readFileSync(path.resolve("./user.json"), { encoding: "utf-8" });
users = JSON.parse(users);

// ============== Handle Requests ==============
let server = http.createServer((req, res) => {
  // ========= GET All Users =========
  if (req.method === "GET" && req.url === "/user") {
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify({ statusCode: 200, data: users }));
    return res.end();
  }
  // ========= GET User By Id =========
  if (req.method === "GET" && req.url.startsWith("/user/")) {
    const id = Number(req.url.split("/")[2]);

    // check valid id
    if (isNaN(id)) {
      res.writeHead(400, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          statusCode: 400,
          message: "Invalid user id",
        })
      );
    }
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(
        JSON.stringify({
          statusCode: 404,
          message: "User not found",
        })
      );
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.write(JSON.stringify({ statusCode: 200, data: users[userIndex] }));
      return res.end();
    }
  }
  // ========= POST Users =========
  else if (req.method === "POST" && req.url === "/user") {
    // ====== get the user witch added for check ====
    let newUser = ``;
    req.on("data", (chunk) => {
      newUser += chunk;
    });

    req.on("end", () => {
      let { id, name, email, age } = JSON.parse(newUser);

      // ========== check if the user found in json file ========
      let userExist = users.find((user) => {
        return user.email === email;
      });
      if (userExist) {
        // ======== if the user found =========
        res.writeHead(409, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            statusCode: 409,
            message: "the user is already exist",
          })
        );
        return res.end();
      } else {
        // ======== if the user not found =======
        // ===== add user to users array =====
        users.push({ id, name, email, age });
        // ===== add user to json file =======
        fs.writeFileSync(
          path.resolve("./user.json"),
          JSON.stringify(users, null, 2),
          {
            encoding: "utf-8",
          }
        );
        res.writeHead(200, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            statusCode: 200,
            message: "a new user added successfully",
          })
        );
        return res.end();
      }
    });
  }
  // ========= UPDATE Users =========
  else if (req.method === "PATCH" && req.url === "/user") {
    // ====== get the user witch added for check ====
    let newUser = ``;
    req.on("data", (chunk) => {
      newUser += chunk;
    });

    req.on("end", () => {
      let { id, name, email, age } = JSON.parse(newUser);

      // ========== check if the userId found in json file ========
      let userIndex = users.findIndex((user) => {
        return user.id === id;
      });
      if (userIndex === -1) {
        // ======== if the user not found =======
        res.writeHead(404, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            statusCode: 404,
            message: "User not found",
          })
        );
        return res.end();
      } else {
        // ======== if the user found =========
        // ===== add user to users array =====
        users[userIndex] = {
          ...users[userIndex],
          ...(name && { name }),
          ...(email && { email }),
          ...(age && { age }),
        };
        // ===== add user to json file =======
        fs.writeFileSync(
          path.resolve("./user.json"),
          JSON.stringify(users, null, 2),
          {
            encoding: "utf-8",
          }
        );
        res.writeHead(200, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            statusCode: 200,
            message: "the user updated successfully",
          })
        );
        return res.end();
      }
    });
  }
  // ========= DELETE Users by id =========
  else if (req.method === "DELETE" && req.url === "/user") {
    // ====== get the user witch added for check ====
    let id = ``;
    req.on("data", (chunk) => {
      id += chunk;
    });

    req.on("end", () => {
      const { id: userId } = JSON.parse(id);

      // ========== check if the userId found in json file ========
      let userIndex = users.findIndex((user) => {
        return user.id === userId;
      });
      if (userIndex === -1) {
        // ======== if the user not found =======
        res.writeHead(404, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            statusCode: 404,
            message: "User not found",
          })
        );
        return res.end();
      } else {
        // ======== if the user found =========
        // ===== add user to users array =====
        const deletedUser = users.splice(userIndex, 1);

        // ===== add user to json file =======
        fs.writeFileSync(
          path.resolve("./user.json"),
          JSON.stringify(users, null, 2),
          {
            encoding: "utf-8",
          }
        );
        res.writeHead(200, { "content-type": "application/json" });
        res.write(
          JSON.stringify({
            statusCode: 200,
            message: "User deleted successfully",
            data: deletedUser[0],
          })
        );
        return res.end();
      }
    });
  }
  // ========= GET 404 Page =========
  else {
    res.writeHead(404, { "content-type": "application/json" });
    res.write(
      JSON.stringify({ statusCode: 404, message: "page not found..." })
    );
    return res.end();
  }
});

// ============== Handle listen to server ==============
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// ============== Handle Close server ==============
server.on("close", () => {
  console.log("Server is closed");
});

// ============== Handle Errors ==============
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log("Port is in use, trying again...");
    setTimeout(() => {
      server.close();
      server.listen(port);
    }, 1000);
  } else {
    console.error(error);
  }
});

// =====================================================================================
// =====================================================================================
// =====================================================================================

// ===================================== Part 3 ========================================
// 1. What is the Node.js Event Loop?
//====> The Node.js Event Loop is the core mechanism that allows Node.
//      js to handle many operations concurrently using a single thread, without blocking execution.

// 2. What is Libuv and What Role Does It Play in Node.js?
//====> Libuv is a C-based library that acts as the engine room of Node.js.
//      It provides the infrastructure needed to handle asynchronous operations.

// 3. How Does Node.js Handle Asynchronous Operations Under the Hood?
//====> Node.js handles asynchronous operations using a single-threaded event loop powered by Libuv.
//      it store asynchronous operations in a queues and start to execute
//      this operations in order after executing all of synchronous operations.

// 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js?
//====> - Call Stack executes synchronous JavaScript code immediately
//      - Event Queue holds callbacks from completed async operations waiting to run.
//      - Event Loop monitors the Call Stack and moves callbacks from the Event Queue to the stack when it’s empty.

// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Size?
//====> The Node.js Thread Pool is a set of worker threads managed by Libuv to handle CPU-intensive
//      or blocking tasks (such as fs, crypto, and zlib) without blocking the Event Loop.

// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution?
//====> - Node.js executes blocking (synchronous) code directly on the Call Stack, which can pause the Event Loop and delay other tasks.
//      - Non-blocking (asynchronous) operations are delivered to Libuv and executed later by the Event Loop.

// =====================================================================================
// =====================================================================================
// =====================================================================================

// ===================================== Part 4 ========================================

// solution in bonus.js file

//======================================================================================
