// Navbar.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Tab from './Tab';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleTabClick = (index: number, path: string) => {
    setActiveTab(index);
    router.push(path);
  };

  const tabs = [
    { title: 'Schedule', path: '/' },
    { title: 'BUS', path: '/bus' },
    { title: 'Super', path: '/super' },
    { title: 'Recetas', path: '/recipes' },
    { title: 'Perfil', path: '/profile' },
  ];

  return (
    <div className="h-16 border-t-2 w-full fixed bottom-0 bg-white flex flex-row justify-around items-center">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab.title}
          active={index === activeTab}
          onClick={() => handleTabClick(index, tab.path)}
        />
      ))}
    </div>
  );
}
