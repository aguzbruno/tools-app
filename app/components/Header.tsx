'use client';
import Link from 'next/link';
import { useDarkMode } from '../store/darkMode';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  const { darkMode } = useDarkMode();

  return (
    <header className={` ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`} style={{backgroundImage:`url('/4208057-01.png')`,backgroundSize:"cover",borderBottomRightRadius:'50%',borderBottomLeftRadius:'50%',boxShadow:"10px 5px 5px #c5b4b4"}}>
      
      <div className="flex flex-col container mx-auto px-4 py-2 flex justify-between items-center">
        
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">My Tools</h1>
          <ThemeSwitch />
        </div>
        
        <nav className="flex space-x-6">
          {/* <Link href="/recipes">
            <div className={`px-4 py-2 rounded-md transition duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              Recetas
            </div>
          </Link> */}
          {/* <Link href="/super">
            <div className={`px-4 py-2 rounded-md transition duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              Super
            </div>
          </Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
