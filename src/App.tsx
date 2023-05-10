import React from "react";
import { ApolloProvider } from "@apollo/client";
import RouterConfig from "./routes/Router";
import { UserProvider } from "./utils/UserContext";
import client from "./utils/ApolloClient";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
          <RouterConfig />
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
