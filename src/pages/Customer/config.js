export const fields = {
  type: {
    type: 'selectwithfeedback',
    renderAsTag: true,
    options: [
      { value: 'People', label: 'People', color: 'magenta' },
      { value: 'Company', label: 'Company', color: 'blue' },
    ],
    required: true,
    hasFeedback: true,
  },
  company: {
    type: 'search',
    label: 'company',
    entity: 'company',
    displayLabels: ['name'],
    searchFields: 'name',
    dataIndex: ['company', 'name'],
    disableForTable: true,
    feedback: 'Company',
  },
  people: {
    type: 'search',
    label: 'people',
    entity: 'people',
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
    dataIndex: ['people', 'firstname'],
    disableForTable: true,
    feedback: 'People',
  },
  name: {
    type: 'string',
    disableForForm: true,
    dataIndex: ['people', 'firstname'],
    // pending
    // dataIndex: ['type'] === 'Company' ? ['company', 'name'] : ['people', 'firstname'],
  },

//   phone: {
//     type: 'phone',
//     disableForForm: true,
//     displayLabels: ['phone'],
//     dataIndex: ['people', 'phone'],
//   },

  email: {
    type: 'email',
    required: true,
    displayLabels: ['email'],
    dataIndex: ['admin', 'email'],
  },
  // dataIndex: hasPeople ? ['people', 'email'] : ['company', 'email'] // Replace 'company, email' with your logic

  password: {
    type: 'password',
    required: true,
    renderAsTag: true,
    disableForTable: true,
  },
  country: {
    type: 'countryCustom',
    // color: 'red',
    disableForForm: true,
    displayLabels: ['country'],
    dataIndex: ['people', 'country'],
  },

  role: {
    type: 'selectRoles',
    required: true,
    hasRoles: true,
    disableForTable: true,
  },
  enabled: {
    type: 'boolean',
    required: true,
    disableForTable: true,
  },
};
