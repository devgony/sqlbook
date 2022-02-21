import { useReactiveVar } from '@apollo/client';
import { NextPage } from 'next';
import { isLoggedInVar } from '../apollo-client';
import Login from '../components/Login';

const Admin: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <h1>loggined admin page</h1> : <Login />;
};
export default Admin;
