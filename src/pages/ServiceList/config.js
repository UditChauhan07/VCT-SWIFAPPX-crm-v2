export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  serviceCategory: {
    type: 'async',
    label: 'service Category',
    dataIndex: ['serviceCategory', 'name'],
    entity: 'serviceCategory',
    disableForForm: true,
  },
  description: {
    type: 'textarea',
    disableForTable: true,
    disableForForm: true,
  },
  enabled: {
    type: 'boolean',
    label: 'Status',
  },
};
