import { gql, makeVar } from "@apollo/client";

export const GET_CART = gql`
	query GetCart {
		cart @client
	}
`;

export const cart = makeVar([]);
