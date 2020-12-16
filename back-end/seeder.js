import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUser = await User.insertMany(users);
		const adminUser = createdUser[0]._id;

		const sampleProducts = products.map((product) => ({
			...product,
			user: adminUser,
		}));

		await Product.insertMany(sampleProducts);

		console.log("Data imported".green.inverse);
		process.exit(0);
	} catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data destroyed".red.inverse);
		process.exit(0);
	} catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else if (process.argv[2] === "-i") {
	importData();
}
