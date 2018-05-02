var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

var cost = 0;
var total = 0;
var totalcount = 0;


function options(){


connection.query('SELECT * FROM products', function(err, results){
    if (err) throw err;
    console.log("Welcome to Bamazon! What would you like to buy?");

    for (var i = 0; i < results.length; i++) {
      console.log("ID: " + results[i].ItemID + " PRODUCT NAME: " + results[i].ProductName + " DEPARTMENT: " + results[i].DepartmentName + " PRICE: $" + results[i].Price + " QUANTITY AVAILABLE: " + results[i].StockQuantity); 
    }
        inquirer.prompt([{
          type: 'input',
          name: 'ItemID',
          message: "What is the ID of the product you would like to buy?"

        }]).
        
        then(function(answer){
          
          
        var ItemID = parseInt(answer.item_id)


          for (var i = 0; i < results.length; i++) {
            if (results[i].item_id == answer.item_id){
              var result = results[i]; 
              console.log('There are ' + result.StockQuantity + ' ' +result.ProductName + ' in stock for $' + result.Price + ' per Item');

              inquirer.prompt ([{
                type: 'input',
                name: 'itemQuantity',
                message: 'How many of ' + result.ProductName + ' would you like to buy?' }])
              
              .then(function(answer){
                var quantity = parseInt(answer.itemQuantity);
                
                if (quantity > result.StockQuantity){
                  console.log("We do not have enough in stock to fill your order, please make another selection");
                  inquirer.prompt
                  ([{
                    type: 'confirm',
                    name: 'shop',
                    message: "Would you like anything else?"

                  }])
                
                  .then(function(answer){
                    if(answer.shop){
                      options();
                    }
                    
                    else {
                      console.log("Thank you for shopping with Bamazon!")
                      connection.end();
                    }
                  })

                }
                
                else {
                  console.log("Please Pay:");
                    connection.query('UPDATE Products SET StockQuantity = StockQuantity - ? WHERE ItemID = ?', [quantity, ItemID], function(err, results){
                    if (err) throw err;
                    });

        var cost = result.price;
        var totalCost = cost * quantity;
        var totalCostRound = Math.round(totalCost*100)/100;
        var total = totalCostRound 
              

                  
            console.log("QUANTITY ORDERED: " + quantity + " " +result.ProductName + '  at ' + "$" + cost);
            console.log("PRICE:  $" + totalCostRound);
            console.log("YOUR TOTAL BALANCE IS:  $" + total);

                    inquirer.prompt
                    
                    ([{
                    type: 'confirm',
                    name: 'shop',
                    message: "Would you like to buy anything else?"
                    }])

                  .then(function(answer){
                    if(answer.shop){
                      options();
                    }
                    
                    else {
                      console.log("Thank you for shopping with Bamazon!")
                      connection.end();
                    }
                  })
                  options();
                }
              })
            }
        }
    }
        )}
)}

          
    
      