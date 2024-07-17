import { useState, useEffect } from 'react';
import {
  DatePicker,
  Input,
  Form,
  Select,
  InputNumber,
  Switch,
  Tag,
  Checkbox,
  notification,
  Spin
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useMoney, useDate } from '@/settings';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';
import { generate as uniqueId } from 'shortid';

import { countryList } from '@/utils/countryList';
import { request } from '@/request';
import { useSelector } from 'react-redux';
import { selectUpdatedItem } from '@/redux/crud/selectors';
import { useCrudContext } from '@/context/crud';
import { useParams } from 'react-router-dom';


export default function DynamicForm({ fields, entity, isUpdateForm = false }) {

  const [feedback, setFeedback] = useState();
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [checkboxes, setCheckBoxes] = useState([]);
  const [checkedOption, setcheckedOption] = useState('');
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [loading, setLoading] = useState(true);

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

  if (fields.subscription_type) {
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await request.getCategorySubscription();
    //       if (response.success) {
    //         console.log({ response });
    //         setCheckBoxes(response.result);
    //       } else {
    //         readBox.close();
    //         collapsedBox.close();
    //         panel.close();
    //         notification.config({
    //           duration: 4,
    //           maxCount: 2,
    //         });
    //         notification.error({
    //           message: `Request error`,
    //           description: response.message,
    //         });
    //       }
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }

    //   };

    //   fetchData();
    // }, []);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await request.getCategorySubscription();
          if (response.success) {
      
            setCheckBoxes(response.result);
          } else {
          
            console.error('Request error:', response.message);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false); 
        }
      };

      fetchData();
    }, []);

  }


  return (
    <>
      {Object.keys(fields)?.map((key) => {
        let field = fields[key];
        let i = 1;
        if ((isUpdateForm && !field.disableForUpdate) || !field.disableForForm) {
          field.name = key;
          if (!field.label) field.label = key;
          if (field.hasFeedback)
            return <FormElement setFeedback={setFeedback} key={key} field={field} />;
          else if (field.hasRoles) {
            return (
              <FormElement setFeedback={setSelectedRole} key={key} field={field} roles={roles} />
            );
          } else if (field.hasOptions) {
            return (

              <>

                <Spin spinning={loading}>
                  {checkboxes.length > 0 && (
                    <FormElement
                      setFeedback={setFeedback}
                      field={field}
                      checkboxes={checkboxes}
                    />
                  )}
                </Spin>

              </>



              // <FormElement
              //   setFeedback={setcheckedOption}
              //   key={key}
              //   field={field}
              //   checkboxes={checkboxes}
              // />
            );
          } else if (feedback && field.feedback) {
            if (feedback == field.feedback) return <FormElement key={key} field={field} />;
          } else {
            return <FormElement key={key} field={field} entity={entity} />;
        
          }
        }
      })}
    </>
  );
}

