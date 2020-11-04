import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/products";
import { GET_CURRENT_CURRENCY } from "../../graphql/currencies";
import { cart, GET_CART } from "../../graphql/cart";
import { menuIsOpen } from "../../graphql/side-menu-openner";
import styles from "./assets/products.module.sass";

function Products() {
	const { data: cartQuery } = useQuery(GET_CART);

	const {
		data: { selectedCurrency },
	} = useQuery(GET_CURRENT_CURRENCY);

	const { data = { products: [] } } = useQuery(GET_PRODUCTS, {
		variables: { currency: selectedCurrency },
		skip: selectedCurrency ? false : true,
	});

	function addProductToCart(product) {
		if (data.products.length > 0) {
			let productIndex = cartQuery.cart.findIndex((cartItem) => cartItem.product.id === product.id);
			if (productIndex !== -1) {
				let newCart = [...cartQuery.cart];
				let cartItem = newCart[productIndex];
				newCart.splice(productIndex, 1, { product: product, quantity: cartItem.quantity + 1 });
				cart(newCart);
			} else {
				cart([...cartQuery.cart, { product: product, quantity: 1 }]);
			}
		}
	}

	useEffect(() => {
		if (cartQuery.cart.length > 0) {
			menuIsOpen(true);
		}
	}, [cartQuery]);

	return (
		<div className={styles.container}>
			<Container>
				<Grid container>
					{data.products.map((product) => {
						return (
							<Grid item xs={12} md={4} key={product.id} className={styles.productContainer}>
								<img src={product.image_url} alt="product" />
								<h2>
									{product.product_options.prefix}
									{product.title}
								</h2>
								<p>
									From {product.price} {selectedCurrency}
								</p>
								<button type="button" onClick={() => addProductToCart(product)}>
									Add To Cart
								</button>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</div>
	);
}

export default Products;
