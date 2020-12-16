import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Auth user & get a token
// @route   POST api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			email: user.email,
			name: user.name,
			isAdmin: user.isAdmin,
			token: null,
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

export { authUser };
