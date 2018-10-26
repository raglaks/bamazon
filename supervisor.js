const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");

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

    supervisorMenu();

});

function supervisorMenu() {

    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option: ",
            choices: ["View product sales by department", "Create new department"],
            name: "input"
        }
    ]).then(response => {

        let inp = response.input;

        if (inp === "View product sales by department") {

            console.log("here are the product sales");

        } else if (inp === "Create new department") {

            console.log("creating a new dep.");

        } 

    });

    connection.end();
}