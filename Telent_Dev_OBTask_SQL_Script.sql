/* 
	Name: Mahfuz (Mohammad Mahfuzul Haque)
	Softwrare Development Job Ready Program Intern
	Batch: 29-Mar-2021
	Create Database and Tables for MVP Studio Onboarding Task 01
	Execute Data manipulation by CRUD (Create, Update, Delete) operations
*/

-- Create a Database

CREATE DATABASE Telent_Dev_OBTask;

--Select Database for table creation 
USE Telent_Dev_OBTask

-- Create TABLE Ojects

--Create Customer Table
	CREATE TABLE Customer (
	CustomerId int identity(1,1) PRIMARY KEY,
	CustomerName varchar (255) NOT NULL,
	CustomerAddress varchar (500)
	);

--Create Product Table
CREATE TABLE Product(
	ProductId int identity (1,1) PRIMARY KEY,
	ProductName varchar (255),
	ProductPrice decimal (10, 2) NOT NULL
);

--Create Store Table
CREATE TABLE Store(
	StoreId int identity (1,1) PRIMARY KEY,
	StoreName varchar (255),
	StoreAddress varchar(500)
);

--Create Sales Table
CREATE TABLE Sales(
	SalesId int identity (1,1) PRIMARY KEY,
	CustomerId int,
	ProductId int,
	StoreId int,
	DateSold date NOT NULL,
	
	FOREIGN KEY (CustomerId) REFERENCES Customer (CustomerId)
	ON DELETE CASCADE ON UPDATE CASCADE,
	
	FOREIGN KEY (ProductId) REFERENCES Product (ProductId)
	ON DELETE CASCADE ON UPDATE CASCADE,
	
	FOREign KEY (StoreId) REFERENCES Store(StoreId) 
	ON DELETE CASCADE ON UPDATE CASCADE
);
SELECT * FROM Sales;
--DROP TABLE Sales;
-- Insert data into cusomer Table tables
INSERT INTO Customer(CustomerName, CustomerAddress) VALUES ('Mahfuz', 'Auckland');
INSERT INTO Customer(CustomerName, CustomerAddress) VALUES ('Kevin', 'Auckland');
INSERT INTO Customer(CustomerName, CustomerAddress) VALUES ('Mahbub', 'Sydney');
INSERT INTO Customer(CustomerName, CustomerAddress) VALUES ('Adam', 'Welington');
INSERT INTO Customer (CustomerName, CustomerAddress) VALUES ('brian', 'Hamiltan');

INSERT INTO Customer (CustomerName, CustomerAddress) VALUES ('TestName', 'TestAddress');
INSERT INTO Customer (CustomerName, CustomerAddress) VALUES ('TestName1', 'TestAddress1');
INSERT INTO Customer (CustomerName, CustomerAddress) VALUES ('TestName2', 'TestAddress2');

--Update Name of Customer where Customer ID 5
UPDATE CUSTOMER
SET CustomerName = 'Brain'
WHERE Customer.CustomerId = 5;

--View records from Customer table
SELECT * FROM Customer;

--Insert data into Produt table
INSERT INTO Product (ProductName, ProductPrice) VALUES ('Pen', 5);
INSERT INTO Product (ProductName, ProductPrice) VALUES ('Note Book', 10);
INSERT INTO Product (ProductName, ProductPrice) VALUES ('Pencil', 3);
INSERT INTO Product (ProductName, ProductPrice) VALUES ('TestDelete', 0);

SELECT * FROM Product;

--Delete record from Product talbe where Product name is TestDelete
DELETE FROM Product
WHERE Product.ProductName = 'TestDelete';

--view records from product table
SELECT * FROM  Product;

--Insert into Store talbe
INSERT INTO Store (StoreName, StoreAddress) VALUES ('Warehouse','Auckland');
INSERT INTO Store (StoreName, StoreAddress) VALUES ('Countdown', 'Sydney');

--View records from Store table 
SELECT * FROM Store;

-- Insert records into Sales table
INSERT INTO Sales(CustomerId, ProductId, StoreId, DateSold) VALUES (1, 1, 1,'04/04/2021');
INSERT INTO Sales(CustomerId, ProductId, StoreId, DateSold) VALUES (1, 2, 1,'04/04/2021');
INSERT INTO Sales(CustomerId, ProductId, StoreId, DateSold) VALUES (2, 2, 2,'04/04/2021');
INSERT INTO Sales(CustomerId, ProductId, StoreId, DateSold) VALUES (2, 1, 1,'04/04/2021');
INSERT INTO Sales(CustomerId, ProductId, StoreId, DateSold) VALUES (3, 3, 2,'04/04/2021');
SELECT * FROM Sales;