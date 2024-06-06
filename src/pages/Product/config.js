export const fields = {
  name: {
    type: 'string',
    required: true,
  },
  productCategory: {
    type: 'async',
    label: 'product Category',
    displayLabels: ['productCategory', 'name'],
    dataIndex: [ 'name'],
    entity: 'productcategory',
    required: true,
    disableForTable: false,
    disableForForm: false,
  },
  price: {
    type: 'string',
    disableForTable: false,
    required: true,
  },
  enabled: {
    type: 'boolean',
    label: 'Status',
  },
};
