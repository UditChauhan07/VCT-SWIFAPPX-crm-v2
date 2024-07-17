export const fields = {
  name: {
    type: 'string',
    required: true,
  },
  people: {
    type: 'search',
    renderAsTag: true,
    label: 'Contact',
    entity: 'people',
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
    dataIndex: ['people', 'firstname'],
     disableForTable: true,
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
  website: {
    type: 'url',
  },
};
