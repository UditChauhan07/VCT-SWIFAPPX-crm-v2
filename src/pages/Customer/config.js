export const fields = {
  type: {
    type: 'selectwithfeedback',
    renderAsTag: true,
    options: [
      { value: 'people', label: 'people', color: 'magenta' },
      { value: 'company', label: 'company', color: 'blue' },
    ],
    required: true,
    hasFeedback: true,
  },
  name: {
    type: 'string',
    disableForForm: true,
  },
  country: {
    type: 'country',
    // color: 'red',
    disableForForm: true,
  },
  phone: {
    type: 'phone',
    disableForForm: true,
  },
  email: {
    type: 'email',
    disableForForm: true,
  },
  people: {
    type: 'search',
    label: 'people',
    entity: 'people',
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
    dataIndex: ['people', 'firstname'],
    disableForTable: true,
    feedback: 'people',
  },
  company: {
    type: 'search',
    label: 'company',
    entity: 'company',
    displayLabels: ['name'],
    searchFields: 'name',
    dataIndex: ['company', 'name'],
    disableForTable: true,
    feedback: 'company',
  },

  selected_customer: {
    type: 'search',
    label: 'Select Customer',
    entity: 'people',
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
    // dataIndex: ['people', 'firstname'],
    disableForTable: true,
    feedback: 'company',
  },
  // role: {
  //   type: 'search',
  //   label: 'roles',
  //   entity: 'roles',
  //   displayLabels: ['name'],
  //   searchFields: 'name',
  //   dataIndex: ['roles', 'name'],
  // },
  role: {
    type: 'select',
    renderAsTag: true,
    required: true,
    options: [
      { value: '1', label: 'Super Admin' },
      { value: '2', label: 'Manager' },
      { value: '3', label: 'Accountant' },
    ],
  },
  status: {
    type: 'select',
    renderAsTag: true,
    required: true,
    options: [
      { value: '1', label: 'Active' },
      { value: '0', label: 'In-Active' },
    ],
  },
  username: {
    type: 'text',
    required: true,
    renderAsTag: true,
  },
  password: {
    type: 'password',
    required: true,
    renderAsTag: true,
  },
};
