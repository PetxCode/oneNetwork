import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	toggle: true,
	material: [],
	materialCart: [],
	book: {},
};

const Global = createSlice({
	name: "second",
	initialState,
	reducers: {
		createUser: (state, { payload }) => {
			state.user = payload;
		},
		logOut: (state) => {
			state.user = null;
		},

		onToggleTrue: (state) => {
			state.toggle = true;
		},

		onToggleFalse: (state) => {
			state.toggle = false;
		},

		createMaterial: (state, { payload }) => {
			state.material = payload;
		},

		createBook: (state, { payload }) => {
			state.book = payload;
		},

		addToCart: (state, { payload }) => {
			const check = state.materialCart.findIndex((el) => el.id === payload.id);
			if (check >= 0) {
				return;
			} else {
				const addValue = {
					...payload,
					QTY: 1,
				};
				state.materialCart.push(addValue);
			}
		},

		removeMaterial: (state, { payload }) => {
			state.materialCart = state.materialCart.filter(
				(fl) => fl.id !== payload.id
			);
		},

		totalMaterialCost: (state) => {
			const { totalCost, totalItems } = state.materialCart.reduce(
				(totalPrice, totalMaterials) => {
					const { cost, QTY } = totalMaterials;

					const mainCost = cost * QTY;

					totalPrice.totalItems += QTY;
					totalPrice.totalCost += mainCost;

					return totalPrice;
				},
				{
					totalCost: 0,
					totalItems: 0,
				}
			);

			state.tatalMaterialCost = totalCost;
			state.totalMaterialItems = totalItems;
		},
	},
});

export const {
	createMaterial,
	addToCart,
	removeMaterial,
	totalMaterialCost,
	createUser,
	logOut,
	onToggleFalse,
	onToggleTrue,
	createBook,
} = Global.actions;

export default Global.reducer;
