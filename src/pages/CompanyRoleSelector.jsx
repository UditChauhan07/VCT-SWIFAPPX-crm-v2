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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyRoleSelector = () => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [customers, setCustomers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch companies from API
        axios.get('http://localhost:8001/api/roles/showRoles')
            .then(response => {
                console.log(response.data.result);
                setRoles(response.data.result);
            })
            .catch(error => {
                console.error('Error fetching roles:', error);
            });
    }, []);

    const fetchCustomersAndRoles = (companyName) => {
        //     // Fetch customers and roles based on selected company from API
        //     axios.get(`https://your-api-url/companies/${companyName}`)
        //         .then(response => {
        //             const { customers, roles } = response.data;
        //             setCustomers(customers);
        //             setRoles(roles);
        //         })
        //         .catch(error => {
        //             console.error(`Error fetching customers and roles for ${companyName}:`, error);
        //         });
    };

    const handleCompanyChange = (e) => {
        //     const company = e.target.value;
        //     setSelectedCompany(company);
        //     fetchCustomersAndRoles(company);
        //     // Reset selected role
        //     setSelectedRole('');
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <div>
            <label htmlFor="company">Select Company:</label>
            <select id="company" value={selectedCompany} onChange={handleCompanyChange}>
                <option value="">Select a company</option>
                {companies.map(company => (
                    <option key={company.id} value={company.name}>{company.name}</option>
                ))}
            </select>

            <br />

            <label htmlFor="customer">Select Customer:</label>
            <select id="customer">
                <option value="">Select a customer</option>
                {customers.map((customer, index) => (
                    <option key={index} value={customer}>{customer}</option>
                ))}
            </select>

            <br />

            <label htmlFor="role">Select Role:</label>
            <select id="role" value={selectedRole} onChange={handleRoleChange}>
                {Array.isArray(roles) && roles.map((role, index) => (
                    <option key={index} value={role._id}>{role.default_name}</option>

                ))}
            </select>
        </div>
    );
};

export default CompanyRoleSelector;