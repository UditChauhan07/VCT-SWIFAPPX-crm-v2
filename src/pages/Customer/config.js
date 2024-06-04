


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
    required: true,
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
    required: true,
  },
  name: {
    type: 'string',
    disableForForm: true,
  },
  email: {
    type: 'email',
    required: true,
    displayLabels: ['email'],
    dataIndex: ['userAdmin', 'email'],
  },
  password: {
    type: 'password',
    required: true,
    renderAsTag: true,
    disableForTable: true,
  },
  country: {
    type: 'country',
    disableForForm: true,
    displayLabels: ['country'],
    dataIndex: ['country'],
  },
  phone: {
    type: 'phone',
    disableForForm: true,
  },
  role: {
    type: 'selectRoles',
    required: true,
    hasRoles: true,
    disableForTable: true,
  },
  enabled: {
    type: 'boolean',
    // required: true,
    disableForTable: true,
    label: 'Status',
  },
};

export const readColumns = {
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
  name: {
    type: 'string',
    disableForForm: true,
  },
  email: {
    type: 'email',
    required: true,
    displayLabels: ['email'],
    dataIndex: ['userAdmin', 'email'],
  },
  country: {
    type: 'country',
    disableForForm: false,
    displayLabels: ['country'],
    dataIndex: ['country'],
  },
  phone: {
    type: 'phone',
    disableForForm: false,
  },
  // role: {
  //   type: 'selectRoles',
  //   required: true,
  //   hasRoles: true,
  //   disableForTable: false,
  // },
  enabled: {
    type: 'boolean',
    required: true,
    disableForTable: true,
  },
};
