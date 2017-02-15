const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const User = sequelize.define('users', {
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
	password: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			isEmail: true
		}
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	score: {
		type: Sequelize.DECIMAL(24,10)
	}
}, {
    classMethods: {
        associate: (models) => {
            User.hasMany(models.Transaction, {
                onDelete: 'cascade'
            });
        }
    }
});

module.exports = User;