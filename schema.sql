--database and table are created--

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

--this is run to see what the table looks like--
SELECT * FROM products;

--first row is added--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo","Electronics", 99.99, 485474);

--test to see how it looks--
SELECT * FROM products;

--adding data from Amazon Prime Day 2017--
--https://www.businessinsider.com/amazon-prime-day-2017-most-popular-products-tech-deals--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo Dot","Gadgets", 34.99, 794758);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot 7-in-1 Multi-Functional Pressure Cooker","Cooking", 139.95, 934456);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TechMatte MagGrip Air Vent Magnetic Universal Car Mount","Cell Phones", 7.99, 814872);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire HD Tablet","Gadgets", 69.99, 160089);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SanDisk 32GB Ultra Class Memory Card","Storage", 12.49, 52635);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sony XB950B1 Extra Bass Wireless Headphones with App Control","Headphones", 148, 369190);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iRobot Roomba 652 Robotic Vacuum Cleaner","Gadgets", 399.99, 14580);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Anker Bluetooth SoundBuds Headphones","Headphones", 27.99, 892777);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kindle Paperwhite","Gadgets", 189.99, 73299);

--updating department name for the first entry--
UPDATE products SET department_name = "Gadgets" WHERE item_id = 1;

SELECT * FROM products;

--altered price column so that decimal values only show two digits after point--
ALTER TABLE products MODIFY price DECIMAL(10,2) NOT NULL;

SELECT * FROM products;

--altering stock values bec theyr'e too high--
UPDATE products SET stock_quantity = 43 WHERE item_id = 1;

UPDATE products SET stock_quantity = 15 WHERE item_id = 2;

UPDATE products SET stock_quantity = 42 WHERE item_id = 3;

UPDATE products SET stock_quantity = 14 WHERE item_id = 4;

UPDATE products SET stock_quantity = 39 WHERE item_id = 5;

UPDATE products SET stock_quantity = 5 WHERE item_id = 6;

UPDATE products SET stock_quantity = 13 WHERE item_id = 7;

UPDATE products SET stock_quantity = 28 WHERE item_id = 8;

UPDATE products SET stock_quantity = 32 WHERE item_id = 9;

UPDATE products SET stock_quantity = 2 WHERE item_id = 10;

SELECT * FROM products;