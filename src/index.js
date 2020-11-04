import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import graphqlOptions from "./graphql/cache-options";

const client = new ApolloClient({
	uri: "https://pangaea-interviews.now.sh/api/graphql",
	cache: new InMemoryCache(graphqlOptions),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
