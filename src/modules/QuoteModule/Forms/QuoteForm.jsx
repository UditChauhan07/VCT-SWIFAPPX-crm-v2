import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Collapse, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

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

import { useForm } from 'antd/lib/form/Form';
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
  const [serviceCategoryOptions] = useState(['Cleaning']);
  const [serviceOptions] = useState(['Service Custom (One Time)', 'General Packages', 'Office Packages', 'Special']);
  console.log(response);
  const [subscriptionData, setSubscriptionData] = useState({});
  const [accordionData, setAccordionData] = useState([]);

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
    try {
      // const response = await axios.get(`YOUR_API_ENDPOINT/${value}`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
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
  }, [CheckedId, quantity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getServiceCategoryOptions();
        console.log(response)
        if (response.success) {
          setserviceCategoryOptions(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, [])


  // --------- WORK ORDER MODULE -----------
  useEffect(() => {

    const fetchData1 = async () => {
      try {
        const response = await request.getSalesPerson();
        if (response.success) {
          setSalesPerson(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData1()
  }, []);

  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await request.getServiceCategory();
        if (response.success) {
          setserviceCategory(response.result)

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData3()
  }, []);
useEffect(()=>{
  const hendleOneTime = async () => {
    try {
      const response = await request.getSubscriptiontypeOneTime();

      if (response.success) {
        setSubcriptionOneTime(response.result)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  hendleOneTime()
},[])
  
  const handleserviceId = async (event) => {
    try {
      const response = await request.getServiceCategoryName(event);
      if (response.success) {
        setserviceCategoryNam(response.result)
      } else {

      }
    } catch (error) {

      console.error('Error fetching data:', error);
    }

  };

  const [salesContactNumber, setSalesContactNumber] = useState();
  useEffect(() => {
    if (selectedSalesPerson) {
      let number = SalesPerson?.find((option) => option._id === selectedSalesPerson)?.phone
      setSalesContactNumber(number)
      ContactHandler({ salesContactNumber: number })
      let saleRepConElement = document.getElementById("salesContactNumber")
      saleRepConElement.value = number || null
      // console.log({ number, salesContactNumber });
    }
  }, [selectedSalesPerson, salesContactNumber])
  const [selectedIds, setSelectedIds] = useState({ itemId: null, subscriptionId: null });
  useEffect(() => { }, [selectedSalesPerson])
  const ContactHandler = ({ salesContactNumber }) => {
    return (<Form.Item label={translate('Sales Person Contact')} name="SalesPersonContact" rules={[
      {
        required: true,
      },
    ]}
      initialValue={salesContactNumber}
    >
      <Input style={{
        width: '100%',
      }} placeholder=""
        id='salesContactNumber'
        value={salesContactNumber}
      />
    </Form.Item>
    )
  }

  const filteredWorkLead = WorkLead?.filter((item) => item._id !== Workers);

  const getUniqueSubscriptionNames = () => {
    const subscriptionNames = [];
    ShowServiceId.forEach((ele) => {
      console.log(ele)
      ele.data.forEach((item) => {
        if (!subscriptionNames.includes(item.name)) {
          subscriptionNames.push(item.name);
        }
      });
    });
    return subscriptionNames;
  };

  const generateColumns = () => {
    const subscriptionNames = getUniqueSubscriptionNames();
    const columns = [
      {
        title: 'Subscription',
        dataIndex: 'Subscription',
        name: "subscriptions"
      },
    ];

    subscriptionNames.forEach((name) => {
      columns.push({
        title: <span>{name}</span>,
        dataIndex: name,
      });
    });

    return columns;
  };
  const [subscriptionIds, setSubscriptionIds] = useState([]);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [isSubscriptionID, seTisSubscriptionID] = useState(null);

  // const handleCheckboxClick = (e, id) => {
  //   let temp = [...subscriptionIds]; // Create a copy of the current subscriptionIds state
  //   if (temp.includes(id)) {
  //     temp = temp.filter(item => item !== id); // Remove the id if it exists
  //   } else {
  //     temp.push(id); // Add the id if it does not exist
  //   }
  //   setSubscriptionIds(temp);
  //   setSubscriptionCount(temp.length);

  //   for (const subscriptionObj of ShowServiceId) {
  //     for (const dataObj of subscriptionObj.data) {
  //       if (dataObj._id === id) {
  //         const subscriptionId = subscriptionObj.subscription._id;
  //         console.log(subscriptionId)
  //         localStorage.setItem('SubscriptionId', subscriptionId);
  //         seTisSubscriptionID(subscriptionId);
  //         seTisMainid(subscriptionId);
  //         return;
  //       }
  //     }
  //   }
  //   return null;
  // };
  // ....................
const handleCheckboxClick = (e, id) => {
    let temp = [...subscriptionIds]; // Create a copy of the current subscriptionIds state

    // Toggle the subscription id in the state
    if (temp.includes(id)) {
      temp = temp.filter(item => item !== id); // Remove the id if it exists
    } else {
      temp.push(id); // Add the id if it does not exist
    }

    setSubscriptionIds(temp);
    setSubscriptionCount(temp.length);

    let subscriptionsArray = [];

    // Update local storage and state for the selected subscription
    for (const subscriptionObj of ShowServiceId) {
      for (const dataObj of subscriptionObj.data) {
        if (temp.includes(dataObj._id)) {
          const subscription = subscriptionObj.subscription._id;
          const subModule = dataObj._id; // The data object ID you want to send
          subscriptionsArray.push({
            subscription: subscription,
            subModule: subModule
          });
        }
      }
    }

    localStorage.setItem('Subscriptions', JSON.stringify(subscriptionsArray));
  };

  useEffect(() => { }, [subscriptionCount])
  const [adjustmentvalue, setadjustment] = useState(null);
  const [discountValue, setdiscount] = useState(null);
 
  const CalculatorFilled = () => {
    return (
      ShowServiceList.map((element, _id) => (
        element.subscriptions.map((subscriptions, __id) => (
          subscriptions.data.map((subscription, ___id) => {
            let package_divider = parseInt(subscriptions.subscription.package_divider);
            let subTotal = parseInt(subscription.price / package_divider);
            if (active == 2) {
              subTotal += parseInt(adjustmentvalue);
            }
            if (active == 3) {
              subTotal -= parseInt(adjustmentvalue);
            }
            let discount = 0;
            if (discountValue) {
              subTotal -= (subTotal * (parseInt(discountValue) / 100));
              discount = (subTotal * (parseInt(discountValue) / 100));
            }
            if (subscriptionIds.includes(subscription._id)) {
              return (
                <td style={{ padding: '10px', borderRight: 'none' }} key={subscription._id}>
                  <ul style={{ listStyle: 'none', textAlign: 'start', padding: '0' }}>
                    <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", color: "rgb(49,91,140)" }}>{subscription.name}:{subscriptions.subscription.name}</li>
                    <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", color: "rgb(49,91,140)" }}>{parseFloat(subscription.price / package_divider).toFixed(2)}/Workorder</li>
                    <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", color: "rgb(49,91,140)" }}>{parseFloat(adjustmentvalue || 0).toFixed(2)}</li>
                    <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", color: "rgb(49,91,140)" }}>{parseFloat(discount || 0).toFixed(2)}</li>
                    <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", color: "rgb(49,91,140)" }}>{parseFloat(subTotal).toFixed(2)}</li>
                  </ul>
                </td>
              );
            }
          })
        ))
      ))
    );
  };
  const AdjustmentValueHandler = (event) => {
    setadjustment(event.target.value)
  }
  const DiscountValueHandler = (event) => {
    setdiscount(event)
  }


  const generateTableData = () => {
    const subscriptionNames = getUniqueSubscriptionNames();
    const tableData = [];
    ShowServiceId.forEach((ele, index) => {
      const rowData = {
        Subscription: ele.subscription.name,
      };

      subscriptionNames?.forEach((name) => {
        const matchingItem = ele.data.find(item => item.name === name);

        rowData[name] = matchingItem ? (
          <Checkbox.Group key={matchingItem._id} onChange={(e) => handleCheckboxClick(e, matchingItem._id)}>
            <Checkbox value={matchingItem._id}>
              {`${matchingItem.price}.00 /${ele.subscription.name}`}
            </Checkbox>
          </Checkbox.Group>
        ) : null;
        // rowData[name] = matchingItem ? (
        //          <Checkbox>{`${matchingItem.price}.00 /${ele.subscription.name}`}</Checkbox>
        //       ) : null;
      });

      tableData.push(rowData);
    });
    return tableData;
  };


  

  const handleSelectChange = (value) => {
    if (value === 'custom') {
      // Handle custom option selection
      IsActiveness(2);
      IsActiveSelect(1);
    } else {
      const option = ShowServiceList?.find((option) => option._id === value);
      console.log(option)
      if (option) {
        setSelectedOption(option);
        // Show all subscriptions corresponding to the selected option
        setShowServiceId(option.subscriptions);
        IsActiveSelect(2);
        IsActiveness(1);
      } else {
        IsActiveness(0);
        IsActiveSelect(0);
      }

      // Clear previous subscription selection when switching options
      setSubscriptionIds([]);
      setSubscriptionCount(0);
      setadjustment(null);
      setdiscount(null);
    }
  };
   const [prices, setPrices] = useState({});
  const [quantities, setQuantities] = useState({});

  const [totals, setTotals] = useState({});
 console.log(totals)

  // useEffect(() => {
  //   const initialPrices = {};
  //   const initialQuantities = {};
  //   const initialTotals = {};
  //   productList?.map((ele) => 
  //     ele.products?.forEach((product, index) => {
  //       initialPrices[product._id] = product.price;
  //         initialQuantities[product._id] = 1;
  //         initialTotals[product._id] = product.price;
  //     })
  // )

  //   setPrices(initialPrices);
  //   setQuantities(initialQuantities);
  //   setTotals(initialTotals);
  // }, [productList]);
// ..................................

  useEffect(() => {
    const initialPrices = {};
    const initialQuantities = {};
    const initialTotals = {};
    productList?.forEach((ele) =>
      ele.products?.forEach((product) => {
        initialPrices[product._id] = product.price;
        initialQuantities[product._id] = 1;
        initialTotals[product._id] = product.price;
      })
    );

    setPrices(initialPrices);
    setQuantities(initialQuantities);
    setTotals(initialTotals);

    // Initialize the form with the initial totals
    form.setFieldsValue({
      items: productList?.flatMap(ele =>
        ele.products?.map(product => ({
          item: product._id,
          price: product.price,
          quantity: 1,
          total: product.price,
          remarks: product.description
        }))
      )
    });
  }, [productList]);
  // const updateQuantity = (productId, value) => {
  //   const updatedQuantities = { ...quantities, [productId]: value };
  //   setQuantities(updatedQuantities);
  //   // const updatedTotals = { ...totals, [productId]: prices[productId] * value };
  //   // setTotals(updatedTotals);

  //   const updatedTotals = { ...totals };
  //   updatedTotals[productId] = prices[productId] * value;
  //   setTotals(updatedTotals);
  // };
// ..............
  const updateQuantity = (productId, value) => {
    const updatedQuantities = { ...quantities, [productId]: value };
    setQuantities(updatedQuantities);

    const updatedTotals = { ...totals, [productId]: prices[productId] * value };
    setTotals(updatedTotals);

    // Update the form's state directly with the new total value
    form.setFieldsValue({
      items: mainData.products?.map((product, index) => {
        if (product._id === productId) {
          return {
            ...form.getFieldValue(['items', index]),
            total: prices[productId] * value,
          };
        }
        return form.getFieldValue(['items', index]);
      })
    });
  };
  const optionsss = ['Addition', 'Substraction'];
  return (
    <>
      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-1px;", marginBottom: "20px" }}>
        {translate('Customer Detail Section')}
      </Col>
      <Row gutter={[12, 0]} style={{ marginTop: "30px" }}>
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
        {/* <Col className="gutter-row" span={6}>
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
        </Col> */}

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
              onChange={handleDropdownChange}
            >
              {serviceOptions.map((option, index) => (
                <Select.Option key={index} value={index} onChange={getServicesSubAndItems}>{option}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

      </Row>

      {
        activeness == 2 && (
          <>
            <Row gutter={[12, 12]} style={{ position: 'relative' }}>
              <Col className="gutter-row" span={12}>
                <Form.Item label={translate('Service Name')} name="ServiceName" rules={[
                  {
                    required: true,
                  },
                ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item label={translate('Service Price')} name="ServicePrice" rules={[
                  {
                    required: true,
                  },
                ]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={24}>
                <Form.Item label={translate('Service Description')} name="ServiceDescription" rules={[

                ]}>
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>



            <Collapse accordion activeKey={accordionActiveKey} onChange={handleChange} style={{ marginTop: "2%" }}>
              {productList?.map((mainData, i) => (
                <>

                  {i == productList.length - 2 &&
                    <Collapse.Panel header={"Custom Item"} key={'custom item'}>
                      <Row gutter={[12, 12]} style={{ position: 'relative' }} key={'ci-11'}>

                        <Col className="gutter-row" span={4}>
                          <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
                        </Col>
                        <Col className="gutter-row" span={3}>
                          <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                          <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
                        </Col>
                      </Row>
                      <Form.List name="customItems" initialValue={[{
                        itemName: '',
                        price: "",
                        quantity: "",
                        total: "",
                        remarks: '',
                      }]}>
                        {(fields, { add, remove }) => (

                          <>

                            {fields?.map((field, index) => (
                              <ItemRow key={field.key} remove={remove} field={field} current={current} isFirstRow={index === 0}></ItemRow>
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
                    </Collapse.Panel>
                  }
                  <Collapse.Panel header={mainData.name} key={mainData._id}>
                    <div key={`${i}`}>
                      <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                        <Col className="gutter-row" span={4}>
                          <p style={{ marginLeft: "20%" }}>{translate('Sub-Item')}</p>
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <p style={{ marginLeft: "20%" }}>{translate('Price')}</p>
                        </Col>
                        <Col className="gutter-row" span={3}>
                          <p style={{ marginLeft: "20%" }}>{translate('Quantity')}</p>{' '}
                        </Col>
                        <Col className="gutter-row" span={4}>
                          <p style={{ marginLeft: "40%" }}>{translate('Total')}</p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                          <p style={{ marginLeft: "15%" }}>{translate('Remarks')}</p>
                        </Col>
                      </Row>
                      {/* <Form.List name="items" >
                    <> */}
                      {mainData.products?.map((data, index) => (
                        <Row gutter={[12, 12]} style={{ position: 'relative' }} key={`${index}-${data._id}`}>
                          <Col className="gutter-row mt-2">
                            <Checkbox onChange={() => setCheckedId(data.price)} />
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <Form.Item
                              name={['items', index, 'item']}
                              initialValue={data._id}
                              rules={[
                                {
                                  validator: (_, value) => {
                                    if (value || data.name) { // Allow the default value to pass
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Item name is required'));
                                  },
                                },
                              ]}
                            >
                              <span>{data.name}</span>
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <Form.Item
                              name={['items', index, 'price']}
                              initialValue={prices[data._id]}
                            >
                              <InputNumber
                                className="moneyInput"
                                min={0}
                                controls={false}
                                addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                                addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                                value={prices[data._id]}
                                readOnly
                              />
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={3}>
                            <Form.Item name={['items', index, 'quantity']}>
                              <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                defaultValue={1}
                                onChange={(value) => updateQuantity(data._id, value)}
                              />
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <Form.Item
                              name={['items', index, 'total']}
                              initialValue={totals[data._id]}
                            >
                              <span style={{ marginLeft: "24%" }}>{totals[data._id]}</span>
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={7}>
                            <Form.Item name={['items', index, 'remarks']}>
                              <Input placeholder="Remarks for Workorder" defaultValue={data.description} />
                            </Form.Item>
                          </Col>
                        </Row>
                      ))}

                      {/* </>
                  </Form.List> */}
                    </div >
                  </Collapse.Panel>
                </>
              ))}
            </Collapse>
          </>
        )
      }

      {activeSelect == 2 && <>
        <Col className="gutter-row" span={24}>
          <Form.Item label={translate('Service Description')} name="ServiceDescription" rules={[
          ]}>
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col className="gutter-row " span={24} >

          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Table
                // columns={columns}
                columns={generateColumns()}

                dataSource={generateTableData()}
                pagination={false}
              />
            </Col>
          </Row>
        </Col>
        <Collapse accordion activeKey={accordionActiveKey} onChange={handleChange} style={{ marginTop: "5%" }}>
          {productList?.map((mainData, i) => (
            <>

              {i == productList.length - 2 &&
                <Collapse.Panel header={"Custom Item"} key={'custom item'}>
                  <Row gutter={[12, 12]} style={{ position: 'relative' }} key={'ci-11'}>

                    <Col className="gutter-row" span={4}>
                      <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
                    </Col>
                    <Col className="gutter-row" span={3}>
                      <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
                    </Col>
                  </Row>
                  <Form.List name="customItems" initialValue={[{
                    itemName: '',
                    price: "",
                    quantity: "",
                    total: "",
                    remarks: '',
                  }]}>
                    {(fields, { add, remove }) => (

                      <>

                        {fields?.map((field, index) => (
                          <ItemRow key={field.key} remove={remove} field={field} current={current} isFirstRow={index === 0}></ItemRow>
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
                </Collapse.Panel>
              }
              <Collapse.Panel header={mainData.name} key={mainData._id}>
                <div key={`${i}`}>
                  <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                    <Col className="gutter-row" span={4}>
                      <p style={{ marginLeft: "20%" }}>{translate('Sub-Item')}</p>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <p style={{ marginLeft: "20%" }}>{translate('Price')}</p>
                    </Col>
                    <Col className="gutter-row" span={3}>
                      <p style={{ marginLeft: "20%" }}>{translate('Quantity')}</p>{' '}
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <p style={{ marginLeft: "40%" }}>{translate('Total')}</p>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <p style={{ marginLeft: "15%" }}>{translate('Remarks')}</p>
                    </Col>
                  </Row>
                  {/* <Form.List name="items" >
                    <> */}
                  {mainData.products?.map((data, index) => (

                    <Row gutter={[12, 12]} style={{ position: 'relative' }} key={`${index}-${data._id}`}>
                      <Col className="gutter-row mt-2">
                        <Checkbox onChange={() => setCheckedId(data.price)} />
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          name={['items', index, 'item']}
                          initialValue={data._id}
                          rules={[
                            {
                              validator: (_, value) => {
                                if (value || data.name) { // Allow the default value to pass
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Item name is required'));
                              },
                            },
                          ]}
                        >
                          {/* <Input placeholder="Item Name"   readOnly /> */}

                          <span>{data.name}</span>


                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          name={['items', index, 'price']}
                          // initialValue={data.price}
                          initialValue={prices[data._id]}


                        >
                          {/* <span style={{marginLeft:"-17%"}}>{data.price}</span> */}
                          <InputNumber
                            className="moneyInput"
                            onChange={updatePrice}
                            min={0}
                            controls={false}
                            addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                            addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                            // defaultValue={data.price}
                            value={prices[data._id]}
                            readOnly

                          />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={3}>
                        <Form.Item name={[`items`, `${index}`, 'quantity']}
                        // rules={[{ required: true }]}
                        >
                          <InputNumber style={{ width: '100%' }} min={0}
                            // onChange={updateQt} 
                            defaultValue={1}
                            onChange={(value) => updateQuantity(data._id, value)}

                          />
                        </Form.Item>
                      </Col>

                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          name={[`items`, `${index}`, 'total']}
                          initialValue={totals[data._id]}
                        >
                          <span style={{ marginLeft: "24%" }}>{totals[data._id]}</span>
                          {/* <InputNumber
                              readOnly
                              className="moneyInput"
                              // value={totalState}
                              defaultValue={totals[data._id]}
                              // value={totals[data._id]}
                              min={0}
                              controls={false}
                              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                              formatter={(value) => money.amountFormatter({ amount: value })}
                            // initialValue={totalState}
                            /> */}
                        </Form.Item>
                      </Col>

                      <Col className="gutter-row" span={7}>
                        <Form.Item name={[`items`, `${index}`, 'remarks']} >
                          <Input placeholder=" Remarks for Workorder" defaultValue={data.description} />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                  {/* </>
                  </Form.List> */}
                </div >
              </Collapse.Panel>
            </>
          ))}
        </Collapse>
      </>}
    
      <Divider dashed />

      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }} >
        {translate('Quotation Billing Details')}
      </Col>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }} >

        <Col className="gutter-row" span={12}>
          <Form.Item
            name="Adjustment"
            label={translate('Adjustment')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
          </Form.Item>

          {
            active == 3 && (
              <Form.Item name="AdjustmentType" rules={[
                {
                  required: true,
                },
              ]}>
                <Input />
              </Form.Item>
            )
          }

          {
            active == 2 && (
              <Form.Item name="AdjustmentValue" rules={[
                {
                  required: true,
                },
              ]}>
                <Input onChange={AdjustmentValueHandler} />
              </Form.Item>
            )
          }

        </Col>


 <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Initial Remarks')} name="InitialRemarks" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
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
    
      {subscriptionIds.length > 0 && <>
        <Divider dashed />
        <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }} >
          {translate('Selected Quotation Billing Details')}
        </Col>
        <table style={{ border: '0.2px solid #000', width: "100%", height: "220px", marginTop: "3%" }}>
          <tbody>
            <tr>
              <th style={{  padding: '10px', borderRight: 'none' }}>
                <ul className='calculatorFilled' style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: "2.1" }}>
                  <li style={{ borderBottom: '1px solid #fff', fontSize: "16px" }}>Contract For</li>
                  <li style={{ borderBottom: '1px solid #fff', fontSize: "16px" }}>Per Workorder Cost</li>
                  <li style={{ borderBottom: '1px solid #fff', fontSize: "16px" }}>Adjustment</li>
                  <li style={{ borderBottom: '1px solid #fff', fontSize: "16px" }}>Discount({discountValue}%)</li>
                  <li style={{ borderBottom: '1px solid #fff', fontSize: "16px" }}>Subtotal</li>
                </ul>
              </th>
              {CalculatorFilled()}
            </tr>
          </tbody>
        </table>
      </>}

      <div style={{ position: 'relative', width: ' 100%', float: 'right', marginTop: "23px" }}>
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