function FormElement({ field, entity, setFeedback, roles = [], checkboxes = [] }) {

  const placeholderText = field.name === 'package_divider' ? 'Please enter package divider' : 'Please enter Name';

  const translate = useLanguage();
  const money = useMoney();
  const { dateFormat } = useDate();
  const { label, options } = field;

  const { TextArea } = Input;
  const [email, setEmail] = useState('test@gmail.com');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleCheckboxChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };

  const compunedComponent = {
    string: <Input autoComplete="off" placeholder={placeholderText} />,
    url: <Input addonBefore="http://" autoComplete="off" placeholder="www.website.com" />,
    textarea: <TextArea rows={4} placeholder='Please enter description' />,
    email: <Input autoComplete="off" placeholder="email@gmail.com" value={email} />,
    number: <InputNumber style={{ width: '100%' }} />,
    phone: <Input style={{ width: '100%' }} placeholder="+1 123 456 789" />,
    password: <Input.Password autoComplete="new-password" />,
    boolean: <Switch defaultValue={true} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
    
    date: (
      <DatePicker
        placeholder={translate('select_date')}
        style={{ width: '100%' }}
        format={dateFormat}
      />
    ),
    select: (
      <Select
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => {
          return (
            <Select.Option key={`${uniqueId()}`} value={option.value}>
              {option.label}
            </Select.Option>
          );
        })}
      </Select>
    ),
    selectWithTranslation: (
      <Select
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
        placeholder="Please select Type"
      >
        {field.options?.map((option) => {
          return (
            <Select.Option key={`${uniqueId()}`} value={option.value}>
              <Tag bordered={false} color={option.color}>
                {translate(option.label)}
              </Tag>
            </Select.Option>
          );
        })}
      </Select>
    ),
    selectwithfeedback: (
      <Select
        onChange={(value) => setFeedback(value)}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value} >
            {translate(option.label)}
          </Select.Option>
        ))}
      </Select>
    ),
    selectwithfeedbackCustom: (
      <Select
        onChange={(value) => setFeedback(value)}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            {translate(option.label)}
          </Select.Option>
        ))}
      </Select>
    ),
    selectRoles: (
      <Select
        onChange={(value) => setFeedback(value)}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {Array.isArray(roles) &&
          roles?.map((role, index) => (
            <Select.Option key={index} value={role._id}>
              {role.name}
            </Select.Option>
          ))}
      </Select>
    ),
    color: (
      <Select
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => {
          return (
            <Select.Option key={`${uniqueId()}`} value={option.value}>
              <Tag bordered={false} color={option.color}>
                {option.label}
              </Tag>
            </Select.Option>
          );
        })}
      </Select>
    ),

    tag: (
      <Select
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            <Tag bordered={false} color={option.color}>
              {translate(option.label)}
            </Tag>
          </Select.Option>
        ))}
      </Select>
    ),
    array: (
      <Select
        mode={'multiple'}
        defaultValue={field.defaultValue}
        style={{
          width: '100%',
        }}
      >
        {field.options?.map((option) => (
          <Select.Option key={`${uniqueId()}`} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    ),
    country: (
      <Select
        showSearch
        defaultValue={field.defaultValue}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
        }
        style={{
          width: '100%',
        }}
      >
        {countryList?.map((language) => (
          <Select.Option
            key={language.value}
            value={language.value}
            label={translate(language.label)}
          >
            {language?.icon && language?.icon + ' '}
            {translate(language.label)}
          </Select.Option>
        ))}
      </Select>
    ),
    countryCustom: (
      <Select
        showSearch
        defaultValue={field.defaultValue}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
        }
        style={{
          width: '100%',
        }}
      >
        {countryList?.map((language) => (
          <Select.Option
            key={language.value}
            value={language.value}
            label={translate(language.label)}
          >
            {language?.icon && language?.icon + ' '}
            {translate(language.label)}
          </Select.Option>
        ))}
      </Select>
    ),
    async: (
      <SelectAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        outputValue={field.outputValue}
        loadDefault={field.loadDefault}
        withRedirect={field.withRedirect}
        urlToRedirect={field.urlToRedirect}
        redirectLabel={field.redirectLabel}
      ></SelectAsync>
    ),
    search: (
      <AutoCompleteAsync
        entity={field.entity}
        displayLabels={field.displayLabels}
        searchFields={field.searchFields}
        outputValue={field.outputValue}
      ></AutoCompleteAsync>
    ),
    currency: (
      <InputNumber
        className="moneyInput"
        min={0}
        controls={false}
        addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
        addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
      />
    ),
    checkbox: (
      <Checkbox
        onChange={(value) => {
          setFeedback(value.target.checked);
        }}
        value={field.value}
      >
        {field.label}
      </Checkbox>
    ),
    checkoxes: (
      <Checkbox.Group options={options} onChange={handleCheckboxChange} value={selectedOptions} />
    ),
    checkoxesCustom: (
      <Checkbox.Group onChange={handleCheckboxChange} value={selectedOptions}>
        {checkboxes?.map((item) => (
          <Checkbox key={item._id} value={item._id}>
            {item.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
    ),
  };

  const filedType = {
    string: 'string',
    textarea: 'string',
    number: 'number',
    phone: 'phone',
    date: 'date',
    url: 'url',
    website: 'url',
    email: 'email',
  };

  const renderComponent = compunedComponent[field.type] ?? compunedComponent['string'];

  const [phoneError, setPhoneError] = useState(null);

  const handlePhoneBlur = (event) => {
    const value = event.target.value;
    const phoneRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits
    if (!phoneRegex.test(value)) {
      setPhoneError('Please enter a valid 10-digit mobile number');
    } else {
      setPhoneError(null);
    }
  };

  const getValidator = (field) => {
    if (field.type === 'phone' && entity !== 'people') {
      return (rule, value) => {
        if (phoneError) {
          return Promise.reject(phoneError);
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'package_divider') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please enter package divider');
        }
        if (isNaN(value)) {
          return Promise.reject('Only numeric value is accepted');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'price') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please enter package divider');
        }
        if (isNaN(value)) {
          return Promise.reject('Only numeric value is accepted');
        }
        if (value.length > 5) {
          return Promise.reject('Price can have a maximum of 10 values');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'type') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select type');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'role') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select role');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'people') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select people');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'productCategory') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select productCategory');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'color') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select color');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'state') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please enter State');
        }
        if (value.length > 10) {
          return Promise.reject('State can have a maximum of 10 values');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'zipCode') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select postal_code');
        }
        if (isNaN(value)) {
          return Promise.reject('Only numeric value is accepted');
        }
        if (value.length > 10) {
          return Promise.reject('ZipCode can have a maximum of 10 values');
        }
        return Promise.resolve();
      };
    }

    if (field.name === 'package_type') {
      return (rule, value) => {
        if (!value || value === '') {
          return Promise.reject('Please select package type');
        }
        return Promise.resolve();
      };
    }

    return undefined;
  };

  return (


    // <Form.Item
    //   : field.name === 'block' ? (rule, value) => {
    // if (!value || value === '') {
    //   return Promise.reject('Please select Block');
    // }
    // if (value.length > 10) {
    //   return Promise.reject('Block can have a maximum of 10 values');
    // }
    // return Promise.resolve();
    // { renderComponent }
    //   label={translate(field.label)}
    //   name={field.name}
    //   rules={[
    //     {
    //       required: field.required || false,
    //       type: filedType[field.type] ?? 'any',
    //       validator: field.type === 'phone' ? (rule, value) => {
    //         if (!value) {
    //           return Promise.resolve();
    //         }
    //         const pattern = /^[6-9]\d{9}$/;
    //         if (!pattern.test(value)) {
    //           return Promise.reject('Please enter a valid 10-digit mobile number.');
    //         }
    //         return Promise.resolve();
    //       } : field.name === 'package_divider' ? (rule, value) => {
    //         if (isNaN(value)) { 
    //           return Promise.reject('Only numeric value is accepted.');
    //         }
    //         return Promise.resolve();
    //       } : undefined,
    //     },

    //     ...(field.name === 'name' || field.name === 'firstname' ? (
    //       entity === 'people' || 'subscriptiontype' ? [

    //         { min: 3, message: 'Name must be at least 3 characters.' },
    //         { max: 30, message: 'Name must be in 30 characters.' },
    //       ] : []
    //     ) : []),
    //   ]}
    //   valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
    // > 
    // {renderComponent}
    // </Form.Item>

    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
          validator: getValidator(field),
        },
        ...(field.name === 'name' ||
          field.name === 'firstname' ||
          field.name === 'label' ||
          field.name === 'contactPerson' ||
          field.name === 'street' ||
          field.name === 'unit' ||
          field.name === 'block' ? (
          entity === 'people' || entity === 'subscriptiontype' || entity === 'clientaddress' ? [
            { min: 3, message: 'Name must be at least 3 characters' },
            { max: 30, message: 'Name must be in 30 characters' },
          ] : []
        ) : []),
      ]}
      valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
    >
      {field.type === 'phone' && entity !== 'people' ? (
        <Input onBlur={handlePhoneBlur} />
      ) : (
        renderComponent
      )}
    </Form.Item>
   
  );
}
