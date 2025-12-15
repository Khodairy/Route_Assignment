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
  // ========= GET Users =========
  if (req.method === "GET" && req.url === "/user") {
    res.writeHead(200, { "content-type": "application/json" });
    res.write(JSON.stringify({ statusCode: 200, data: users }));
    return res.end();
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
      let parsingNewUser = ``;
      parsingNewUser = JSON.parse(newUser);

      // ========== check if the user found in json file ========
      let userExist = users.find((user) => {
        return user.email === parsingNewUser.email;
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
        users.push(parsingNewUser);
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

  fs.writeFileSync(
    path.resolve("./logs.txt"),
    `\nServer is closed at ${new Date().toLocaleString()}`,
    { flags: "a" }
  );
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

// ===================================== Part 3 ========================================

// solution in bonus.js file

// ===================================== Part 4 ========================================

// solution in bonus.js file

//======================================================================================
