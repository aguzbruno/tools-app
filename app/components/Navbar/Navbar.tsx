import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Tab from './Tab';
import { usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const tabs = [
    { title: 'Schedule', path: '/' },
    { title: 'BUS', path: '/bus' },
    { title: 'Super', path: '/super' },
    { title: 'Recetas', path: '/recipes' },
    { title: 'Perfil', path: '/profile' },
  ];
  const routerPath = usePathname();
  useEffect(() => {
    // Obtener la ruta actual desde el router
    const currentPath = routerPath

    // Encontrar el índice de la pestaña correspondiente a la ruta actual
    const currentTabIndex = tabs.findIndex(tab => tab.path === currentPath);

    // Establecer la pestaña activa si se encuentra una coincidencia
    if (currentTabIndex !== -1) {
      setActiveTab(currentTabIndex);
    }
  }, [routerPath]); // Reejecutar el efecto cuando cambie la ruta

  const handleTabClick = (index: number, path: string) => {
    setActiveTab(index);
    router.push(path);
  };

  return (
    <div className="p-5 rounded-xl w-full border-t-2 pb-10 fixed bottom-0 bg-white z-50 flex flex-row justify-around items-center" style={{maxWidth:"450px"}}>
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
