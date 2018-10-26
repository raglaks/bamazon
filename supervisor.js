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

            viewSales();

        } else if (inp === "Create new department") {

            createDep();

        } 

    });

    
}

function viewSales() {

    connection.query(`SELECT * FROM products `, function(err, res) {

        if (err) throw err;

        res.forEach(element => {

            let rando = Math.floor((Math.random() * 1000) + 1); 

            console.log(element.department_name);

            connection.query(`INSERT INTO departments SET ?`, {
                department_name: element.department_name,
                over_head_costs: rando
            },

            function (err, res) {
    
                if (err) throw err;
    
                console.log(`\nDepartment and costs added.`);
                
            });

        });

        connection.end();

    });

    
}

function createDep() {

    inquirer.prompt([
        {
            type: "input",
            message: "Department name: ",
            name: "name"
        },
        {
            type: "input",
            message: "Overhead costs: ",
            name: "costs"
        }
    ]).then(response => {

        connection.query(`INSERT INTO departments SET ?`, {
            department_name: response.name,
            over_head_costs: response.costs
        },
        function (err, res) {

            if (err) throw err;

            console.log(`\nDepartment and costs added.`);
            
        });

        connection.end();

    });

    
}