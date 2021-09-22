import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAIL_REQUEST,
	PRODUCT_DETAIL_SUCCESS,
	PRODUCT_DETAIL_FAIL,
} from "../constants/ProducttConstants";
import Axios from "axios";
import { URL } from "../config";

export const listProducts = () => async (dispatch) => {
	dispatch({
		type: PRODUCT_LIST_REQUEST,
	});
	try {
		const { data } = await Axios.get(`${URL}/products`);
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: err.message,
		});
	}
};

export const detailProduct = (productId) => async (dispatch) => {
	dispatch({
		type: PRODUCT_DETAIL_REQUEST,
		payload: productId,
	});
	try {
		const { data } = await Axios.get(`${URL}/products/${productId}`);
		dispatch({
			type: PRODUCT_DETAIL_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//const y = 0;
