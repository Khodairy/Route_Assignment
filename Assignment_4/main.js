// ====================== Assingment 4 ==============================
// ========================= Part 1 =================================

const express = require("express");
const app = express();
let port = 4000;

const path = require("node:path");
const fs = require("node:fs");

// ============== Reading All Users from users.json file =============
let users = fs.readFileSync(path.join(__dirname, "users.json"), {
  encoding: "utf-8",
});

users = JSON.parse(users);

// =================== Writing on users.json file ====================
let usersWritting = (varible) => {
  fs.writeFileSync(
    path.join(__dirname, "users.json"),
    JSON.stringify(varible, null, 2),
    {
      encoding: "utf-8",
    }
  );
};

// ======================= Return body ================================
app.use(express.json());

// ======================= 1- API That post new User ==================
app.post("/user", (req, res, next) => {
  let { id, name, email, age } = req.body;

  let userIndex = users.findIndex((user) => {
    return user.email === email;
  });

  if (userIndex !== -1) {
    return res
      .status(409)
      .json({ status: 409, message: "This email already exists" });
  } else {
    users.push({ id, name, email, age });
    usersWritting(users);
    return res.status(201).json({
      status: 201,
      message: "Add user successfully",
      user: { id, name, email, age },
    });
  }
});

// ==================== 2- API That Updating user by id =================
app.patch("/user/:id", (req, res, next) => {
  const { id } = req.params;

  let { name, email, age } = req.body;

  let userIndex = users.findIndex((user) => {
    return user.id == id;
  });

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ status: 404, message: "This User Not Found" });
  } else {
    // ===== add user to users array =====
    users[userIndex] = {
      ...users[userIndex],
      ...(name && { name }),
      ...(email && { email }),
      ...(age && { age }),
    };
    usersWritting(users);
    return res.status(200).json({
      status: 200,
      message: "Updating user successfully",
      user: { id, name, email, age },
    });
  }
});

// ==================== 3- API That Deleting user by id =================
app.delete("/user/:id", (req, res, next) => {
  const { id } = req.params;

  let userIndex = users.findIndex((user) => {
    return user.id == id;
  });

  if (userIndex === -1) {
    return res
      .status(404)
      .json({ status: 404, message: "This User Not Found" });
  } else {
    // ===== delete user from users array =====
    let deletedUser = users.splice(userIndex, 1);
    usersWritting(users);
    return res.status(200).json({
      status: 200,
      message: "deleting user successfully",
      user: deletedUser[0],
    });
  }
});

// ============= 4- API that get user by name (query params) ============
app.get(`/user/getByName/`, (req, res, next) => {
  const { name } = req.query;

  let userIndex = users.findIndex((user) => {
    return user.name === name;
  });
  console.log(userIndex);

  if (userIndex === -1) {
    return res.status(404).json({ status: 404, message: "404 User Not Found" });
  }

  res.status(201).json({ status: 201, user: users[userIndex] });
});

// ======================= 5- API that get all users ====================
app.get("/user", (req, res, next) => {
  if (minAge === undefined) {
    return res.status(201).json({ status: 201, users });
  }

  // ============= 6- API that filters users by minimum age ==============
  const { minAge } = req.query;
  let filterUsers = users.filter((user) => {
    return user.age > minAge;
  });
  res.status(201).json({ status: 201, users: filterUsers });
});

// ============= 7- API that get user by id (path params) ============
app.get(`/user/:id`, (req, res, next) => {
  const { id } = req.params;

  let userIndex = users.findIndex((user) => {
    return user.id == id;
  });
  console.log(userIndex);

  if (userIndex === -1) {
    return res.status(404).json({ status: 404, message: "404 User Not Found" });
  }

  res.status(200).json({ status: 200, user: users[userIndex] });
});

// ====================== manage 404 page ===============================
app.use((req, res, next) => {
  res.status(404).json({ message: "404 page not found" });
});

// ====================== lesten to server ==============================
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// ======================================================================
// ======================================================================

// =========================== Part 2 ===================================

// solution of ERD diagram in {Assingment_diagram.drawio.svg} file

// =======================================================================

// =========================== Part 3 ====================================

// solution in bonus.js file

// =======================================================================
