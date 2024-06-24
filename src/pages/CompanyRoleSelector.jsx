// import React, { useState } from 'react';

// const CompanyRoleSelector = () => {
//     const [selectedCompany, setSelectedCompany] = useState('');
//     const [selectedRole, setSelectedRole] = useState('');
//     const [customers, setCustomers] = useState([]);
//     const [roles, setRoles] = useState([]);

//     // Dummy data for companies, customers, and roles
//     const companies = [
//         { id: 1, name: 'Company A' },
//         { id: 2, name: 'Company B' },
//         { id: 3, name: 'Company C' }
//     ];

//     const companyCustomersMap = {
//         'Company A': ['Customer A1', 'Customer A2', 'Customer A3'],
//         'Company B': ['Customer B1', 'Customer B2', 'Customer B3'],
//         'Company C': ['Customer C1', 'Customer C2', 'Customer C3']
//     };

//     const companyRolesMap = {
//         'Company A': ['Role A1', 'Role A2', 'Role A3'],
//         'Company B': ['Role B1', 'Role B2', 'Role B3'],
//         'Company C': ['Role C1', 'Role C2', 'Role C3']
//     };

//     // Function to handle company selection
//     const handleCompanyChange = (e) => {
//         const company = e.target.value;
//         setSelectedCompany(company);
//         setCustomers(companyCustomersMap[company]);
//         setRoles(companyRolesMap[company]);
//         // Reset selected role
//         setSelectedRole('');
//     };

//     // Function to handle role selection
//     const handleRoleChange = (e) => {
//         setSelectedRole(e.target.value);
//     };

//     return (
//         <div>
//             <label htmlFor="company">Select Company:</label>
//             <select id="company" value={selectedCompany} onChange={handleCompanyChange}>
//                 <option value="">Select a company</option>
//                 {companies.map(company => (
//                     <option key={company.id} value={company.name}>{company.name}</option>
//                 ))}
//             </select>

//             <br />

//             <label htmlFor="customer">Select Customer:</label>
//             <select id="customer">
//                 <option value="">Select a customer</option>
//                 {customers.map((customer, index) => (
//                     <option key={index} value={customer}>{customer}</option>
//                 ))}
//             </select>

//             <br />

//             <label htmlFor="role">Select Role:</label>
//             <select id="role" value={selectedRole} onChange={handleRoleChange}>
//                 <option value="">Select a role</option>
//                 {roles.map((role, index) => (
//                     <option key={index} value={role}>{role}</option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// export default CompanyRoleSelector;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { request } from '@/request';// Import your request library
import { Select } from 'antd'; // Import Select component from Ant Design

const CompanyRoleSelector = () => {
    //     const [selectedCompany, setSelectedCompany] = useState('');
    //     const [selectedRole, setSelectedRole] = useState('');
    //     const [customers, setCustomers] = useState([]);
    //     const [roles, setRoles] = useState([]);
    //     const [companies, setCompanies] = useState([]);

    //     useEffect(() => {
    //         // Fetch companies from API
    //         axios.get('http://localhost:8001/api/roles/showRoles')
    //             .then(response => {
    //                 console.log(response.data.result);
    //                 setRoles(response.data.result);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching roles:', error);
    //             });
    //     }, []);

    //     const fetchCustomersAndRoles = (companyName) => {
    //         //     // Fetch customers and roles based on selected company from API
    //         //     axios.get(`https://your-api-url/companies/${companyName}`)
    //         //         .then(response => {
    //         //             const { customers, roles } = response.data;
    //         //             setCustomers(customers);
    //         //             setRoles(roles);
    //         //         })
    //         //         .catch(error => {
    //         //             console.error(`Error fetching customers and roles for ${companyName}:`, error);
    //         //         });
    //     };

    //     const handleCompanyChange = (e) => {
    //         //     const company = e.target.value;
    //         //     setSelectedCompany(company);
    //         //     fetchCustomersAndRoles(company);
    //         //     // Reset selected role
    //         //     setSelectedRole('');
    //     };

    //     const handleRoleChange = (e) => {
    //         setSelectedRole(e.target.value);
    //     };

    //     return (
    //         <div>
    //             <label htmlFor="company">Select Company:</label>
    //             <select id="company" value={selectedCompany} onChange={handleCompanyChange}>
    //                 <option value="">Select a company</option>
    //                 {companies.map(company => (
    //                     <option key={company.id} value={company.name}>{company.name}</option>
    //                 ))}
    //             </select>

    //             <br />

    //             <label htmlFor="customer">Select Customer:</label>
    //             <select id="customer">
    //                 <option value="">Select a customer</option>
    //                 {customers.map((customer, index) => (
    //                     <option key={index} value={customer}>{customer}</option>
    //                 ))}
    //             </select>

    //             <br />

    //             <label htmlFor="role">Select Role:</label>
    //             <select id="role" value={selectedRole} onChange={handleRoleChange}>
    //                 {Array.isArray(roles) && roles.map((role, index) => (
    //                     <option key={index} value={role._id}>{role.default_name}</option>

    //                 ))}
    //             </select>
    //         </div>
    //     );
    // const [options, setOptions] = useState([]); // Initialize state to store dropdown options

    // useEffect(() => {
    //     // Fetch data from API
    //     const fetchData = async () => {
    //         try {
    //             const response = await request.getRoles(); // Assuming your request function is named getData()
    //             // Assuming your API response contains an array of options as response.options
    //             if (response.success) {
    //                 setOptions(response.result); // Set options state based on API response
    //             }

    //             console.log(response)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData(); // Call fetchData function when component mounts
    // }, []); // Empty dependency array ensures useEffect runs only once after initial render

    // return (
    //     <div>
    //         <Select defaultValue={null}>
    //             {/* Render dropdown options dynamically */}
    //             {options.map(option => (
    //                 <Select.Option key={option._id} value={option.name}>
    //                     {option.label}
    //                 </Select.Option>
    //             ))}
    //         </Select>
    //         {/* Render other components or UI elements */}
    //     </div>
    // );

    // const [options, setOptions] = useState([]); // Initialize state to store dropdown options

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await request.getRoles(); // Assuming your request function is named getData()
                // Assuming your API response contains an array of options as response.options
                if (response.success) {
                    setOptions(response.result); // Set options state based on API response
                }

                console.log(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, []);


    const [selectedValue, setSelectedValue] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleChange = async (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // Fetch data from API based on the selected value

        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await request.getCateGorySubscription({ id: value }); // Assuming your request function is named getData()
                // Assuming your API response contains an array of options as response.options
                if (response.success) {
                    setResponseData(response.result); // Set options state based on API response
                }

                console.log(response.result)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    };

    return (
        <div>
            <select value={selectedValue} onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="6602c4500b127c22abc7c1a7">Test Cleaner</option>
                <option value="66026b730b127c22abc798a2">Shop Cleaner</option>
                {/* Add more options as needed */}
            </select>

            {/* Render input fields based on API response */}
            {responseData && (
                <div>
                    {responseData?.map((item) => (
                        <div key={item.subscription._id}>
                            <label>{item.subscription.name}</label>
                            <input type="text" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default CompanyRoleSelector;