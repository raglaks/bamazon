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

        //console.log(res);

        res.forEach(element => {

            //console.log(element);
            console.log(`\n${element.item_id}: ${element.product_name}, $${element.price}.\n`);

        });

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

        buy(response.ID, response.amount);
    })
}

function buy(id, amount) {

    connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function (err, res) {
        if (err) throw err;

        let amountDB = res[0].stock_quantity;
        let price = res[0].price;

        if (amountDB < amount) {

            console.log(`not enough stock product available, sorry`);
            connection.end();

        } else {

            itemBought(id, amount, amountDB, price);
            
        }
    });

    
}

function itemBought(id, amount, amountDB, price) {
    connection.query(`UPDATE products SET stock_quantity = ${amountDB - amount} WHERE item_id = ${id}`, function (err, res) {
        if (err) throw err;

        display(id);

        console.log(`your purchase cost: $${(amount * price).toFixed(2)}`);
    });

}

function display(id) {

    connection.query(`SELECT * FROM products where item_id=${id}`, function (err, res) {
        if (err) throw err;

        //console.log(res);
        console.log(`\n${res[0].item_id}: ${res[0].product_name}, $${res[0].price}, ${res[0].stock_quantity} remaining.\n`);
    });

    connection.end();

}