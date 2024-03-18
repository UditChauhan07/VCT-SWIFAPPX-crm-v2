export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },

  description: {
    type: 'string',
    disableForTable: false,
  },
  Package_Type: {
    type: 'string',
    disableForTable: false,
  },
  Package_Divider: {
    type: 'string',
    disableForTable: false,
  },
  Active_Status: {
    type: 'string',
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
