import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import NavBar from '../components/NavBar';
import '../styles/table.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="h-screen">
        <NavBar />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
