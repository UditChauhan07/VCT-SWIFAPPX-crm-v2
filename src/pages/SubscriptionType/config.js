export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  description: {
    type: 'string',
    type: 'textarea',
    disableForTable: false,
  },
  package_type: {
    type: 'selectWithTranslation',
    disableForTable: false,
    renderAsTag: true,
    options: [
      { value: 'default', label: 'draft' },
      { value: 'One Time', label: 'One Time', color: 'blue' },
      { value: 'Monthly', label: 'Monthly', color: 'green' },
      { value: 'Yearly', label: 'Yearly', color: 'orange' }
    ],
  },
  package_divider: {
    type: 'string',
    disableForTable: false,
  },
  enabled: {
    type: 'boolean',
    disableForTable: false,
    label: 'Active'
  },
};
