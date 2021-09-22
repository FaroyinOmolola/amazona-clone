import { URL } from "../config";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_SUCESS,
} from "../constants/OrderConstants";
import Axios from "axios";
import { CART_EMPTY } from "../constants/CartConstant";

export const createOrder = () => async (dispatch, getState) => {
	dispatch({
		type: ORDER_CREATE_REQUEST,
	});
	try {
		const { data } = await Axios.get(`${URL}/orderItems`);
		dispatch({ type: ORDER_CREATE_SUCESS, payload: data });
		dispatch({ type: CART_EMPTY });
		localStorage.removeItem("cartItem");
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
