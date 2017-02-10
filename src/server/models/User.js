const Sequelize = require('sequelize');

const User = {
    //user data
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    accountBalance: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 100000
    },
    profitAndLoss: {
        type: Sequelize.DECIMAL(24,10)
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    //Wallet
    usd: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 100000
    },
    btc: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    eth: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    xrp: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    ltc: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    xmr: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    etc: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    dash: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    maid: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    doge: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    zec: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    },
    lsk: {
        type: Sequelize.DECIMAL(24,10),
        defaultValue: 0
    }
};

const options = {
    freezeTableName: true
};

module.exports.User = User;
module.exports.options = options;