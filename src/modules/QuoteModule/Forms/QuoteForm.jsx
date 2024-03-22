import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker, TimePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import QuoteItemRow from '@/modules/ErpPanelModule/QuoteItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import { response } from './jsonResponse';
import styles from './styles.module.css'; // Import the CSS module

export default function QuoteForm({ subTotal = 0, current = null }) {
  const { last_quote_number } = useSelector(selectFinanceSettings);

  // if (!last_quote_number) {
  //   return <></>;
  // }

  return <LoadQuoteForm subTotal={subTotal} current={current} />;
}

function LoadQuoteForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { last_quote_number } = useSelector(selectFinanceSettings);
  const [lastNumber, setLastNumber] = useState(() => last_quote_number + 1);

  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };
  const { TextArea } = Input;
  const money = useMoney();

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [serviceCategoryOptions] = useState(['Cleaning']);
  const [serviceOptions] = useState(['Service Custom (One Time)', 'General Packages', 'Office Packages', 'Special']);
  console.log(response);
  const [subscriptionData, setSubscriptionData] = useState({});

  useEffect(() => {
    // Your code to fetch response.servicePriceModal and process data
    const processedData = {};
    response.servicePriceModal.forEach(item => {
      const { subscription, option_name, option_price } = item;
      const { name } = subscription;
      if (!processedData[name]) {
        processedData[name] = {};
      }
      processedData[name][option_name] = option_price;
    });

    // Set subscriptionData state with processed data
    setSubscriptionData(processedData);
  }, []);

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year, number } = current;
      setTaxRate(taxRate / 100);
      setCurrentYear(year);
      setLastNumber(number);
    }
  }, [current]);
  useEffect(() => {
    const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)));
    setTotal(Number.parseFloat(currentTotal));
  }, [subTotal, taxRate]);

  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  const handleFirstDropdownChange = async (event) => {
    // const selectedValue = event.target.value;
    // setSelectedOption(selectedValue);

    // Make API request with the selected value
    try {
      // const response = await fetch(`your_api_endpoint/${selectedValue}`);
      const data = [{ value: '1', label: 'Home' }, { value: '3', label: 'Billing' }, { value: '4', label: 'Shipping' }];


      // Extract options from the API response
      const extractedOptions = data.map((item) => ({
        value: item.value,
        label: item.label,
      }));

      // Update the options for the second dropdown
      setSecondDropdownOptions(extractedOptions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getServicesSubAndItems = async (event) => {
    // const selectedValue = event.target.value;
    // setSelectedOption(selectedValue);

    // Make API request with the selected value
    try {
      // const response = await fetch(`your_api_endpoint/${selectedValue}`);
      const data = [{ value: '1', label: 'Home' }, { value: '3', label: 'Billing' }, { value: '4', label: 'Shipping' }];


      // Extract options from the API response
      const extractedOptions = data.map((item) => ({
        value: item.value,
        label: item.label,
      }));

      // Update the options for the second dropdown
      setSecondDropdownOptions(extractedOptions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Row gutter={[12, 0]}>
        {/* <Col className="gutter-row" span={8}>
          <Form.Item
            name="customerType"
            label={translate('Customer Type')}
            rules={[
              {
                required: true,
                message: 'Please select a Customer Type:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }}>
              <Radio value="New">New</Radio>
              <Radio value="Old">Existing</Radio>
            </Radio.Group>
          </Form.Item>
        </Col> */}
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="selectCustomer"
            label={translate('Select Customer')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'client'}
              displayLabels={['name']}
              searchFields={'name,surname'}
              onChange={handleFirstDropdownChange}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="customerAddress"
            label={translate('Customer Address')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
            >
              {secondDropdownOptions.map((option, index) => (
                <Select.Option key={index} value={option.value}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="billingAddress"
            label={translate('Billing Address')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
            >
              {secondDropdownOptions.map((option, index) => (
                <Select.Option key={index} value={option.value}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            name="shippingAddress"
            label={translate('Shipping Address')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: '100%',
              }}
            >
              {secondDropdownOptions.map((option, index) => (
                <Select.Option key={index} value={option.value}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="sendQuotationEmail"
            label={translate('Send Quotation Email')}
            rules={[
              {
                required: true,
                message: 'Please select a Send Quotation Email:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }}>
              <Radio value="1" selected>Yes</Radio>
              <Radio value="0">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="date"
            label={translate('Start Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="expiredDate"
            label={translate('Expire Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="startTime"
            label={translate('Start Time')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="expectedTimeRequired"
            label={translate('Expected Time Required')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="serviceCategory"
            label={translate('Service Category')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <AutoCompleteAsync
              entity={'servicCategories'}
              displayLabels={['servicCategories']}
              searchFields={'servicCategories'}
            // onUpdateValue={autoCompleteUpdate}
            /> */}
            <Select
              style={{
                width: '100%',
              }}
            >
              {serviceCategoryOptions.map((option, index) => (
                <Select.Option key={index} value={index}>{option}</Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="serviceName"
            label={translate('Service Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <AutoCompleteAsync
              entity={'services'}
              displayLabels={['services']}
              searchFields={'services'}
            // onUpdateValue={autoCompleteUpdate}
            /> */}
            <Select
              style={{
                width: '100%',
              }}
            >
              {serviceOptions.map((option, index) => (
                <Select.Option key={index} value={index} onChange={getServicesSubAndItems}>{option}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

      </Row>
      <Divider dashed />
      {/* {response.servicePriceModal.map((entity, key) => ( */}
      <Row align="middle" className={styles.first_row}>
        <Col className="gutter-row" span={3} >
          <p className={styles.bold_text}>Subscription</p>
        </Col>
        <Col className={`${styles.custom_col} gutter-row`} span={7}>
          <p className={styles.bold_text}>3 hour</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={7}>
          <p className={styles.bold_text}>3.5 hour</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={7}>
          <p className={styles.bold_text}>4 hour</p>
        </Col >
      </Row >

      < Row align="middle" className={styles.middle_row} >
        <Col className="gutter-row" span={3}>
          One Time
        </Col>
        <Col className={`${styles.custom_col} gutter-row`} span={7}>
          <div className={styles['permissions_container']}>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
                  <Checkbox>
                    98.00
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={7}>
          <div className={styles['permissions_container']}>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
                  <Checkbox>
                    112.00
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={7}>
          <div className={styles['permissions_container']}>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
                  <Checkbox>
                    126.00
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/* ))} */}
      <Divider dashed />


      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <QuoteItemRow key={field.key} remove={remove} field={field} current={current} response={response}></QuoteItemRow>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add field')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />

      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="adjustmentType"
            label={translate('Adjustment Type')}
            rules={[
              {
                required: true,
                message: 'Please select a Customer Type:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }}>
              <Radio value="addition">Addition</Radio>
              <Radio value="substraction">Subsctraction</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="adjustmentValue"
            label={translate('Adjustment Value')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="Discount"
            label={translate('Discount')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={24}>
          <Form.Item
            name="remarks"
            label={translate('Remarks')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>

        </Row>

      </div>
    </>
  );
}
