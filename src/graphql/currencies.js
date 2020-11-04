import { gql, makeVar } from "@apollo/client";

export const GET_CURRENCIES = gql`
	query GetCurrenies {
		currency
	}
`;

export const GET_CURRENT_CURRENCY = gql`
	query GetCurrentCurreny {
		selectedCurrency @client
	}
`;

export const selectedCurrency = makeVar(null);
