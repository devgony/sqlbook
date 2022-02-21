import { NextComponentType } from 'next';
import Link from 'next/link';

const NavBar: NextComponentType = () => {
  return (
    <div className="w-full flex h-10 justify-between items-center">
      <Link href="/">
        <a className="bg-yellow-300 ml-4 text-3xl">📖 SQL Book</a>
      </Link>
      <nav className="w-1/2 flex justify-around">
        <Link href="/top-sql">
          <a>TOP SQL</a>
        </Link>
        <Link href="/tuning-history">
          <a>TUNING HISTORY</a>
        </Link>
        <Link href="/admin">
          <a>ADMIN</a>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
