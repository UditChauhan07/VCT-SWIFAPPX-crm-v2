import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Collapse, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox, Table } from 'antd';

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
import ItemRow from '@/modules/ErpPanelModule/ItemRow';
const { Option } = Select;
const { Panel } = Collapse;

export default function WorkOrderForm({ subTotal = 0, current = null }) {
  const { last_quote_number } = useSelector(selectFinanceSettings);







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
  const [active, IsActive] = useState(1);
  const [activeness, IsActiveness] = useState(1);
  const [activeSelect, IsActiveSelect] = useState(1);
  console.log(activeSelect)

  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };
  const { TextArea } = Input;
  const money = useMoney();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [serviceCategory, setserviceCategory] = useState([]);
  const [serviceCategoryNam, setserviceCategoryNam] = useState();

  const [SalesPerson, setSalesPerson] = useState()
  const [WorkLead, setWorkLead] = useState()
  const [Workers, setWorkers] = useState()
  const [CheckedId, setCheckedId] = useState()
  // console.log(CheckedId)



  const [customerAddress, setCustomerAddress] = useState([])
  const [customerSelect, setcustomSelect] = useState()
  const [subscriptionData, setSubscriptionData] = useState({});
  const [accordionData, setAccordionData] = useState([]);
  const [serviceCategoryOptions, setserviceCategoryOptions] = useState([]);
  console.log(serviceCategoryOptions)
  const [selectedSalesPerson, setSelectedSalesPerson] = useState()



  const handleDropdownChange = async (value) => {
    setSelectedOption(value);
    try {
      // const response = await axios.get(`client/search?q=${value}&fields=label`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
      // console.log(response)
      setAccordionData(response); // Assuming the response contains an array of accordion data
    } catch (error) {
      console.error('Error fetching accordion data:', error);
    }
  };


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

  const [productList, setProductList] = useState([])
  useEffect(() => {
    getProductHandler()
    // getClientHandler()
  }, [])
  const getProductHandler = async () => {
    try {
      const productListRes = await request.getProductList();
      if (productListRes.success) {
        console.log({ Product: productListRes.result });
        setProductList(productListRes.result);
      } else {
        setProductList([]);
      }
      console.log({ productList });
    } catch (er) {
      console.error({ er });
    }
  }
  // const getClientHandler = async () => {
  //   console.log("first")
  //   try {
  //     const productListRes = await request.getSearchclintAddress({ id: "" });
  //     if (productListRes.success) {
  //       setCustomeraddress(productListRes.result);
  //       console.log({ productListResresult: productListRes.result })
  //     } else {
  //       setProductList([]);
  //     }
  //     console.log({ productListRes });
  //   } catch (er) {
  //     console.error({ er });
  //   }
  // }





  const [selectedValue, setSelectedValue] = useState('');
  const [serviceOptions, setServiceOptions] = useState(null);
  const [ShowServiceList, setShowServiceList] = useState();
  console.log(ShowServiceList)


  const getCategorySubscriptionHandler = (value) => {
    setSelectedValue(value);
    const fetchData2 = async () => {
      try {
        const response = await request.getCateGorySubscription({ id: value });
        console.log(response)
        if (response.success) {
          setServiceOptions(response.result);
          getProductHandler();
        } else {
          setServiceOptions(null)
        }
      } catch (error) {
        setServiceOptions(null)
        console.error('Error fetching data:', error);
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await request.getServiceListShow({ id: value });
        console.log(response)
        if (response.success) {
          // console.log({ cateResult: response.result })
          setShowServiceList(response.result);
          setProductList(ShowServiceList)
          // getProductHandler();
          // console.log({ cateResult: response.result })
          // Set options state based on API response
        } else {
          setShowServiceList(null)
        }
      } catch (error) {
        setShowServiceList(null)
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();
    fetchData3();
  };



  const handleFirstDropdownChange = async (event) => {
    console.log("event", event);
    try {
      const response = await request.getSearchClientAddress(event);
      console.log("response", response);
      if (response.success) {
        setCustomerAddress(response.result)
        // Set options state based on API response
      } else {

      }
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
  const [price, setPrice] = useState();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  // const money = useMoney();
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    console.log(value)
    // setPrice(value);
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
    const currentTotal = calculate.multiply(CheckedId, quantity);
    console.log(currentTotal)
    setTotal2(currentTotal);
  }, [CheckedId, quantity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getServiceCategoryOptions();
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
    const fetchData2 = async () => {
      try {
        const response = await request.getLeadWorker();
        if (response.success) {
          setWorkLead(response.result)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData2()
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

  useEffect(() => { }, [selectedSalesPerson])
  const ContactHandler = ({ salesContactNumber }) => {
    return (<Form.Item label={translate('Sales Person Contact')} name="Sales Person Contact" rules={[
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
  const columns = [
    {
      title: 'Subscription',
      dataIndex: 'Subscription',
      key: 'Subscription',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },

  ];

  return (
    <>
      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-1px;", marginBottom: "20px" }}>
        {translate('Customer Detail Section')}
      </Col>
      <Row gutter={[12, 0]} style={{ marginTop: "30px" }}>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="client"
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
            <Select
              style={{
                width: '100%',
              }}
            >
              {customerAddress.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.label}</Select.Option>
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
            <Select
              style={{
                width: '100%',
              }}
            >
              {customerAddress.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.label}</Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            name="sendworkorderEmail"
            label={translate('Send work order Email')}
            rules={[
              {
                required: true,
                message: 'Please select a Send work order Email:',
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
      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }}>
        {translate('Basic Work Order Details')}
      </Col>
      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }}>
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
      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "20px" }}>
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
            <Select
              style={{
                width: '100%',

              }}
              // onChange={(event) => setcustomSelect(event) }
              onChange={(event) => setSelectedSalesPerson(event)}

            >
              {SalesPerson?.map((option, index) => (
                <Select.Option
                  key={option._id}
                  value={option._id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>


        {/* <Col className="gutter-row" span={8}>
          <Form.Item label={translate('Sales Person Contact')}
           name="SalesPersonContact"
            rules={[
            {
              required: true,
            },
          ]}> 
      
            <Input defaultValue={(SalesPerson?.find((item) => item._id === customerSelect)?.phone)}/>
          </Form.Item>
        </Col> */}
        <Col className="gutter-row" span={8}>
          <ContactHandler salesContactNumber={salesContactNumber} />
        </Col>


        <Col className="gutter-row" span={8}>
          <Form.Item label={translate('Files')} name="Files"

          >
            <Input type='file' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "20px" }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="SelectRole/Type" f
            label={translate('Select Role/Type')} >
            <Select
              style={{
                width: '100%',
              }}
            >
              {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="LeadWorker" f
            label={translate('Lead Worker')}
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
              onChange={(event) => setWorkers(event)}
            >
              {WorkLead?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="SelectWorkers" f
            label={translate('Select Workers')}
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
              {filteredWorkLead?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />

<Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }}>
        {translate('Work Order Services')}
      </Col>

      {/* <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="ServiceCategory" f
            label={translate('Service Category')}
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
              // onChange={(event) => setserviceCategoryId(event)}
              onChange={handleserviceId}
            >
              {serviceCategory?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item
            name="ServiceName" f
            label={translate('Service Name')}
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
              {serviceCategoryNam?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row> */}




      {/* ---------------NEW SERVICE CATEGORY------------ */}



      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="serviceCategory"
            label={translate('Service Category')}

          >
            <Select
              style={{
                width: '100%',
              }}
              onChange={getCategorySubscriptionHandler}
            >
              {serviceCategoryOptions?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
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
            <Select
              style={{
                width: '100%',
              }}
              onSelect={(value) => {
                console.log(value)
                if (value === 'custom') {
                  IsActiveness(2);
                  IsActiveSelect(1)
                } else if (value === 'Dynamic') {
                  IsActiveSelect(2)
                  IsActiveness(1);
                }
                else {
                  IsActiveness(0);
                  IsActiveSelect(0)
                }
              }}

            >
              <Select.Option key="custom" value="custom">Custom Service (One Time)</Select.Option>
              {ShowServiceList?.map((option, index) => (
                <Select.Option key={option._id} value="Dynamic"  >{option.name}</Select.Option>
              ))}
            </Select>

          </Form.Item>
        </Col>

      </Row>

      {
        activeness == 2 && (
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
          // console.log("hello")





        )
      }




      {/* {accordionData.subItem && <div>
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

      </div>} */}


      {activeSelect === 2 && <>

        <Col className="gutter-row" span={24}>
          <Form.Item label={translate('Service Description')} name="ServiceDescription" rules={[

          ]}>
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={24}>

          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Table
                columns={columns}
              // dataSource={generateTableData()}
              // pagination={false}
              />
            </Col>
          </Row>
        </Col>

        <Collapse accordion activeKey={accordionActiveKey} onChange={handleChange}>
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
                  <Form.List name="items">
                    {(fields, { add, remove }) => (

                      <>
                        <Row gutter={[12, 12]} style={{ position: 'relative' }} key={'ci-11'}>
                          <Col className="gutter-row" span={4} >
                            <Form.Item
                              name={['itemName']}
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
                            >
                              <Input placeholder="Item Name" />
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <Form.Item name={['price']} rules={[{ required: true }]}>
                              <InputNumber
                                className="moneyInput"
                                onChange={updatePrice}
                                min={0}
                                controls={false}
                                addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                                addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
                              />
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={3}>
                            <Form.Item name={['quantity']} rules={[{ required: true }]}>
                              <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={4}>
                            <Form.Item name={['total']}>
                              <Form.Item>
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
                            </Form.Item>
                          </Col>
                          <Col className="gutter-row" span={7}>
                            <Form.Item name={['remarks']}>
                              <Input placeholder=" Remarks for Quotation" />
                            </Form.Item>
                          </Col>
                        </Row>


                        {fields.map((field) => (
                          <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
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
                  {mainData.products?.map((data, index) => (
                    <Row gutter={[12, 12]} style={{ position: 'relative' }} key={[`${i}`, `${data._id}`]}>
                      <Col className="gutter-row mt-2" >
                        <Checkbox onChange={() => setCheckedId(data.price)}></Checkbox>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          name={data.name}
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
                          key={[`${i}`, `${data._id}`]}
                        >

                          {data?.name && <Input placeholder="Item Name" defaultValue={data.name} readOnly />}
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item name={[`${i}`, `${index}`, 'price']} rules={[{ required: true }]} >
                          <InputNumber
                            className="moneyInput"
                            onChange={updatePrice}

                            readOnly
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
                          <InputNumber style={{ width: '100%' }} min={0}
                            onChange={updateQt}

                          />
                        </Form.Item>
                      </Col>

                      <Col className="gutter-row" span={4}>
                        <Form.Item name={[`${i}`, `${index}`, 'total']} >
                          <InputNumber
                            // readOnly
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


                    </Row>
                  ))}
                </div >
              </Collapse.Panel>
            </>
          ))}
        </Collapse>
      </>}





      <Divider dashed />

      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }} >
        {translate('Work Order Billing Details')}
      </Col>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }} >

        <Col className="gutter-row" span={12} >
          <Form.Item
            name="Adjustment"
            label={translate('Adjustment')}
            rules={[
              {
                required: true,
                message: 'Please select a Adjustment Type:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }} >
              <Radio value="0" onClick={() => IsActive(2)} >Addition</Radio>
              <Radio value="1" onClick={() => IsActive(3)}>Subtraction</Radio>
            </Radio.Group>
          </Form.Item>

          {
            active == 3 && (
              <Form.Item name="AdjustmentValue" rules={[
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
                <Input />
              </Form.Item>
            )
          }

        </Col>




        {/* 
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="AdjustmentValue"
            label={translate('Adjustment Value')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
          </Form.Item>
        </Col> */}
        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Initial Remarks')} name="InitialRemarks" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>


      </Row>


      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "13px" }}>


        {/* <Col className="gutter-row" span={8}>
          <Form.Item label={translate('Initial Remarks')} name="InitialRemarks" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col> */}

        <Col className="gutter-row" span={12}>
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

        <Col className="gutter-row" span={12}>
          <Form.Item
            name="PaymentMode" f
            label={translate('Payment Mode')}
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
          >
            <Select
              style={{
                width: '100%',
              }}
            >
              {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>



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