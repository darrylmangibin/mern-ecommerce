import axios from "axios";
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	const { _id, name, image, price, countInStock } = data;

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: _id,
			name,
			image,
			price,
			countInStock,
			qty,
		},
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: id });

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (formData) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: formData });

	localStorage.setItem("shippingAddress", JSON.stringify(formData));
};

export const savePaymentMethod = (formData) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: formData });

	localStorage.setItem("paymentMethod", JSON.stringify(formData));
};
