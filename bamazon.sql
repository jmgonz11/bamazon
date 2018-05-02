DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	ItemID INT NOT NULL,
	ProductName VARCHAR(200) NOT NULL,
	DepartmentName VARCHAR(255) NOT NULL,
	Price DECIMAL(10,2) NOT NULL,
	StockQuantity INT NOT NULL,
    PRIMARY KEY (ItemID)
);

INSERT INTO products (ProductName, DepartmentName, Price, StockQuantity)
VALUES
	('Go Pro Hero 5 Black','Electronics',499.99,500,1),
	('Go Pro Hero','Electronics',199.99,800,2),
	('IPhone 7','Electronics',899.99,1000,3),
	('Banana Puppy Costume','Pets',29.99,500,4),
	('Hawaiian Mens Shirt', 'Apparel',25.00,400,5),
	('Nurtibullet','Kitchen',89.00,600,6),
	('TV Stand','Home',150.00,300,7),
	('Popsicle Molds','Kitchen',15.99,100,8),
	('Puppy Treats by Science Diet','Pets',10.99,2000,9),
	('Performix Peanut Butter Protein Powder','Fitness',69.99,8000,10);

    