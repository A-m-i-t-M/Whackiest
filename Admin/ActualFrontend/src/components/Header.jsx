import React from 'react';
import ThemeToggleButton from './ToggleButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-neutral-200 dark:bg-gray-900 dark:border-purple-300">
      <h1 className="text-xl font-bold text-black dark:text-purple-300">Pooja Pehal</h1>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
