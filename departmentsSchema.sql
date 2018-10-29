USE bamazon;

CREATE TABLE departments(
	department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT(10) NOT NULL
);

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
FROM products
INNER JOIN departments ON 
products.item_id = departments.department_id;

--query to get all exisitng departments with sum total of overhead costs
SELECT department_name, SUM(over_head_costs)
FROM departments
GROUP BY department_name
ORDER BY SUM(over_head_costs) DESC;

--query to join overhead costs, item ids, department names and product sales
SELECT products.item_id, departments.department_name, departments.over_head_costs, products.product_sales 
FROM departments
INNER JOIN
products ON products.item_id = departments.department_id
GROUP BY products.item_id, departments.department_name, departments.over_head_costs, products.product_sales;

--added total profit column
SELECT products.item_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales-departments.over_head_costs AS total_profit 
FROM departments
INNER JOIN
products ON products.item_id = departments.department_id;

--this query sums up totals for product sales and overhead BY DEPARTMENT and then joins the columns and calculates total profit
SELECT departments.department_name, SUM(departments.over_head_costs) AS net_costs, SUM(products.product_sales) AS net_sales, (SUM(products.product_sales) - SUM(departments.over_head_costs)) AS total_profit
FROM departments 
INNER JOIN products 
ON products.item_id = departments.department_id 
GROUP BY department_name 
ORDER BY total_profit DESC;
