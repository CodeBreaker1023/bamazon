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
}

var createTable = function() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        console.log("Item ID // Product Name // Department Name // Price // In Stock")
        for(var i=0; i<res.length; i++){
        console.log(res[i].item_id + " // " + res[i].product_name + " // " +
            res[i].department_name + " // " + res[i].price + " // " + res[i].quantity +
            "\n");
        }
        promptManager(res);
    })
}
createTable();

// Use inquirer to prompt manager what they would like to do
var promptManager = function(res) {
    inquirer.prompt([{
        type: "rawlist",
        name: "choice",
        message: "Pick from the options below:",
        choices: ["View Products for Sale", "View Low Inventory", "Increase Inventory of an Exisiting Product", "Add a new Product"]
    }]).then(function(val) {
        if(val.choice = "View Products for Sale") {
            console.log(res[i].item_id + " // " + res[i].product_name + " // " +
            res[i].department_name + " // " + res[i].price + " // " + res[i].quantity +
            "\n");
        }
        if(val.choice = "View Low Inventory") {
            lowInventory();
        }
        if(val.choice = "Increase Inventory of an Exisiting Product"){
            increaseInventory();
        }
        if(val.choice = "Add a new Product") {
            addProduct();
        }
    })
}

// Create lowInventory() to list all products with less than 5 items left in inventory
function lowInventory() {
    inquirer.prompt([{
        type: "input",
        name: "product_name",
        message: ""
    }])
}

// Create increaseInventory() to increase the inventory of a product
function increaseInventory() {

}

// Create addProduct() to add a product to the inventory list
function addProduct() {

}