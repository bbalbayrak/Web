import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, ArrowPathIcon, SquaresPlusIcon } from '@heroicons/react/24/outline'

const menuItems = [
  { 
    name: 'Quality', 
    subItems: [
      { name: 'Vendors', description: 'Details about vendors', href: '#', icon: ChartPieIcon },
      { name: 'Customers', description: 'Details about customers', href: '#', icon: CursorArrowRaysIcon },
      { name: 'Values', description: 'Details about values', href: '#', icon: FingerPrintIcon },
    ] 
  },
  { 
    name: 'Logistics', 
    subItems: [
      { name: 'Sub-item 1', description: 'Description', href: '#', icon: ArrowPathIcon },
      // You can add more sub-items here
    ] 
  },
  { 
    name: 'Accounting', 
    subItems: [
      { name: 'Sub-item 1', description: 'Description', href: '#', icon: SquaresPlusIcon },
      // You can add more sub-items here
    ] 
  },
]

export default menuItems;
