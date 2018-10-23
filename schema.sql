CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT(10) NOT NULL
);

