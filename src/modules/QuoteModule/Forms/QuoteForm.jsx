import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Collapse, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { DatePicker, TimePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import QuoteItemRow from '@/modules/ErpPanelModule/QuoteItemRow';
// import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import { response } from './jsonResponse';
import styles from './styles.module.css'; // Import the CSS module

import { useForm } from 'antd/lib/form/Form';
import { request } from '@/request';
const { Option } = Select;
const { Panel } = Collapse;

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
  const [serviceCategoryOptions, setserviceCategoryOptions] = useState([]);
  const [Customeraddress, setCustomeraddress] = useState([])
  const [SalesPerson, setSalesPerson] = useState()
  const [subscriptionData, setSubscriptionData] = useState({});
  const [accordionData, setAccordionData] = useState([]);

  // console.log(SalesPerson)
  const handleDropdownChange = async (value) => {

    setSelectedOption(value);
    try {
      //   const response = await axios.get(`client/search?q=${value}&fields=name,surname`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
      //   console.log(response)
      setAccordionData(response); // Assuming the response contains an array of accordion data
    } catch (error) {
      console.error('Error fetching accordion data:', error);
    }
  };
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
    fetchData();
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

  const addField = useRef(null);

  useEffect(() => {
    // Check if addField.current is not null before clicking
    if (addField.current) {
      addField.current.click();
    }

  }, []); // This effect runs only once when the component mounts

  // console.log({ serviceOptions });

  const [selectedValue, setSelectedValue] = useState('');
  const [serviceOptions, setServiceOptions] = useState(null);
  console.log(serviceOptions)
  const handleChange2 = (value) => {
    setSelectedValue(value);
    const fetchData2 = async () => {
      // console.log(fetchData2)
      try {
        const response = await request.getCateGorySubscription({ id: value });// Assuming your request function is named getData()
        console.log({ id: value })
        // Assuming your API response contains an array of options as response.options
        if (response.success) {
          setServiceOptions(response.result);
          console.log({ responseresult: response.result })
          // Set options state based on API response
        } else {
          setServiceOptions(null)
        }
        console.log(response.result)
      } catch (error) {
        setServiceOptions(null)
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();
  };


  // .............
  //   const fetchData2 = async () => {
  //     try {
  //       const response = await request.getServiceListShow();// Assuming your request function is named getData()
  //     // Assuming your API response contains an array of options as response.options
  //       if (response.success) {
  //         setServiceOptions(response);
  //         // Set options state based on API response
  // }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  // ................
  useEffect(() => {
    // Fetch data from API
    const fetchData1 = async () => {
      try {
        const response = await request.getSalesPerson();
        // Assuming your request function is named getData()
        // console.log({ response1111: response })
        // Assuming your API response contains an array of options as response.options
        if (response.success) {
          // console.log({ responseresult: response.result });
          setSalesPerson(response.result); // Set options state based on API response
          // console.log({ setSalesPerson, SalesPerson });
        }
        // console.log({ SalesPerson22222222222: SalesPerson })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData1()// Call fetchData function when component mounts
  }, []);
  // .................
  const fetchData = async () => {
    try {
      const response = await request.getServiceCategoryOptions();
      // Assuming your request function is named getData()
      console.log(response)
      // Assuming your API response contains an array of options as response.options
      if (response.success) {

        setserviceCategoryOptions(response.result);
        // Set options state based on API response

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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
  const [accordionActiveKey, setAccordionActiveKey] = useState([]);
  const handleChange = (key) => {
    setAccordionActiveKey(key);
  };
  // const translate = useLanguage();
  const [totalState, setTotal2] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  // const money = useMoney();
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    setPrice(value);
  };
  const updateName = (value) => {
    setName(value);
  };
  const [form] = useForm();

  useEffect(() => {
    if (current) {
      // When it accesses the /payment/ endpoint,
      // it receives an invoice.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access invoice.items.

      const { items, invoice } = current;

      if (invoice) {
        const item = invoice[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      } else {
        const item = items[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);

    setTotal2(currentTotal);
  }, [price, quantity]);
  return (
    <>
      <Col className="gutter-row" span={12} style={{ fontSize: '1.1rem', marginTop: "-9px;", marginBottom: "20px" }}>
        {translate('Customer Detail Section')}
      </Col>
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
            name="Customer Address"
            label={translate('Customer Address')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <AutoCompleteAsync
              entity={'client'}
              displayLabels={['name']}
              searchFields={'name,surname'}
              onChange={handleFirstDropdownChange}
            // onUpdateValue={autoCompleteUpdate}
            /> */}
            <Select
              style={{
                width: '100%',
              }}
            >
              {Customeraddress.map((option, index) => (
                <Select.Option key={index} value={index}>{option.label}</Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            name="BillingAddress"
            label={translate('Billing Address')}
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
              {Customeraddress.map((option, index) => (
                <Select.Option key={index} value={index}>{option.name}</Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
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
      <Col className="gutter-row" span={12} style={{ fontSize: '1.1rem', marginTop: "-9px;", marginBottom: "20px" }}>
        {translate('Basic Quatation Details')}
      </Col>
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
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="SalesPerson" f
            label={translate('Sales Person')}
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
              {SalesPerson?.map((option, index) => (
                <Select.Option key={index._id} value={index._id}>{option.name}</Select.Option>
              ))}
            </Select>


          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item label={translate('Sales Person Contact')} name="Sales Person Contact" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>

      </Row>
      <Divider dashed />


      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={12}>
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
              {serviceCategoryOptions?.map((option, index) => (
                <Select.Option key={index._id} value={index._id}>{option.name}</Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
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
              // onChange={(value) => setFeedback(value)}
              // defaultValue={selectedValue}
              onChange={handleChange2}
              // defaultValue={field.defaultValue}
              style={{
                width: '100%',
              }}
            // key={}
            >
              {serviceOptions?.map((option, ind) => (
                <Select.Option key={ind} value={option._id}>
                  {translate(option.name)}
                </Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      {/* {response.servicePriceModal.map((entity, key) => ( */}
      {accordionData.subItem && <div>
        <Row gutter={[12, 12]} style={{ position: 'relative' }}>
          <Col className="gutter-row" span={5}>
            <p>{translate('Item')}</p>
          </Col>
          <Col className="gutter-row" span={7}>
            <p>{translate('Description')}</p>
          </Col>
          <Col className="gutter-row" span={3}>
            <p>{translate('Quantity')}</p>{' '}
          </Col>
          <Col className="gutter-row" span={4}>
            <p>{translate('Price')}</p>
          </Col>
          <Col className="gutter-row" span={5}>
            <p>{translate('Total')}</p>
          </Col>
        </Row>
        <Divider dashed />

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
        <Collapse accordion activeKey={accordionActiveKey} onChange={handleChange}>
          {accordionData.subItem.map((mainData, i) => (
            <Collapse.Panel header={mainData.Servicename} key={mainData.Serviceid}>
              <div key={`${i}`}>
                <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                  <Col className="gutter-row" span={4}>
                    <p>{translate('Sub-Item')}</p>
                  </Col>
                  <Col className="gutter-row" span={4}>
                    <p>{translate('Price')}</p>
                  </Col>
                  <Col className="gutter-row" span={3}>
                    <p>{translate('Quantity')}</p>{' '}
                  </Col>
                  <Col className="gutter-row" span={4}>
                    <p>{translate('Total')}</p>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <p>{translate('Remarks')}</p>
                  </Col>
                </Row>
                {mainData.subItemlist.map((data, index) => (

                  <Row gutter={[12, 12]} style={{ position: 'relative' }} key={[`${i}`, `${index}`]}>
                    <Col className="gutter-row" span={4}>
                      <Form.Item
                        name={[`${i}`, `${index}`, 'itemName']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing itemName name',
                          },
                          {
                            pattern: /^(?!\s*$)[\s\S]+$/, // Regular expression to allow spaces, alphanumeric, and special characters, but not just spaces
                            message: 'Item Name must contain alphanumeric or special characters',
                          },
                        ]}
                        key={[`${i}`, `${index}`]}
                      >
                        {data?.name && <Input placeholder="Item Name" defaultValue={data.name} />}
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <Form.Item name={[`${i}`, `${index}`, 'price']} rules={[{ required: true }]} >
                        <InputNumber
                          className="moneyInput"
                          onChange={updatePrice}
                          min={0}
                          controls={false}
                          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                          addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                          defaultValue={data.price}
                        />
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={3}>
                      <Form.Item name={[`${i}`, `${index}`, 'quantity']} rules={[{ required: true }]} >
                        <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
                      </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={4}>
                      <Form.Item name={[`${i}`, `${index}`, 'total']} >
                        <InputNumber
                          readOnly
                          className="moneyInput"
                          value={totalState}
                          min={0}
                          controls={false}
                          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                          addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                          formatter={(value) => money.amountFormatter({ amount: value })}
                        />
                      </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={7}>
                      <Form.Item name={[`${i}`, `${index}`, 'remarks']} >
                        <Input placeholder=" Remarks for Quotation" defaultValue={data.description} />
                      </Form.Item>
                    </Col>

                    <div style={{ position: 'absolute', right: '50px', top: ' 5px' }}>
                      <DeleteOutlined onClick={() => remove(`${i}`, `${index}`)} />
                    </div>
                  </Row>
                ))}
              </div>
            </Collapse.Panel>
          ))}
        </Collapse>
        <Divider dashed />
      </div>}


      {/* <Form.List name="items">
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
      </Form.List> */}

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
      {/* <Form.List name="items">
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
      </Form.List> */}
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