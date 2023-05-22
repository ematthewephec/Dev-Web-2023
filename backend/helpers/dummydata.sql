INSERT INTO Users(UserName, UserEmail, UserPassword, CreationDate) VALUES
('Toto', 'toto@gmail.com', 'totoiscool', NOW()),
('Tata', 'tata@gmail.com', 'tataiscool', NOW());

INSERT INTO Products(ProductName, ProductStock, ProductDesc, ProductPrice, ProductOnSale) VALUES
('Test Product 1', 50, 'This is the first test product.', 10.00, TRUE),
('Test Product 2', 20, 'This is the second test product.', 20.00, TRUE),
('Test Product 3', 10, 'This is the third test product.', 50.00, TRUE);

INSERT INTO Baskets(UserID, ItemQuantity, ProductID) VALUES
(1, 2, 1),
(2, 1, 3);

INSERT INTO Orders(UserID, ProductID, OrderSubtotal, OrderDate, NumItems) VALUES
(1, 1, 20, NOW(), 2),
(2, 3, 50, NOW(), 1);
