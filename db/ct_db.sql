-- Create the database ct_db (CryptoTrader) that will hold usernames, asset allocations, profit and loss, etc.
CREATE DATABASE ct_db;
USE ct_db;

-- Create the table users.
CREATE TABLE ct_users
(
`id` int NOT NULL AUTO_INCREMENT,
-- username will be a user generated username specifying each individual users' login name
`username` varchar(255) NOT NULL,
-- pw will be a user generated password specifying each individual users' password
-- pw should be hashed using at least a 256-bit hash value
`pw` varchar(255) NOT NULL,
-- eligible will be true until the users' overall account balance < 0, once false, game over
`eligible` tinyint(1) DEFAULT 1,
-- date will record the signup date for each individual user - important for tracking performance over time
`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- pl will indicate users' profit and loss at present
`pl` decimal(24,10) Default 0,
-- ab will indicate users' account balance at present by converting all assets into ccc (see below)
`ab` decimal(24,10) Default 0,

-- Coins and Tokens Eligible for Trading --

-- USD
`usd` decimal(24,10) Default 0,
-- btc is the amount of bitcoin in the users' porfolio
`btc` decimal(24,10) Default 0,
-- eth is the amount of ether in the users' porfolio
`eth` decimal(24,10) Default 0,
-- xrp is the amount of ripple in the users' porfolio
`xrp` decimal(24,10) Default 0,
-- ltc is the amount of litecoin in the users' porfolio
`ltc` decimal(24,10) Default 0,
-- xmr is the amount of monero in the users' porfolio
`xmr` decimal(24,10) Default 0,
-- etc is the amount of ethereumclassic (this is a scam coin) in the users' porfolio
`etc` decimal(24,10) Default 0,
-- dash is the amount of dash in the users' porfolio
`dash` decimal(24,10) Default 0,
-- maid is the amount of maidsafecoin in the users' porfolio
`maid` decimal(24,10) Default 0,
-- doge is the amount of dogecoin in the users' porfolio
`doge` decimal(24,10) Default 0,
-- zec is the amount of zcash in the users' porfolio
`zec` decimal(24,10) Default 0,
-- lsk is the amount of lisk in the users' porfolio
`lsk` decimal(24,10) Default 0,

-- /Coins and Tokens Eligible for Trading --

PRIMARY KEY (id)
);


