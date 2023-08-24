CREATE TABLE Users (
    UserID INT NOT NULL AUTO_INCREMENT,
    UserName VARCHAR(60),
    UserFirstname VARCHAR(60),
    UserEmail VARCHAR(60),
    UserPassword VARCHAR(60),
    CreationDate DATE,
    DeletionDate DATE,
    PRIMARY KEY (UserID)
);

CREATE TABLE Images (
    ImageID INT NOT NULL AUTO_INCREMENT,
    ImageName VARCHAR(100),
    ImageSize INT,
    ImageType VARCHAR(20),
    ImageData LONGBLOB,
    PRIMARY KEY (ImageID)
);

CREATE TABLE Products (
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(60),
    ProductStock INT,
    ProductDesc TEXT,
    ProductPrice DECIMAL(6,2),
    ProductOnSale BOOLEAN,
    ProductImageID INT,
    PRIMARY KEY (ProductID),
    FOREIGN KEY (ProductImageID) REFERENCES Images(ImageID) 
);

CREATE TABLE Addresses (
    AddressID INT NOT NULL AUTO_INCREMENT,
    UserID INT,
    Street VARCHAR(100),
    Postcode INT,
    City VARCHAR(30),
    Country VARCHAR(30),
    PRIMARY KEY (AddressID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Baskets (
    UserID INT,
    ItemIndex INT NOT NULL AUTO_INCREMENT,
    ItemQuantity INT NOT NULL DEFAULT 1,
    ProductID INT,
    PRIMARY KEY (ItemIndex),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Subscriptions (
    SubscriptionID INT NOT NULL AUTO_INCREMENT,
    UserID INT,
    ProductID INT,
    SubscriptionStart DATE,
    SubscriptionEnd DATE,
    SubscriptionLength INT,
    PRIMARY KEY (SubscriptionID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE AdminUsers (
    AdminUserID INT NOT NULL AUTO_INCREMENT,
    AdminUserName VARCHAR(60),
    AdminUserEmail VARCHAR(60),
    AdminUserPassword VARCHAR(60),
    AdminAccess BOOLEAN,
    PRIMARY KEY (AdminUserID)
);

CREATE TABLE Orders (
    OrderID INT NOT NULL AUTO_INCREMENT,
    UserID INT,
    ProductID INT,
    OrderSubtotal INT,
    OrderDate DATE,
    SubscriptionID INT,
    PaidDate DATE,
    DeliveryDate DATE,
    WasPaid BOOLEAN DEFAULT false,
    WasDelivered BOOLEAN DEFAULT false,
    WasCancelled BOOLEAN DEFAULT false,
    NumItems INT NOT NULL DEFAULT 1,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (SubscriptionID) REFERENCES Subscriptions(SubscriptionID)
);

