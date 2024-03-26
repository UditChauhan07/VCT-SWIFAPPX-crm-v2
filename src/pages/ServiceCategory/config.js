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
    type: 'checkoxesCustom',
    label: 'Subscription Type',
    hasOptions: true,
    disableForTable: true,
  },
  enabled: {
    type: 'boolean',
    disableForForm: false,
    label:'status'
  },
};
export const updatefields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  description: {
    type: 'textarea',
    disableForForm: false,
  },
  enabled: {
    type: 'boolean',
    disableForForm: false,
    label:'status'
  },
};