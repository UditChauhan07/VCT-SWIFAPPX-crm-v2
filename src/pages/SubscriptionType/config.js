export const fields = {
  name: {
    type: 'string',
    required: true,
  
    disableForForm: false,
  },
  description: {
    type: 'textarea',
    disableForTable: true,
  
  },
  package_type: {
    required: true,
    type: 'selectWithTranslation',
    disableForTable: false,
    renderAsTag: true,
    options: [
      { value: 'One Time', label: 'One Time', color: 'blue' },
      { value: 'Monthly', label: 'Monthly', color: 'green' },
      { value: 'Yearly', label: 'Yearly', color: 'pink' },
    ],
  },
  package_divider: {
    type: 'string',
    disableForTable: false,
    required: true,
  },
  enabled: {
    type: 'boolean',
    disableForTable: false,
    // disableForForm: false,
    label: 'Status',
  
  },
};

 export const readColumns = {
   name: {
     type: 'string',
     required: true,

     disableForForm: false,
   },
   description: {
     type: 'textarea',
     disableForTable: true,
   },
   package_type: {
     required: true,
     type: 'selectWithTranslation',
     disableForTable: false,
     renderAsTag: true,
     options: [
       { value: 'One Time', label: 'One Time', color: 'blue' },
       { value: 'Monthly', label: 'Monthly', color: 'green' },
       { value: 'Yearly', label: 'Yearly', color: 'pink' },
     ],
   },
   package_divider: {
     type: 'string',
     disableForTable: false,
     required: true,
   },
   enabled: {
     type: 'boolean',
     disableForTable: false,
     // disableForForm: false,
     label: 'Status',
   },
 };



