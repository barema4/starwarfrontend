import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import RouterConfig from './routes/Router';
import { UserProvider } from './utils/UserContext';
import client from './utils/ApolloClient'


const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
       <UserProvider>
        <Router>
            <RouterConfig />
        </Router>
       </UserProvider>
      
    </ApolloProvider>
  );
};

export default App;

