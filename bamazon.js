var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
    console.log("Successful!");
    createTable();
    // {
    // console.error("error connecting: " + err);
    // } else {
    // console.log("connected as ID:" + connection.threadID);
    // connection.end();
    // }
//  loadProducts();
});

// function loadProducts(){
//     connection.query("SELECT * FROM products", function(err, res){
//         if(err) throw err;
 
// Instantiate
// var table = new Table({
//     head: ['Item_ID', 'Item_Name','Department_Name','Price','Quantity']
// });
 
//     // table is an Array, so you can `push`, `unshift`, `splice` and friends
//     for(var i=0; i>res.length;i++){
//         var productArr = [];
//         for(var key in res[i]){
//             productArr.push(res[i][key]);
//         }
//         table.push(productArr);
//     }
//     console.log(table.toString());
//         });
// }

var createTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].item_id + " // " + res[i].product_name + " // " +
            res[i].department_name + " // " + res[i].price + " // " + res[i].quantity +
            "\n");
        } 
    // Get user inquirer response
    promptCustomer(res);
    })
}

// Use inquirer to prompt customer what good they want to purchase
var promptCustomer = function(res){
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What are you looking to purchase?'
    }]).then(function(answer){
        var correct = false;
        for(var i=0; i<res.length; i++){
            if(res[i].product_name == answer.choice){
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: 'input',
                    name:'quantity',
                    message: 'How many would you like to purchase?',
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].quantity - answer.quantity)>0){
                        connection.query("UPDATE products SET quantity ='" + (res[id].quantity - answer.quantity) + "' WHERE product_name='" + product +"'", function(err,res2){
                            console.log("Product purchased.");
                            createTable();
                        })
                    } else{
                        console.log("Invalid selection. Please try again.");
                        promptCustomer(res);
                    }
                })
            }
        }
        // Alert user if they have an invalid selection
        if (i=res.length && correct==false){
            console.log("Invalid selection. Please try again.");
        }
    })
}