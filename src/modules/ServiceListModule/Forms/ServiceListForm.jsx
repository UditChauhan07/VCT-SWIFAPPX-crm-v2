import { useState, useEffect } from 'react';
import { Switch, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';

export default function ServiceListForm() {
  const translate = useLanguage();

  const { TextArea } = Input;
  // const [options, setOptions] = useState([{ name: '', price: '' }]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await request.getServiceCategory(); // Assuming your request function is named getData()
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

  const [responseData, setResponseData] = useState(null);

  const handleChange = (value) => {
    const fetchData = async () => {
      try {
        const response = await request.getCateGorySubscription({ id: value });
        if (response.success) {
          setResponseData(response.result);
        } else {
          setResponseData(null)
        }
      } catch (error) {
        setResponseData(null)
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };

  console.log("responseData", responseData);
  const [rows, setRows] = useState([{ name: '', price: '' }]);

  // Function to add a new row

  const addRow = () => {
    setRows([...rows, { name: '', price: '' }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleInputChange = (value, event, rowIndex, fieldName) => {
    // const { value } = event.target;

    const updatedRows = [...rows];
    updatedRows[rowIndex][fieldName] = value;
    setRows(updatedRows);
  };

  const handleNameChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].name = value;
    setRows(newRows);
  };

  // Function to handle changes in price input
  const handlePriceChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].price = value;
    setRows(newRows);
  };

  const [subscriptions, setSubscriptions] = useState([])
  // console.log(subscriptions)
  useEffect(() => {
    if (responseData) {
      setSubscriptions(responseData.map(data => ({
        id: data.subscription._id,
        options: [{
          position: 0,
          name: "",
          price: ""
        }]
      })))
    }
  }, [responseData])

  const handleAddOption = () => {
    setSubscriptions((subscriptions) => {
      const updatedSubscriptions = [...subscriptions]
      updatedSubscriptions?.forEach((subscription) => {
        subscription.options.push({
          position: subscription.options?.length,
          name: "",
          price: ""
        })
      })
      // console.log("updatedSubscriptions", updatedSubscriptions);
      return updatedSubscriptions
    })
  }
  const handleRemoveOption = (position) => {
    setSubscriptions((subscriptions) => {
      const updatedSubscriptions = [...subscriptions]
      updatedSubscriptions?.forEach(subscription => {
        subscription.options = subscription.options?.filter(option => option.position !== position)
      })
      return updatedSubscriptions
    })
  }
  const handleOptionNameChange = (name, position) => {
    setSubscriptions((subscriptions) => {
      const updatedSubscriptions = [...subscriptions]
      updatedSubscriptions?.forEach(subscription => {
        const option = subscription.options.find(option => option.position === position)
        subscription.options.splice(position, 1, { ...option, name: name })
      })
      // console.log("-handleOptionNameChange", updatedSubscriptions);

      return updatedSubscriptions
    })
  }

  const handleOptionPriceChange = (price, position, subscriptionId) => {
    setSubscriptions((subscriptions) => {
      const updatedSubscriptions = [...subscriptions]
      updatedSubscriptions.forEach(subscription => {
        if (subscription.id === subscriptionId) {
          const option = subscription.options.find(option => option.position === position)
          subscription.options.splice(position, 1, { ...option, price: price })
        }
      })
      return updatedSubscriptions
    })
  }
  // console.log("subscriptions", subscriptions);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name='name'
            label={translate('Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="serviceCategory"
            label={translate('Select Category')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              // onChange={(value) => setFeedback(value)}
              // defaultValue={selectedValue}
              onChange={handleChange}
              // defaultValue={field.defaultValue}
              style={{
                width: '100%',
              }}
            // key={}
            >
              {options?.map((option, ind) => (
                <Select.Option key={ind} value={option._id}>
                  {translate(option.name)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={24}>
          <Form.Item
            name="description"
            label={translate('Description')}
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
      <Row gutter={[12, 12]}>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('enabled')} name="enabled" valuePropName={'checked'}>
            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
          </Form.Item>
        </Col>
      </Row>

      {
        responseData && <>
          <Divider dashed />
          {


            subscriptions.map((subscription, index) => {
              const data = responseData.find(data => data.subscription._id === subscription.id)
              // console.log(data, subscription)
              return (
                <div key={[`${subscription.id}`]}>
                  <Col className="gutter-row" span={24}>
                    <h3>{data.subscription.name}</h3>
                    <Form.Item
                      name={[`${index}`, 'type']}
                      initialValue={data.subscription._id} // Use initialValue to set initial value
                      hidden
                    >
                      {/* <InputNumber style={{ display: 'none' }} /> */}
                    </Form.Item>
                  </Col>

                  {subscription.options.map((option, i) => (
                    <div key={[`${subscription.id}-${option.position}-${i}`]}>
                      {/* {console.log(index)} */}
                      <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                        <Col className="gutter-row" span={10}>
                          <Form.Item
                            name={[`name${option.position}`]}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            value={option.name}
                            onChange={(event) => handleOptionNameChange(event.target.value, option.position)}

                          >
                            <Input placeholder={`Enter ${data.subscription.name} Service Name`}
                            />
                          </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={10}>
                          <Form.Item
                            name={[`${index}`, `price${option.position}`]}
                            // name={[`${ option.position }`, 'price']}

                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            value={option.price} onChange={(value) => handleOptionPriceChange(value, option.position, subscription.id)}
                          >
                            <InputNumber className="moneyInput" placeholder='Enter Price'
                            // value={option.price} onChange={(value) => handleOptionPriceChange(value, option.position, subscription.id)}
                            />
                          </Form.Item>
                        </Col>
                        {/* Render Remove button for each row */}

                        {i > 0 && (
                          <Col span={4}>
                            <Button onClick={() => handleRemoveOption(option.position)}>Remove</Button>
                          </Col>
                        )}
                      </Row>
                    </div>
                  ))}
                </div>
              )
            })
          }
          <Button icon={<PlusOutlined />} onClick={handleAddOption} > Add Option </Button>
          <Divider dashed />
        </>
      }

      <div style={{ position: 'relative', width: ' 100%', float: 'left' }}>
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
