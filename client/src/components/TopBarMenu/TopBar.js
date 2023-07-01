import React from 'react';
import { Link } from 'react-router-dom';
import menuItems from './MenuItems';
import { SubMenuItem } from './SubMenuItem';

export function TopBar() {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {menuItems.map((item, index) => {
            if(item.isLogo) {
              return (
                <div key={index} className="flex items-center">
                  <Link to={item.href}>
                    <img src={item.imgSrc} alt={item.imgAlt} className={item.imgClass} />
                  </Link>
                </div>
              )
            } else {
              return (
                <div key={index} className="flex items-center ">
                  <SubMenuItem item={item} />
                </div>
              )
            }
          })}
          <div style={{ width: '2.5rem' }}></div> {/* Logo için sağda boşluk oluşturduk */}
        </div>
      </div>
    </nav>
  );
}
