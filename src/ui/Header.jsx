import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/searchOrder';
import UserName from '../features/user/UserName';

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4  py-3 tracking-wide sm:px-6">
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />

      <UserName />
    </header>
  );
};

export default Header;
