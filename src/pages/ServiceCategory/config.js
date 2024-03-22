// Given fields object
export const fields = {
  name: {
    type: 'string',
    required: true,
    disableForForm: false,
  },
  description: {
    type: 'textarea',
    disableForForm: false,
  },
  subscription_type: {
    type: 'checkoxes',
    label: 'Subscription Type',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    hasFeedback: true,
  },
  enabled: {
    type: 'boolean',
    disableForForm: false,
    label:'status'
  },
};

// // Transformation function
// function transformFields(fields) {
//   const newFields = { ...fields };

//   if (newFields.subscription_type && newFields.subscription_type.type === 'checkoxes') {

//     console.log('newFields.subscription_type -- ', newFields.subscription_type);
//     newFields.subscription_type.type = 'array';
//     newFields.subscription_type.items = {
//       subscription: { type: 'checkoxes' },
//       removed: { type: 'boolean', default: false },
//       enabled: { type: 'boolean', default: true }
//     };
//     delete newFields.subscription_type.options;
//   }

//   return newFields;
// }

// // Usage
// const transformedFields = transformFields(fields);
// console.log({transformedFields});
