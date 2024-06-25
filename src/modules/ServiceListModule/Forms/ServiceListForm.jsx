import { useState, useEffect } from 'react';
import { Switch, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';

export default function ServiceListForm() {
  const translate = useLanguage();
  const { TextArea } = Input;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getServiceCategory(); 
        console.log(response)
        
        if (response.success) {
          setOptions(response.result); 
        }

        console.log(response)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getServiceCategory(); 
        console.log(response)
      
        if (response.success) {
          setOptions(response.result);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);
  const [selectedValue, setSelectedValue] = useState('');

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


  const addRow = () => {
    setRows([...rows, { name: '', price: '' }]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleInputChange = (value, event, rowIndex, fieldName) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][fieldName] = value;
    setRows(updatedRows);
  };

  const handleNameChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].name = value;
    setRows(newRows);
  };

  const handlePriceChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].price = value;
    setRows(newRows);
  };

  const [subscriptions, setSubscriptions] = useState([])
  useEffect(() => {
    if (responseData) {
      setSubscriptions(responseData?.map(data => ({
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
      return updatedSubscriptions
    })
  }

  const handleOptionPriceChange = (price, position, subscriptionId) => {
    setSubscriptions((subscriptions) => {
      const updatedSubscriptions = [...subscriptions]
      updatedSubscriptions?.forEach(subscription => {
        if (subscription.id === subscriptionId) {
          const option = subscription.options.find(option => option.position === position)
          subscription.options.splice(position, 1, { ...option, price: price })
        }
      })
      return updatedSubscriptions
    })
  }


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
                message: "Please enter your name",
              },
              {
                
                min: 3, message: 'Name must be at least 3 characters.',
                max: 50, message: 'Name must be in 30 characters.'
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
                message: 'Please Select Category.'
              },
            ]}
          >
            <Select
              onChange={handleChange}
              style={{
                width: '100%',
              }}>
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
            ]}>
            <TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Status')} name="enabled" valuePropName={'checked'}>
            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultValue={true} />
          </Form.Item>
        </Col>
      </Row>

      {
        responseData && <>
          <Divider dashed />
          {
            subscriptions?.map((subscription, index) => {
              const data = responseData.find(data => data.subscription._id === subscription.id)
              return (
                <div key={[`${subscription.id}`]}>
                  <Col className="gutter-row" span={24}>
                    <h3> {data?.subscription.name}</h3>
                    <Form.Item

                      name={[`${index}`, 'type']}
                      initialValue={data?.subscription._id} 
                      hidden
                    >
                      {/* <InputNumber style={{ display: 'none' }} /> */}
                    </Form.Item>
                  </Col>

                  {subscription.options?.map((option, i) => (
                    <div key={[`${subscription.id}-${option.position}-${i}`]}>

                      <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                        <Col className="gutter-row" span={10}>
                          <Form.Item
                            name={[`name${option.position}`]}
                            rules={[
                              {
                                required: true,
                                message: "Please enter your name",
                              },
                              {
                                min: 3,
                                message: "Name must be at least 3 characters",
                              },
                              {
                                max: 20,
                                message: "Name must be within 20 characters",
                              },
                            ]}
                            value={option.name}
                            onChange={(event) => handleOptionNameChange(event.target.value, option.position)}
                          >
                            <Input placeholder={`Enter Service Name`}
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
                                message: "Please enter Price",
                              },
                              {
                                type: 'number',
                                message: "Please enter a numeric value",
                              },
                              {
                                validator: (_, value) => {
                                  if (value && value.toString().length > 10) {
                                    return Promise.reject(new Error("Price must be within 10 digits"));
                                  }
                                  return Promise.resolve();
                                },
                              },
                            ]}
                            value={option.price}

                            onChange={(event) => handleOptionPriceChange(event.target.value, option.position, subscription.id)}
                          >
                            <InputNumber className="moneyInput" placeholder='Enter Price'
                            // value={option.price} onChange={(value) => handleOptionPriceChange(value, option.position, subscription.id)}
                            />
                          </Form.Item>
                        </Col>

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