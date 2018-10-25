// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

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

})

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
        } else {
            console.log("coming soon");
        }

    });

    //connection.end();

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