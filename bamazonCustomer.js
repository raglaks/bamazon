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
    console.log("connected as id " + connection.threadId + "\n");
    readItems();
});

function readItems() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        res.forEach(element => {

            console.log(`\n${element.item_id}: ${element.product_name}, $${element.price}.\n`);

        });
        connection.end();
        buyPrompt();
    });
}

function buyPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "select ID of item that you want to purchase: ",
            name: "ID"
        },
        {
            type: "input",
            message: "how many do you want: ",
            name: "amount"
        }
    ]).then(response => {
        console.log(response.ID);
        console.log(response.amount);
    })
}