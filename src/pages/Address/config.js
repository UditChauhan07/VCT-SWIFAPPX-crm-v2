import { useParams } from 'react-router-dom';
export const fields = {
  label: {
    type: 'string',
    label: 'address_label',
    displayLabels: ['name'],
    searchFields: 'name',
    required: true,
    disableForTable: false,
  },
  contactPerson: {
    type: 'string',
    label: 'contact_person',
    displayLabels: ['name'],
    required: true,
    disableForTable: false,
  },
  contactNumber: {
    type: 'phone',
    label: 'contact_number',
    displayLabels: ['name'],
    required: true,
    disableForTable: false,
  },
  street: {
    type: 'string',
    label: 'street',
    displayLabels: ['name'],
    required: true,
    disableForTable: false,
  },
  unit: {
    type: 'string',
    label: 'unit',
    displayLabels: ['name'],
    disableForTable: false,
  },
  block: {
    type: 'string',
    label: 'block',
    displayLabels: ['name'],
    disableForTable: false,
  },
  state: {
    type: 'string',
    label: 'state',
    displayLabels: ['name'],
    required: true,
    disableForTable: false,
  },
  country: {
    type: 'string',
    label: 'country',
    displayLabels: ['name'],
    required: true,
    disableForTable: false,
  },
  zipCode: {
    type: 'string',
    label: 'postal_code',
    displayLabels: ['name'],
    required: true,
    disableForTable: false,
  },
};
  
  export const readColumns = {

   
    label: {
      type: 'string',
      disableForForm: true,
    
    },

    contactPerson: {
      type: 'string',
      disableForForm: true,
      label:  'contact_person',
    },

    contactNumber: {
      type: 'string',
      disableForForm: true,
      label:  'contact_number',
    },

    street: {
      type: 'string',
      disableForForm: true,
    },
    unit: {
      type: 'string',
      disableForForm: true,
    },
    block: {
      type: 'string',
      disableForForm: true,
    },
    state: {
      type: 'string',
      disableForForm: true,
    },
    country: {
      type: 'string',
      disableForForm: true,
    },
    zipCode: {
      type: 'string',
      disableForForm: true,
      label:  'postal_code',
    },
  };
  