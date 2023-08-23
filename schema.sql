CREATE DATABASE usersexpress;
USE usersexpress;

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (id, firstName, lastName, age) 
VALUES ('fb3bdba9-6de4-4727-8ff1-64fef55ca16e','Tony','Montana','1');