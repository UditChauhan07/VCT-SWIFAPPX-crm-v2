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
import ItemRow from '@/modules/ErpPanelModule/ItemRow';
const { Option } = Select;
const { Panel } = Collapse;

export default function WorkOrderForm({ subTotal = 0, current = null }) {
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
  const [adjustmentType, setAdjustmentType] = useState('1');
  const [showInput, setShowInput] = useState(false);

  const handleAdjustmentTypeChange = (e) => {
    setAdjustmentType(e.target.value);
    setShowInput(e.target.value === '1'); // Show input if 'Addition' is selected
  };


  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };
  const { TextArea } = Input;
  const money = useMoney();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [serviceCategoryOptions, setserviceCategoryOptions] = useState([]);
  const [SalesPerson, setSalesPerson] = useState()
  const [customerAddress, setCustomerAddress] = useState([])
  const [customerSelect, setcustomSelect] = useState()
  const [subscriptionData, setSubscriptionData] = useState({});
  const [accordionData, setAccordionData] = useState([]);

  const [selectedSalesPerson, setSelectedSalesPerson] = useState()

  console.log(SalesPerson?.find((item) => item._id === customerSelect)?.phone)


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
    fetchData3();
  }, [])
  const getProductHandler = async () => {
    try {
      const productListRes = await request.getProductList();
      if (productListRes.success) {
        console.log({ aaa: productListRes.result });
        setProductList(productListRes.result);
      } else {
        setProductList([]);
      }
      console.log({ productList });
    } catch (er) {
      console.error({ er });
    }
  }

  const [selectedValue, setSelectedValue] = useState('');
  const [serviceOptions, setServiceOptions] = useState(null);
  const [ShowServiceList, setShowServiceList] = useState();

  
  // console.log(customerSelect)



  const getCategorySubscriptionHandler = (value) => {
    setSelectedValue(value);
    const fetchData2 = async () => {
      try {
        const response = await request.getCateGorySubscription({ id: value });
        if (response.success) {
          setServiceOptions(response.result);
          getProductHandler();
          console.log({ cateResult: response.result })
          // Set options state based on API response
        } else {
          setServiceOptions(null)
        }
      } catch (error) {
        setServiceOptions(null)
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();

  };
  // .............
  const fetchData3 = async () => {
    try {
      const response = await request.getServiceListShow({ id: value });
      console.log(response)
      if (response.success) {
        console.log({ cateResultss: response.result })
        setShowServiceList(response.result);
        // getProductHandler();
        console.log({ cateResult: response.result })
        // Set options state based on API response
      }
      // else {
      //   setShowServiceList(null)
      // }
    } catch (error) {
      setShowServiceList(null)
      console.error('Error fetching data:', error);
    }
  };
  // const getServiceListHandler = (value) => {
  //   setSelectedValue(value);
  //   const fetchData3 = async () => {
  //     try {
  //       const response = await request.getServiceListShow({ id: value });
  //       console.log(response)
  //       if (response.success) {
  //         console.log({ cateResult: response.result })
  //         setShowServiceList(response.result);
  //         // getProductHandler();
  //         console.log({ cateResult: response.result })
  //         // Set options state based on API response
  //       } else {
  //         setShowServiceList(null)
  //       }
  //     } catch (error) {
  //       setShowServiceList(null)
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData3();
  // };
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

  // .................

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




  const [salesContactNumber, setSalesContactNumber] = useState();
  useEffect(() => {
    if (selectedSalesPerson) {
      let number = SalesPerson?.find((option) => option._id === selectedSalesPerson)?.phone
      setSalesContactNumber(number)
      ContactHandler({ salesContactNumber: number })
      let saleRepConElement = document.getElementById("salesContactNumber")
      saleRepConElement.value = number || null
      console.log({ number, salesContactNumber });
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
      }} placeholder="+1 123 456 789"
        id='salesContactNumber'
        value={salesContactNumber}

      />
    </Form.Item>
    )
  }




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
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]} 
          >
            <Input type='file' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "20px" }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="SalesPerson" f
            label={translate('Select Role/Type')}
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
              {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="SalesPerson" f
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
            >
              {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="SalesPerson" f
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
              {SalesPerson?.map((option, index) => (
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

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }}>
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
            >
              {SalesPerson?.map((option, index) => (
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
              {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

      </Row>


      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "15px" }}>

        <Col className="gutter-row" span={6}>
          <Form.Item label={translate('Product Categories')} name="ProductCategories" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item label={translate('Products')} name="Products" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>


        <Col className="gutter-row" span={6}>
          <Form.Item
            name="Price"
            label={translate('Price')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="Quantity"
            label={translate('Quantity')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
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


      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }}>
        {translate('Work Order Status')}
      </Col>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="AttendenceTime"
            label={translate('Attendence Time')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Work Order Status in the Attendence')} name="Products" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Divider dashed />

      <Col className="gutter-row" span={12} style={{ fontSize: '1.2rem', marginTop: "-9px;", marginBottom: "20px" }} >
        {translate('Work Order Billing Details')}
      </Col>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "30px" }} >

        <Col className="gutter-row" span={12} >
          <Form.Item
            name="AdjustmentType"
            label={translate('Adjustment Type')}
            rules={[
              {
                required: true,
                message: 'Please select a Adjustment Type:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }} onChange={handleAdjustmentTypeChange} value={adjustmentType}>
              <Radio value="1" selected>Addition</Radio>
              <Radio value="0">Subtraction</Radio>
            </Radio.Group>
          </Form.Item>

          {showInput && (
            <Form.Item
              name="AdjustmentValue"
              label={translate('Adjustment Value')}
              rules={[
                {
                  required: true,
                  message: 'Please enter a Value:',
                },
              ]}


            >
              <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
            </Form.Item>
          )}
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