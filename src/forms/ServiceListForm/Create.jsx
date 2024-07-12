import { useState, useEffect } from 'react';
// import { DatePicker, Input, Form, Select, InputNumber, Switch, Tag } from 'antd';

import { Input, Form, Select, InputNumber, Switch, notification } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';
import { generate as uniqueId } from 'shortid';

import { request } from '@/request';
import { useCrudContext } from '@/context/crud';

export default function CreateForm({ fields, isUpdateForm = false }) {

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getRoles();
        if (response.success) {
          setRoles(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [selectedValue, setSelectedValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = async (event) => {
    const value = event.target.value;
    setSelectedValue(value);


    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await request.getCateGorySubscription({ id: value }); // Assuming your request function is named getData()
      
        if (response.success) {
          setResponseData(response.result); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  };

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Select an option</option>
        <option value="6602c4500b127c22abc7c1a7">Test Cleaner</option>
        <option value="66026b730b127c22abc798a2">Shop Cleaner</option>

      </select>

      
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
}


