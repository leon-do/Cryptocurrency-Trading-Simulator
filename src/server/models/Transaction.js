const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const Transaction = sequelize.define('transactions', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
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
}, {
    classMethods: {
        associate: (models) => {
            Transaction.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            });
        }
    }
});

//Sync to Transaction table in the database
// =============================================================
Transaction.sync();

module.exports = Transaction;