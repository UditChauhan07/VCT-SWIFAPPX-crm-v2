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
    type: 'string',
    disableForTable: false,
  },
  package_divider: {
    type: 'string',
    disableForTable: false,
  },
  active_status: {
    type: 'boolean',
    disableForTable: false,
  },
  // country: {
  //   type: 'country',
  //   // color: 'red',
  //   disableForForm: true,
  // },
  // phone: {
  //   type: 'phone',
  //   disableForForm: true,
  // },
  // email: {
  //   type: 'email',
  //   disableForForm: true,
  // },
  // people: {
  //   type: 'search',
  //   label: 'people',
  //   entity: 'people',
  //   displayLabels: ['firstname', 'lastname'],
  //   searchFields: 'firstname,lastname',
  //   dataIndex: ['people', 'firstname'],
  //   disableForTable: true,
  //   feedback: 'people',
  // },
  // company: {
  //   type: 'select',
  //   label: 'company',
  //   entity: 'company',
  //   displayLabels: ['name'],
  //   searchFields: 'name',
  //   dataIndex: ['company', 'name'],
  //   disableForTable: true,
  //   feedback: 'company',
  // },
};
