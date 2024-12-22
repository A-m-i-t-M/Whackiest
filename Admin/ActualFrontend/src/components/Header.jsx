// import React from 'react';
// import ThemeToggleButton from './ToggleButton';

// const Header = () => {
//   return (
//     <header className="flex justify-between items-center p-5 bg-neutral-200 dark:bg-gray-900 dark:border-purple-300">
//       <h1 className="text-xl font-bold text-black dark:text-purple-300">Pooja Pehal</h1>
//       <ThemeToggleButton />
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import ThemeToggleButton from './ToggleButton';

const Header = () => {
  const handleSignOut = async () => {
    try {
      const res = await fetch("/backend/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        console.log(data.error);
      } else {
        console.log("Signed out");
      }

      window.location.href = "/";
    } catch (error) {
      console.log("Couldn't sign out");
    }
  };

  return (
    <header className="flex justify-between items-center p-5 bg-neutral-200 dark:bg-gray-900 dark:border-purple-300">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={handleSignOut}
      >
        <img 
          src="../../public/favicon.svg" 
          alt="Logo" 
          className="h-8 w-8"
        />
        <h1 className="text-xl font-bold text-black dark:text-purple-300">
          Pooja Pehal
        </h1>
      </div>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
