import Axios from "axios"
import {ADD_TO_CART_ITEM} from "../constants/AddToCartConstant"


export const AddToCart = (productId, qty) => 
	async(dispatch, getState) =>{
		const {data} = await Axios.get(`http://localhost:3000/products/${productId}`)
		dispatch({
			type: ADD_TO_CART_ITEM,
			payload: {
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				product: data.id,
				qty, 
				}
		})
		console.log(getState(),  "gggggg");
		localStorage.setItem("cartItem", JSON.stringify(getState().cart?.cartItems))
}

