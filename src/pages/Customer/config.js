
const fields = {
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
  },
  email: {
    type: 'email',
    required: true,
    displayLabels: ['email'],
    dataIndex: ['admin', 'email'],
  },
  password: {
    type: 'password',
    required: true,
    renderAsTag: true,
    disableForTable: true,
  },
  country: {
    type: 'countryCustom',
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

// const apiUrl = 'http://localhost:8001/api/client/list?page=1&items=10';

// async function fetchData() {
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// }

// async function setSelectedTypeForEntries() {
//   try {
//     const data = await fetchData();
//     const entriesConfig = [];

//     for (const entry of data.result) {
//       const selectedType = entry.type;
//       const entryConfig = {};
//       entryConfig.selectedType = selectedType;
//       entryConfig.dataIndex = (selectedType === 'Company') ? ['company', 'name'] : ['people', 'firstname'];
//       entriesConfig.push(entryConfig);
//       console.log(`Selected type for entry: ${selectedType}`);
//     }
//     return entriesConfig;
//   } catch (error) {
//     console.error('Error setting selectedType for entries:', error);
//     return null;
//   }
// }

// async function configureFields() {
//   try {
//     const entriesConfig = await setSelectedTypeForEntries();
//     for (const entryConfig of entriesConfig) {
//       fields[entryConfig.selectedType.toLowerCase()] = {
//         type: 'string',
//         disableForForm: true,
//         dataIndex: entryConfig.dataIndex,
//       };
//     }
//     console.log(fields);
//   } catch (error) {
//     console.error('Error configuring fields:', error);
//   }
// }

// // Call the function to configure fields
// configureFields();

// Export the fields object
export { fields };



