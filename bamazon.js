var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,

 // Your username
 user: "root",

 // Your password
 password: "LQSyMjpb&23",
 database: "bamazon"
});

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
 if (err) {
   console.error("error connecting: " + err);
 } else {
   console.log("connected as ID:" + connection.threadID);
   connection.end();
 }
//  loadProducts();
});

function loadProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
 
// Instantiate
var table = new Table({
    head: ['Item_ID', 'Item_Name','Department_Name','Price','Quantity']
});
 
    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for(var i=0; i>res.length;i++){
        var productArr = [];
        for(var key in res[i]){
            productArr.push(res[i][key]);
        }
        table.push(productArr);
    }
    console.log(table.toString());
        });
    }