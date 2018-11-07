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
});

var createTable = function() {
    connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        console.log("Item ID // Product Name // Department Name // Price // In Stock")
        for(var i=0; i<res.length; i++){
        console.log(res[i].item_id + " // " + res[i].product_name + " // " +
            res[i].department_name + " // " + res[i].price + " // " + res[i].quantity +
            "\n");
        }
        promptAction();
    })
}


// Use inquirer to prompt manager what they would like to do
var promptAction = function() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "Pick from the options below:",
        choices: ["View Products for Sale", "View Low Inventory", "Increase Inventory of an Exisiting Product", "Add a new Product"]
    }]).then(function(val) {
        if(val.choice === "View Products for Sale") {
            for(var i=0;i<val.length;i++)
            {
                console.log(res[i].item_id + " // " + res[i].product_name + " // " +
                res[i].department_name + " // " + res[i].price + " // " + res[i].quantity +
                "\n");
            }
        }
        if(val.choice === "View Low Inventory") {
            lowInventory();
        }
        if(val.choice === "Increase Inventory of an Exisiting Product"){
            increaseInventory();
        }
        if(val.choice === "Add a new Product") {
            addProduct();
        }
    })
}

// Create lowInventory() to list all products with less than 5 items left in inventory
function lowInventory() {

    connection.query("SELECT * FROM products WHERE quantity<5", function(err,res) {
        if (err) throw err;
        console.log("Item ID // Product Name // Department Name // Price // In Stock")
        for(var i=0; i<res.length; i++){
        console.log(res[i].item_id + " // " + res[i].product_name + " // " +
            res[i].department_name + " // " + res[i].price + " // " + res[i].quantity +
            "\n");
        }
    }
}

// Create increaseInventory() to increase the inventory of a product
function increaseInventory() {
    inquirer.prompt([{
        type: "input",
        name: "item_id",
        message: "Type the ITEM ID of product whose inventory would you like to increase?"
    },{
        type: "input",
        name: "added_inventory",
        message: "How many would you like to add?"
    }]).then(function(val){
        // create for loop to cycle through all the products comparing manager answer to product name
            var temp = "SELECT quantity FROM products WHERE item_id="+parseInt(val.item_id)+";"

            connection.query(temp,function(err,add){

                console.log("Quantity from table: "+add);
                var q = add[0].quantity + parseInt(val.added_inventory);

                connection.query('UPDATE products SET quantity=' +q +' WHERE item_id=' + parseInt(val.item_id) + ';', function(err,res){
                    if(err) throw err;
                    if(res.affectedRows == 0){
                        console.log("This item does not exist. Please try again.");
                        //createTable();
                    } else {
                        console.log("The inventory has been updated")
                    }
                });
            });

                 
        
    })
}

createTable();

// Create addProduct() to add a product to the inventory list
function addProduct() {
    inquirer.prompt([{
        // Inquire about product name
        type: "input",
        name: "product_name",
        message: "What is the name of the product?"
    },{
        // Inquire about department name
        type: "list",
        name: "department_name",
        message: "What category does this product fall into?",
        choices:["Clothes", "Books", "Sporting Goods", "Electronics"]
    },{
        // Inquire about price
        type: "input",
        name: "price",
        message: "What is the price of the product?"
    },{
        // Inquire about quantity
        type: "input",
        name: "quantity",
        message: "What is the desired quantity you wish to get?"
    }]).then(function(val){
        connection.query("INSTERT INTO products (product_name, department_name, price, quantity) VALUES ('"+ val.product_name + "','" + val.department_name + "'," + val.price + "," + val.quantity + ");", function(err,res){
            if(err)throw err;
                console.log(val.product_name + " Product added!");
            createTable();
        })
    })
}

//createTable();