import { NextComponentType } from 'next';

const NavBar: NextComponentType = () => {
  return (
    <div className="w-full flex justify-between h-10">
      <div className="bg-yellow-300">SQL Book</div>
      <nav>
        <ul className="flex ">
          <li className="mr-3">TOP SQL</li>
          <li>TUNING HISTORY</li>
        </ul>
      </nav>

      {/* <div className="flex-1 text-center">TOP SQL</div>
      <div className="flex-1 text-center">TOP SQL</div>
      <div className="flex-1 text-center">TUNING HISTORY</div> */}
      {/* <div className="flex-1 text-center">ADMIN</div> */}
    </div>
  );
};

export default NavBar;
