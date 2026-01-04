// ======================== Assingment 4 ================================
// =========================== Part 1 ===================================

// file ==> part(1)Diagrma.svg

// ======================================================================
// =========================== Part 2 ===================================

// file ==> part(2)Diagrma.svg

// ======================================================================
// ===================== Part 3 (Node.js and MySQL) =====================

const express = require("express");
const mysql = require("mysql2");
let port = 5000;
const app = express();

// ======================= Return body ================================
app.use(express.json());

// =================== Connection with DB =============================
const connection = mysql.createConnection({
  host: "localhost",
  database: "retail_store",
  user: "root",
  password: "",
});

// == 2- Add a column “Category” to the Products table ==
let query_2 = `
Alter TABLE products
add COLUMN Category varchar(200) not null;
`;

// == 3- Remove the “Category” column from Products ==
let query_3 = `
Alter TABLE products
DROP COLUMN Category;
`;

// == 4- Change “ContactNumber” column in Suppliers to VARCHAR (15) ==
let query_4 = `
ALTER TABLE Suppliers
MODIFY COLUMN ContactNumber VARCHAR(15) NOT NULL;
`;

// == 5- Add a NOT NULL constraint to ProductName. ==
let query_5 = `
ALTER TABLE products
MODIFY COLUMN ProductName VARCHAR(200) NOT NULL;
`;

// == 6- Perform Basic Inserts ==
// ====== a ======
let query_6_insertIntoSupliers = `
INSERT INTO suppliers(SupplierName,ContactNumber)
VALUES ('FreshFoods',01001234567);
`;

// ====== b ======
let query_6_insertIntoProducts = `
INSERT INTO products(ProductName,Price,StockQuantity,SupplierID)
VALUES ('Milk',15.00,50,6),
('Bread',10.00,30,6),
('Eggs',20.00,40,6);
`;

// ====== c ======
let Milk_id = `
SELECT ProductID FROM products WHERE ProductName = 'Milk';
`;

let query_6_insertIntoSales = `
INSERT INTO sales (ProductID, QuantitySold, saleDate) 
VALUES (Milk_id, 2, '2025-05-20');
`;

// == 7- Update the price of 'Bread' to 25.00 ==
let query_7 = `
UPDATE products 
SET Price = 25.00
WHERE ProductName = 'Bread';
`;

let Bread_price = `
SELECT Price FROM products WHERE ProductName = 'Bread';
`;

// == 8- Delete the product 'Eggs' ==
let query_8 = `
DELETE FROM products 
WHERE ProductName = 'Eggs';
`;

// == 9- Retrieve the total quantity sold for each product ==
let query_9 = `
SELECT products.ProductName, SUM(sales.QuantitySold) as 'total quantity sold'
from products INNER JOIN sales WHERE products.ProductID = sales.ProductID
GROUP BY products.ProductName;
`;

// == 10- Retrieve the total quantity sold for each product ==
let query_10 = `
SELECT * FROM products ORDER BY StockQuantity DESC LIMIT 1;
`;

// == 11- Find suppliers with names starting with 'F' ==
let query_11 = `
SELECT * FROM suppliers WHERE SupplierName LIKE 'f%';
`;

// == 12- Show all products that have never been sold ==
let query_12 = `
SELECT * FROM products LEFT JOIN sales
ON products.ProductID = sales.ProductID
WHERE sales.QuantitySold IS NULL;
`;

// == 13- Get all sales along with product name and sale date ==
let query_13 = `
SELECT products.ProductName, sales.SaleDate
FROM products RIGHT JOIN sales
ON products.ProductID = sales.ProductID;
`;

// == 14- Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables ==
let createUser = `
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '123456';
`;

let givePermissions = `
GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';
FLUSH PRIVILEGES;
`;

// == 15- Revoke UPDATE permission from “store_manager” ==
let revokeUpdate = `
REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';
`;

// == 16- Grant DELETE permission to “store_manager” only on the Sales table ==
let dadfs = `
GRANT DELETE ON retail_store.sales TO 'store_manager'@'localhost';
FLUSH PRIVILEGES;
`;

// ==================== lesten to DB errors=============================
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DB Connected successfully...");
  }
});

// ====================== manage 404 page ===============================
app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: `404 URL ${req.originalUrl} page not found` });
});

// ====================== lesten to server ==============================
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
// ======================================================================
// ======================================================================

// ======================= Part 4 (Bouns) ===============================

// solution in bouns.js file

// ======================================================================
