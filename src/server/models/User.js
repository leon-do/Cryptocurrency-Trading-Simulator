//  MongoDB/Mongoose
const mongoose = require('mongoose');
const connection = require('../utils/connect');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
	USD: { type: Number, default: 100000 },
	BTC: { type: Number, default: 0 },
	ETH: { type: Number, default: 0 },
	XRP: { type: Number, default: 0 },
	LTC: { type: Number, default: 0 },
	XMR: { type: Number, default: 0 },
	ETC: { type: Number, default: 0 },
	DASH: { type: Number, default: 0 },
	MAID: { type: Number, default: 0 },
	DOGE: { type: Number, default: 0 },
	ZEC: { type: Number, default: 0 },
	LSK: { type: Number, default: 0 },
	updated_at: { type: Date, index: true, default: Date.now }
});

const transactionSchema = new Schema({
	USD: Number,
	BTC: Number,
	ETH: Number,
	XRP: Number,
	LTC: Number,
	XMR: Number,
	ETC: Number,
	DASH: Number,
	MAID: Number,
	DOGE: Number,
	ZEC: Number,
	LSK: Number,
	updated_at: { type: Date, index: true, default: Date.now }
});

const scoreSchema = new Schema({
	total: { type: Number, default: 100000 },
	all: { type: Schema.Types.Mixed, default: { USD: { amount: 100000, valueUSD: 100000 }}}
}, {timestamps: false});

const userSchema = new Schema({
	username: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true },
	wallet: { type: walletSchema, default: walletSchema },
	transactions: [transactionSchema],
	score: { type: scoreSchema, default: scoreSchema },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

scoreSchema.options.toJSON = {
	getters: true,
	virtuals: true,
	minimize: false,
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.id;
		return ret
	}
};

walletSchema.options.toJSON = {
	getters: true,
	virtuals: true,
	minimize: false,
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.updated_at;
		delete ret.id;
		return ret
	}
};

userSchema.methods.updateWallet = function (coin1, coin2, amount, convertedAmount, time, score, cb) {
	this.wallet[coin1] = this.wallet[coin1] - amount;
	this.wallet[coin2] = this.wallet[coin2] + convertedAmount;
	this.wallet.updated_at = new Date(time);
	this.updated_at = new Date(time);
	this.score = score;
	this.markModified('score');
	this.markModified('wallet');
	this.markModified('transactions');
	this.markModified('updated_at');
	cb();
};

const User = connection.model('User', userSchema);

module.exports = User;