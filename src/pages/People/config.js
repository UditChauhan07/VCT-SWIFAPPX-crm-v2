export const fields = {
  firstname: {
    type: 'string',
    required: true,
    label: 'First Name',
  },
  lastname: {
    type: 'string',
    // required: true,
    label: 'Last Name',
  },
  company: {
    type: 'search',
    entity: 'company',
    renderAsTag: true,
    displayLabels: ['name'],
    searchFields: 'name',
    dataIndex: ['company', 'name'],
  },
  country: {
    type: 'country',
  },
  phone: {
    type: 'phone',
    // required: true,
  },
  email: {
    type: 'email',
    // required: true,
  },

};
