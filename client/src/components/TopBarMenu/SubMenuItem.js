import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { DropDownMenu } from './DropDownMenu';

export function SubMenuItem({ item }) {
  return (
    <Popover className="relative overflow-visible"> {/* overflow-visible ekledik */}
      <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        {item.name}
        <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {item.subItems.map((subItem) => (
              Array.isArray(subItem.subItems) ?
              <DropDownMenu subItem={subItem} key={subItem.name} /> :
              <div
                key={subItem.name}
                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <subItem.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                </div>
                <div className="flex-col items-start">
                  <a href={subItem.href} className="block font-semibold text-gray-900">
                    {subItem.name}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600">{subItem.description}</p>
                </div>
              </div>
              
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}