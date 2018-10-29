var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 user: "root",
 password: "LQSyMjpb&23",
 database: "bamazonDB"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
 if (err) throw err;
    console.log("Connected!");