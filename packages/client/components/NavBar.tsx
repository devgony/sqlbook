import { useReactiveVar } from '@apollo/client';
import { NextComponentType } from 'next';
import Link from 'next/link';
import { authTokenVar, isLoggedInVar } from '../apollo-client';
import { LOCALSTORAGE_TOKEN } from '../utils/const';

const NavBar: NextComponentType = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    isLoggedInVar(false);
  };
  return (
    <div className="w-full flex h-16 justify-between items-center bg-teal-700 text-gray-200 font-bold">
      <Link href="/">
        <a className="ml-4 text-3xl">📖 SQL Book</a>
      </Link>
      <nav className="w-1/2 flex justify-around">
        {/* <Link href="/sql-list">
          <a>SQL LIST</a>
        </Link> */}
        <Link href="/top-sql">
          <a>TOP SQL</a>
        </Link>
        <Link href="/tuning-history">
          <a>TUNING HISTORY</a>
        </Link>
        <Link href="/admin">
          <a>ADMIN</a>
        </Link>
        {isLoggedIn ? (
          <button className="font-bold" onClick={logout}>
            LOGOUT
          </button>
        ) : null}
      </nav>
    </div>
  );
};

export default NavBar;
