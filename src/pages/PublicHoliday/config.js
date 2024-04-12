export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  description: {
    type: 'string',
    type: 'textarea',
    disableForForm: false,
  },
  date: {
    type: 'date',
    required: true,
    disableForUpdate: true,
  },
  enabled: {
    type: 'boolean',
    label: 'Status',
  },
};
