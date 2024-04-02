export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  subscription_type: {
    type: 'select',
    options: [
      { value: 'Cleaning', label: 'Cleaning' },
      { value: 'Home Cleaning', label: 'Home Cleaning' },
    ],
    required: true,
    hasTypeList: true,
  },
  description: {
    type: 'textarea',
  },
  enabled: {
    type: 'boolean',
    disableForForm: false,
    label:'status'
  },
};
