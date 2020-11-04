import React from "react";
import Logo from "../../assets/imgs/logo.webp";
import cartIcon from "../../assets/imgs/cart-icon.webp";
import { selectedCurrency, GET_CURRENCIES } from "../../graphql/currencies";
import { GET_MENU_IS_OPEN, menuIsOpen } from "../../graphql/side-menu-openner";
import { useQuery } from "@apollo/client";
import styles from "./assets/header.module.sass";
import SideMenu from "./sub-components/side-menu/side-menu";

function Header() {
	const {
		data: currenciesData = {
			currency: [],
		},
	} = useQuery(GET_CURRENCIES, {
		onCompleted(data) {
			selectedCurrency(data.currency[0]);
		},
	});

	const { data: menuIsOpenQuery } = useQuery(GET_MENU_IS_OPEN);

	function handleMenu() {
		menuIsOpen(!menuIsOpenQuery.menuIsOpen);
	}

	function closeMenu() {
		menuIsOpen(false);
	}

	return (
		<header className={styles.container}>
			<img src={Logo} alt="Logo" />
			<button onClick={handleMenu} type="button">
				<img src={cartIcon} alt="cart icon" />
			</button>
			<SideMenu
				closeMenu={closeMenu}
				menuOpen={menuIsOpenQuery.menuIsOpen}
				setMenuOpen={menuIsOpen}
				currenciesData={currenciesData}
			/>
		</header>
	);
}

export default Header;
