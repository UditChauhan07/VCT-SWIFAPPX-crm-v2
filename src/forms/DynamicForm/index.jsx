import { useState, useEffect } from 'react';
// import { DatePicker, Input, Form, Select, InputNumber, Switch, Tag } from 'antd';

import { DatePicker, Input, Form, Select, InputNumber, Switch, Tag, Checkbox } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { useMoney, useDate } from '@/settings';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';
import { generate as uniqueId } from 'shortid';

import { countryList } from '@/utils/countryList';
import { request } from '@/request';

export default function DynamicForm({ fields, isUpdateForm = false }) {

  const [feedback, setFeedback] = useState();
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    // Fetch data from API
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

  return (
    <>
      {Object.keys(fields).map((key) => {
        let field = fields[key];
        let i = 1;
        if ((isUpdateForm && !field.disableForUpdate) || !field.disableForForm) {
          field.name = key;
          if (!field.label) field.label = key;
          if (field.hasFeedback)
            return <FormElement setFeedback={setFeedback} key={key} field={field} />;
          else if (field.hasRoles) {
            return <FormElement setFeedback={setSelectedRole} key={key} field={field} roles={roles} />;
          }
          else if (feedback && field.feedback) {
            if (feedback == field.feedback) return <FormElement key={key} field={field} />;
          } else {
            return <FormElement key={key} field={field} />;
          }
        }
      })}
    </>
  );
}

function FormElement({ field, setFeedback, roles = [] }) {
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
    string: <Input autoComplete="off" />,
    url: <Input addonBefore="http://" autoComplete="off" placeholder="www.website.com" />,
    textarea: <TextArea rows={4} />,
    email: <Input autoComplete="off" placeholder="email@gmail.com" value={email} />,
    number: <InputNumber style={{ width: '100%' }} />,
    phone: <Input style={{ width: '100%' }} placeholder="+1 123 456 789" />,
    password: <Input.Password autoComplete="new-password" />,
    boolean: <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />,
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
          <Select.Option key={`${uniqueId()}`} value={option.value}>
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
        {Array.isArray(roles) && roles.map((role, index) => (
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
        {countryList.map((language) => (
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
        {countryList.map((language) => (
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
    checkoxes: (<Checkbox.Group options={options} onChange={handleCheckboxChange} value={selectedOptions} />)
  };



  const filedType = {
    string: 'string',
    textarea: 'string',
    number: 'number',
    phone: 'string',
    //boolean: 'boolean',
    // method: 'method',
    // regexp: 'regexp',
    // integer: 'integer',
    // float: 'float',
    // array: 'array',
    // object: 'object',
    // enum: 'enum',
    // date: 'date',
    url: 'url',
    website: 'url',
    email: 'email',
  };

  const renderComponent = compunedComponent[field.type] ?? compunedComponent['string'];
  return (
    <Form.Item
      label={translate(field.label)}
      name={field.name}
      rules={[
        {
          required: field.required || false,
          type: filedType[field.type] ?? 'any',
        },
      ]}
      valuePropName={field.type === 'boolean' ? 'checked' : 'value'}
    >
      {renderComponent}
    </Form.Item>
  );
}
