export const fields = {
  name: {
    type: 'string',
    disableForForm: false,
    required: true,
    disableForTable: false,
  },

  description: {
    type: 'string',
    disableForTable: true,
  },
  primary_work_order_cost: {
    type: 'float',
    disableForTable: true,
  },
  Quotations_Cost: {
    type: 'float',
    disableForTable: true,
  },
  Execution_Work_Orders_Cost: {
    type: 'float',
    disableForTable: true,
  },
  Free_Quotations: {
    type: 'string',
    disableForTable: true,
  },
  Free_Work_Orders: {
    type: 'string',
    disableForTable: true,
  },
  Numbers_of_users: {
    type: 'float',
    disableForTable: true,
  },
  Discount: {
    type: 'string',
    disableForTable: false,
  },
  Tax: {
    type: 'string',
    disableForTable: true,
  },
  No_of_Roles: {
    type: 'string',
    disableForTable: false,
  },
  Default_Storage: {
    type: 'string',
    disableForTable: true,
  },
  Additional_Storage: {
    type: 'string',
    disableForTable: true,
  },
  Additional_Storage_Cost: {
    type: 'string',
    disableForTable: true,
  },
  Quotation_Status: {
    type: 'Boolean',
    disableForTable: true,
  },
  Contracts_Status: {
    type: 'Boolean',
    disableForTable: true,
  },
  Work_Order_Status: {
    type: 'Boolean',
    disableForTable: false,
  },
  Active_Status: {
    type: 'Boolean',
    disableForTable: true,
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
