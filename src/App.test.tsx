import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "./utils/UserContext";
import client from "./utils/ApolloClient";
import App from "./App";
import RouterConfig from "./routes/Router";

jest.mock("./routes/Router", () => jest.fn());
describe("App", () => {

  it("renders RouterConfig component", () => {
    render(
      <ApolloProvider client={client}>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </ApolloProvider>
    );

    expect(RouterConfig).toHaveBeenCalledTimes(1);
  });

  it("provides Apollo client through ApolloProvider", () => {
    const ApolloProvider = jest.fn()
    render(
      <ApolloProvider client={client}>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </ApolloProvider>
    );
    expect(ApolloProvider).toHaveBeenCalledTimes(1);
  });

  it("provides UserContext through UserProvider", () => {
    const UserProvider = jest.fn();
    render(
      <ApolloProvider client={client}>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </ApolloProvider>
    );
    expect(UserProvider).toHaveBeenCalled();
  });
});

