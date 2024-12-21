import React from 'react';
import ThemeToggleButton from './ToggleButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-white dark:bg-gray-900">
      <h1 className="text-xl font-bold text-black dark:text-white">My App</h1>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
