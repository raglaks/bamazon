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
        // console.log(response.ID);
        // console.log(response.amount);

        buy(response.ID, response.amount);
    })
}

function buy(id, amount) {

    connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function (err,res) {
        if (err) throw err;

        let amountDB = res[0].stock_quantity;

        if (amountDB < amount) {
            console.log(`not enough stock product available, sorry`);
        } else {
            console.log(`ok`);
        }
    })

    //console.log(`this the id in the new func: ${id}`);
    //console.log(`this the amount in the new func: ${amount}`);
    connection.end();
}