export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  description: {
    type: 'textarea',
    disableForForm: false,
  },
  subscription_type: {
    type: 'checkoxes',
    label: 'Subscription Type',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    hasFeedback: true,
    disableForTable: true,
  },
  enabled: {
    type: 'boolean',
    disableForForm: false,
    label:'status'
  },
};