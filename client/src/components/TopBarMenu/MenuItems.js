import { 
  ChartPieIcon, 
  CursorArrowRaysIcon, 
  FingerPrintIcon, 
  ArrowPathIcon, 
  SquaresPlusIcon 
} from '@heroicons/react/24/outline'

const menuItems = [
  { 
    name: 'Logo', 
    href: '/home',
    imgSrc: './yenaengineering.jpeg',
    imgAlt: 'Logo',
    imgClass: 'h-10 w-15 mr-4',
    isLogo: true
  },
  { 
    name: 'Quality', 
    subItems: [
      { name: 'Products', href: '/products', icon: ChartPieIcon },
      { name: 'PQC', href: '/pqc', icon: CursorArrowRaysIcon },
      { 
        name: 'WorkOrders',
        subItems: [
          { name: 'Açık İşler', href: '/workorders', icon: ChartPieIcon },
          { name: 'Kapalı İşler', href: '/closed-workorders', icon: CursorArrowRaysIcon },
        ],
        icon: FingerPrintIcon,
      },
      { 
        name: 'Inspection Plan', 
        subItems: [
          { name: 'All Inspection', href: '/inspection-plan', icon: ChartPieIcon },
          { name: 'Open Inspection', href: '/open-inspection', icon: CursorArrowRaysIcon },
          { name: 'Close Inspection', href: '/closed-inspection', icon: FingerPrintIcon },
        ],
        icon: ArrowPathIcon
      },
    ] 
  },
  { 
    name: 'Logistics', 
    subItems: [
      { name: 'Transfers', href: '/transfers', icon: SquaresPlusIcon },
    ] 
  },
  { 
    name: 'Parameters', 
    subItems: [
      { name: 'Vendors', href: '/vendors', icon: ChartPieIcon },
      { name: 'Customers', href: '/customers', icon: CursorArrowRaysIcon },
      { name: 'Users', href: '/users', icon: FingerPrintIcon },
    ] 
  },
]

export default menuItems;
