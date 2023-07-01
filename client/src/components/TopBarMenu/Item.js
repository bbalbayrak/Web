export function Item({subItem}) {
  return (
    <a href={subItem.href} className="flex items-center p-2 -m-2 rounded-md hover:bg-gray-50">
      <subItem.icon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
      <span className="ml-2 text-sm text-gray-900">{subItem.name}</span>
    </a>
  );
}
