import React from "react";
import { GET_CURRENT_CURRENCY, selectedCurrency } from "../../../../graphql/currencies";
import { useQuery } from "@apollo/client";
import styles from "./assets/side-menu.module.sass";
import { ClickAwayListener } from "@material-ui/core";
import { ReactComponent as ArrowRightIcon } from "../../../../assets/imgs/arrow-right-icon.svg";
import { cart, GET_CART } from "../../../../graphql/cart";

function SideMenu({ closeMenu, menuOpen, setMenuOpen, currenciesData }) {
	const {
		data: { selectedCurrency: currentCurrency },
	} = useQuery(GET_CURRENT_CURRENCY);

	const { data: cartQuery } = useQuery(GET_CART);

	function updateCurrency(e) {
		console.log(e.currentTarget.value);
		selectedCurrency(e.currentTarget.value);
	}

	function decrementQuantity(id) {
		let newCart = [...cartQuery.cart];
		let cartItemIndex = newCart.findIndex((cartItem) => cartItem.product.id === id);
		if (cartItemIndex !== -1) {
			let cartItem = newCart[cartItemIndex];
			if (cartItem.quantity - 1 === 0) {
				newCart.splice(cartItemIndex, 1);
			} else {
				newCart.splice(cartItemIndex, 1, { ...cartItem, quantity: cartItem.quantity - 1 });
			}
			cart(newCart);
		}
	}

	function incrementQuantity(id) {
		let newCart = [...cartQuery.cart];
		let cartItemIndex = newCart.findIndex((cartItem) => cartItem.product.id === id);
		if (cartItemIndex !== -1) {
			let cartItem = newCart[cartItemIndex];
			newCart.splice(cartItemIndex, 1, { ...cartItem, quantity: cartItem.quantity + 1 });
			cart(newCart);
		}
	}

	return (
		<ClickAwayListener
			onClickAway={closeMenu}
			mouseEvent={menuOpen ? "onClick" : false}
			touchEvent={menuOpen ? "onTouchStart" : false}
		>
			<div className={`${styles.container} ${menuOpen ? styles.isOpen : ""}`}>
				<button type="button" onClick={closeMenu}>
					<ArrowRightIcon />
				</button>
				<p>YOUR CART</p>
				<select defaultValue={currentCurrency} onChange={updateCurrency}>
					{currenciesData.currency.map((singleCurrency, index) => {
						return (
							<option key={index} value={singleCurrency}>
								{singleCurrency}
							</option>
						);
					})}
				</select>
				<div className={styles.cartItemsContainer}>
					{cartQuery.cart.map((cartItem) => {
						return (
							<div key={cartItem.product.id} className={styles.cartItemContainer}>
								<div>
									<h3>{cartItem.product.title}</h3>
									<div className={styles.cartItemPriceQuantity}>
										<div>
											<button onClick={() => decrementQuantity(cartItem.product.id)}>-</button>
											<p>{cartItem.quantity}</p>
											<button onClick={() => incrementQuantity(cartItem.product.id)}>+</button>
										</div>
										<p>
											{cartItem.product.price} {currentCurrency}
										</p>
									</div>
								</div>
								<img src={cartItem.product.image_url} alt="product" />
							</div>
						);
					})}
				</div>
				{cartQuery.cart.length === 0 && <p>There is no items in cart</p>}
			</div>
		</ClickAwayListener>
	);
}

export default SideMenu;
