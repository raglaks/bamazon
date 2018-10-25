USE bamazon;

CREATE TABLE departments(
	department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT(10) NOT NULL
);