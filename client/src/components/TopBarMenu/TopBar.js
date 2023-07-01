import menuItems from './MenuItems';
import { Quality } from './Quality';
import { Logistics } from './Logistics';
import { Accounting } from './Accounting';
import { SubMenuItem } from './SubMenuItem';

export function TopBar() {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="./yenaengineering.jpeg" alt="Logo" className="h-10 w-15 mr-4" />
          </div>
          <div className="flex items-center">
            {menuItems.map(item => (
              <SubMenuItem key={item.name} item={item} />
            ))}
          </div>
          <div style={{ width: '2.5rem' }}></div> {/* Logo için sağda boşluk oluşturduk */}
        </div>
      </div>
    </nav>
  );
}
