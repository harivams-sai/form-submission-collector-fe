import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import Dashboard from './screens/Dashboard';

const client = new ApolloClient({
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

export default App;
