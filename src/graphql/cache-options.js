import { selectedCurrency } from "./currencies";
import { cart } from "./cart";
import { menuIsOpen } from "./side-menu-openner";

const options = {
	typePolicies: {
		products: {
			keyFields: ["id"],
		},
		Query: {
			fields: {
				selectedCurrency: {
					read() {
						return selectedCurrency();
					},
				},
				cart: {
					read() {
						return cart();
					},
				},
				menuIsOpen: {
					read() {
						return menuIsOpen();
					},
				},
			},
		},
	},
};

export default options;
