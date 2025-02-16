export const columns = [
    'Vendor Name',
    'Customer Name',
    'Product Name',
    'Order Number',
    'Project Number',
    'Qty',
    'Method',
    'Control Type',
    'Control Responsible',
    'Control Date',
    'Note',
    'Description',
    'Document',
    '',
    'Delivery Date',
    'Status',
    // 'State',
  ];

export const control_type = [
    'Mid Control',
    'Final Control'
];

export const control_method = [
  'On Field',
  'Remote',
  'On App'
];

export const columnDisplayToDataMap = {
  'Vendor Name': 'vendor_name',
  'Customer Name': 'customer_name',
  'Product Name': 'product_name',
  'Order Number': 'order_number',
  'Project Number': 'project_number',
  'Quantity': 'quantity',
  'Method': 'control_method',
  'Control Type': 'control_type',
  'Control Responsible': 'control_responsible',
  'Control Date': 'control_date',
  'Note': 'note',
  'Description': 'description',
  'Delivery Date': 'delivery_date',
  'Status': 'status',
  'State': 'state',
};
