-- ADMIN

DROP DATABASE IF EXISTS sms_db;

CREATE DATABASE sms_db;

USE sms_db;

CREATE TABLE country(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    country_name VARCHAR(25) NOT NULL UNIQUE
);

CREATE TABLE state(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    State_name VARCHAR(50) NOT NULL UNIQUE,
    c_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY (c_id) REFERENCES country (id)
);

CREATE TABLE city(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    city_name VARCHAR(50) NOT NULL UNIQUE,
    s_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY (s_id) REFERENCES state (id)
);

CREATE TABLE district(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    district_name VARCHAR(50) NOT NULL UNIQUE,
    city_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY (city_id) REFERENCES city (id)
);

CREATE TABLE subcity(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    subcity_name VARCHAR(50) NOT NULL UNIQUE,
    d_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY (d_id) REFERENCES district (id)
);

CREATE TABLE society(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    society_name VARCHAR(50) NOT NULL UNIQUE,
    society_address VARCHAR(250), 
    sc_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY (sc_id) REFERENCES subcity (id)
);

-- USER, Empolyee, Secretory_ADMIN




--Changes in Admin Table

TABLE location CREATE (
id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
country VARCHAR(25), state VARCHAR(50),
city VARCHAR(50),
district VARCHAR(50), 
);

CREATE TABLE society (
id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
society_name VARCHAR(50) NOT NULL,
subcity VARCHAR(50) NOT NULL,
location_id INT NOT NULL,
CONSTRAINT FOREIGN KEY (location_id) REFERENCES location(id)
);

