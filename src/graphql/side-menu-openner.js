import { gql, makeVar } from "@apollo/client";

export const GET_MENU_IS_OPEN = gql`
	query getMenuIsOpen {
		menuIsOpen @client
	}
`;

export const menuIsOpen = makeVar(false);
