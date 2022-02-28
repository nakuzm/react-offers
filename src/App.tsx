import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import { Offers, Login, NoMatch } from './routes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client';
import {
  onError
} from "@apollo/client/link/error";
import {ReactComponent as Logo} from './svg/Logo.svg';

const errorLink = onError(({graphQLErrors, networkError}) => {
  graphQLErrors?.forEach(({message}) => {
    console.error(`Graphql error: ${message}`);
  });
});

const link = from([
  errorLink,
  new HttpLink({uri: 'http://localhost:8080/graphql'})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="navbar"><div className="container-jf"><Logo/></div></div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/offers" element={<Offers />}/>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}
