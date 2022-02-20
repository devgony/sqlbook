import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {/* <Logo /> */}
      <NavBar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
