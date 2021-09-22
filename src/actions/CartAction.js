import Axios from "axios";
import { URL } from "../config";
import {
	ADD_TO_CART_ITEM,
	REMOVE_CART_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/CartConstant";
import { USER_SIGNOUT } from "../constants/UserConstant";

export const AddToCart = (productId, qty) => async (dispatch, getState) => {
	const { data } = await Axios.get(`${URL}/products/${productId}`);
	dispatch({
		type: ADD_TO_CART_ITEM,
		payload: {
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			product: data.id,
			qty,
		},
	});
	localStorage.setItem("cartItem", JSON.stringify(getState().cart?.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
	dispatch({ type: REMOVE_CART_ITEM, payload: productId });
	localStorage.setItem("cartItem", JSON.stringify(getState().cart?.cartItems));
};

export const signoutCart = () => (dispatch) => {
	localStorage.removeItem("cartItem");

	dispatch({ type: USER_SIGNOUT });
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
