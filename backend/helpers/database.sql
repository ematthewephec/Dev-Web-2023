CREATE TABLE Users (
    UserID int NOT NULL AUTO_INCREMENT,
    UserName varchar(60),
    UserEmail varchar(60),
    UserPassword varchar(60),
    CreationDate Date,
    DeletionDate Date,
    PRIMARY KEY (UserID)
);

CREATE TABLE Products (
    ProductID int NOT NULL AUTO_INCREMENT,
    ProductName varchar(60),
    ProductQuantity int,
    ProductDesc text,
    ProductPrice decimal(6,2),
    ProductOnSale boolean,
    PRIMARY KEY (ProductID)
);

CREATE TABLE Addresses (
    AddressID int NOT NULL AUTO_INCREMENT,
    UserID int,
    Street varchar(100),
    Postcode int,
    Country varchar(30),
    PRIMARY KEY (AddressID),
    FOREIGN KEY (UserID) references Users(UserID)
);

CREATE TABLE Orders (
    OrderID int NOT NULL AUTO_INCREMENT,
    UserID int,
    ProductID int,
	OrderSubtotal int,
    OrderDate Date,
	SubscriptionID int,
    PaidDate Date,
    DeliveryDate Date,
    WasPaid boolean DEFAULT false,
    WasDelivered boolean DEFAULT false,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
	FOREIGN KEY (SubscriptionID) REFERENCES Subscriptions(SubscriptionID)
);

CREATE TABLE Baskets (
	UserID int,
	ItemIndex int NOT NULL AUTO_INCREMENT,
    ItemQuantity int,
	ProductID int,
	PRIMARY KEY (ItemIndex),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Subscriptions (
    SubscriptionID int NOT NULL AUTO_INCREMENT,
    UserID int,
    ProductID int,
    SubscriptionStart date,
    SubscriptionEnd date,
	SubscriptionLength int,
    PRIMARY KEY (SubscriptionID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE AdminUsers (
    AdminUserID int NOT NULL AUTO_INCREMENT,
    AdminUserName varchar(60),
    AdminUserEmail varchar(60),
    AdminUserPassword varchar(60),
    AdminAcces boolean,
    PRIMARY KEY (AdminUserID)
);
