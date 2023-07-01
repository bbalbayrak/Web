// DropDownMenu.js
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid'; // Sağa doğru ok ikonu ekledik

export function DropDownMenu({ subItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        <subItem.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
      </div>
      <div className="flex-auto">
        <div className="flex justify-between items-center">
          <span className="block font-semibold text-gray-900">{subItem.name}</span>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <p className="mt-1 text-gray-600">{subItem.description}</p>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-full mt-2 w-48 rounded-md shadow-lg z-10">
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {subItem.subItems.map(item => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                  role="menuitem"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
