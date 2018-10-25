const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",

    database: "bamazon"
});

connection.connect(function (err) {

    if (err) throw err;

    console.log("Connected as id " + connection.threadId + ".\n");

    manageMenu();

});

function manageMenu() {

    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option: ",
            choices: ["View products", "View low inventory", "Add to inventory", "Add new product"],
            name: "input"
        }
    ]).then(response => {

        let inp = response.input;

        if (inp === "View products") {

            viewAll();

        } else if (inp === "View low inventory") {

            viewLow();

        } else if (inp === "Add to inventory") {

            addMore();

        } else if (inp === "Add new product") {

            addNew();

        }
    });

}

function viewAll() {

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        res.forEach(element => {

            console.log(`\nID: ${element.item_id} | Product: ${element.product_name} | Price: $${element.price} | Stock: ${element.stock_quantity}\n`);

        });

    });

    connection.end();

}

function viewLow() {

    connection.query(`SELECT * FROM products WHERE stock_quantity < 5`, function (err, res) {

        console.log(`\nLOW STOCK: `);

        if (err) throw err;

        res.forEach(element => {

            console.log(`\nID: ${element.item_id} | Product: ${element.product_name} | Price: $${element.price} | Stock: ${element.stock_quantity}\n`);

        });

    });

    connection.end();

}

function addMore() {

    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;

        res.forEach(element => {

            console.log(`\nID: ${element.item_id} | Product: ${element.product_name} | Price: $${element.price} | Stock: ${element.stock_quantity}\n`);

        });

        inquirer.prompt([
            {
                type: "input",
                message: "Choose item ID to add more stock: ",
                name: "ID"
            },
            {
                type: "input",
                message: "How much stock would you like to add: ",
                name: "stock"
            }
        ]).then(response => {

            let chosenID = parseInt(response.ID);
            let chosenStock = parseInt(response.stock);

            connection.query(`SELECT * FROM products WHERE item_id = ${chosenID}`, function (err, res) {

                if (err) throw err;

                let stockOG = res[0].stock_quantity;

                updateStock(chosenID, chosenStock, stockOG);
            });

        });

    });

}

function updateStock(chosenID, chosenStock, stockOG) {

    connection.query(`UPDATE products SET stock_quantity = ${stockOG + chosenStock} WHERE item_id = ${chosenID}`, function (err, res) {

        if (err) throw err;

        connection.query(`SELECT * FROM products WHERE item_id = ${chosenID}`, function (err, res) {

            console.log(`\nSTOCK UPDATED: `)

            console.log(`\nID: ${res[0].item_id} | Product: ${res[0].product_name} | Price: $${res[0].price} | Stock: ${res[0].stock_quantity}\n`);

        });

        connection.end();

    });

}

function addNew() {

    inquirer.prompt([
        {
            type: "input",
            message: "Product name: ",
            name: "name"
        },
        {
            type: "input",
            message: "Department name: ",
            name: "department"
        },
        {
            type: "input",
            message: "Price: ",
            name: "price"
        },
        {
            type: "input",
            message: "Stock quantity: ",
            name: "stock"
        },

    ]).then(response => {

        let query = connection.query(
            `INSERT INTO products SET ?`,
            {
                product_name: response.name,
                department_name: response.department,
                price: parseFloat(response.price),
                stock_quantity: parseInt(response.stock)
            },

            function (err, res) {

                if (err) throw err;

                console.log(`\nProduct added.`);

                viewAll();

            }

        );

    });

}