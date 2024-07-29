// Tab.tsx
import React from 'react';

interface TabProps {
  title: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ title, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 cursor-pointer ${active ? ' font-bold bg-red-100 rounded-2xl' : 'text-gray-500'}`}
    >
      {title}
    </div>
  );
};

export default Tab;
