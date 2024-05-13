import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import { useForm } from 'antd/lib/form/Form';
import { Checkbox } from 'antd/lib';

export default function ItemRow({ field, remove, current = null, response  }) {


  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const money = useMoney();
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
    if (field.fieldKey === 0 && current && current.items && current.items.length > 0) {
      const firstItem = current.items[0];
      form.setFieldsValue({ [field.name]: firstItem });
      setName(firstItem.itemName || '');
      setPrice(firstItem.price || 0);
      setQuantity(firstItem.quantity || 0);
    }
  }, [current, form]);

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

    setTotal(currentTotal);
  }, [price, quantity]);



  return (
    <>

      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        {/* <Col className="gutter-row" >
          <Checkbox></Checkbox>
        </Col> */}


        <Col className="gutter-row" span={4}>
          <Form.Item
            name={[field.name, 'item']}
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
            <Input onChange={updateName} placeholder="Item Name" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item name={[field.name, 'price']} rules={[{ required: true }]}>
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
          <Form.Item name={[field.name, 'quantity']} rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={4}>
          <Form.Item name={[field.name, 'total']}>
            <Form.Item>
              <InputNumber
                readOnly
                className="moneyInput"
                value={totalState}
                // initialValue={totalState}
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
          <Form.Item name={[field.name, 'remarks']}>
            <Input placeholder=" Remarks for Quotation" />
          </Form.Item>
        </Col>
        {field &&
          <div style={{ position: 'absolute', right: '10px', top: ' 5px' }}>
            <DeleteOutlined onClick={() => remove(field.name)} />
          </div>
        }
      </Row>
    </>
  );
}