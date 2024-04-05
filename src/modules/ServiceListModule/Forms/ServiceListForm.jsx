import { useState, useEffect } from 'react';
import { Switch, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';

export default function ServiceListForm() {
  const translate = useLanguage();

  const { TextArea } = Input;
  const [options, setOptions] = useState([{ name: '', price: '' }]);
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

  const [selectedValue, setSelectedValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = (value) => {
    setSelectedValue(value);
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
    console.log(event)
    // const { value } = event.target;
    console.log('Input value:', value);

    // console.log('Field Name:', fieldName);
    // const updatedRows = [...rows];
    // updatedRows[rowIndex][fieldName] = value;
    // setRows(updatedRows);
  };

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
            name="servicecategory"
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
            responseData.map((data, index) => (
              <div key={[`${index}`]}>
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

                {rows.map((row, i) => (

                  <div key={[`${index}`]}>
                    {console.log(index)}
                    <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                      <Col className="gutter-row" span={10}>
                        <Form.Item name={[`${i}`, 'name']} >
                          <Input placeholder="Enter Option Name" onChange={(event) => handleInputChange(event, i, 'name')} />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={10}>
                        <Form.Item name={[`${index}`, `${i}`, 'price']} rules={[{ required: true }]}>
                          <InputNumber className="moneyInput" placeholder='Enter Price' onChange={(value) => handleInputChange(value, i, 'price')} />
                        </Form.Item>
                      </Col>
                      {/* Render Remove button for each row */}

                      {i > 0 && (
                        <Col span={4}>
                          <Button onClick={() => removeRow(index)}>Remove</Button>
                        </Col>
                      )}
                    </Row>
                  </div>
                ))}
              </div>
            ))
          }
          <Button icon={<PlusOutlined />} onClick={addRow} > Add Option </Button>
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
