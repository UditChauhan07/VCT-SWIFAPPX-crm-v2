export const fields = {
  name: {
    type: 'string',
    disableForForm: false,
    required: true,
    disableForTable: false,
  },

  description: {
    type: 'string',
    type: 'textarea',
    disableForForm: false,
  },
  
  primary_work_order_cost: {
    type: 'float',
    disableForTable: true,
  },
  quotation_cost: {
    type: 'float',
    disableForTable: true,
  },
  execution_work_orders_cost: {
    type: 'float',
    disableForTable: true,
  },
  free_quotations: {
    type: 'float',
    disableForTable: true,
  },
  free_work_orders: {
    type: 'float',
    disableForTable: true,
  },
  numbers_of_users: {
    type: 'float',
    disableForTable: true,
  },
  discount: {
    type: 'float',
    disableForTable: false,
  },
  tax: {
    type: 'float',
    disableForTable: true,
  },
  no_of_roles: {
    type: 'float',
    disableForTable: false,
  },
  default_storage: {
    type: 'float',
    disableForTable: true,
  },
  additional_storage: {
    type: 'float',
    disableForTable: true,
  },
  additional_storage_cost: {
    type: 'float',
    disableForTable: true,
  },
  quotation_status: {
    type: 'boolean',
    disableForTable: true,
  },
  contract_status: {
    type: 'boolean',
    disableForTable: true,
  },
  work_order_status: {
    type: 'boolean',
    disableForTable: false,
  },
  enabled: {
    type: 'boolean',
    disableForTable: true,
    label: 'Active Status'
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
