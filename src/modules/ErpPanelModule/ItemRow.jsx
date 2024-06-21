import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import { useForm } from 'antd/lib/form/Form';
import { Checkbox } from 'antd/lib';

export default function ItemRow({ key, field, remove, current = null, response, isFirstRow, onChange = {} }) {
  const { CustomItemNameHandler, CustomItemPriceHandler, CustomItemQTYHandler } = onChange || null

  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);

  const [name, setName] = useState('');

  const [quantity, setQuantity] = useState(0);

  const money = useMoney();
  const updateQt = (value, _id) => {
    CustomItemQTYHandler(_id, value ?? 0)
    setQuantity(value);
  };
  const updatePrice = (value, _id) => {
    CustomItemPriceHandler(_id, value ?? 0)
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
        <Col className="gutter-row" span={4}>
          <Form.Item
            name={[field.name, 'item']}>
            <Input onChange={updateName} placeholder="Item Name" onKeyUp={(e) => { CustomItemNameHandler(`CI-${field.key}`, e.target.value) }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item name={[field.name, 'price']} >
            <InputNumber
              className="moneyInput"
              onChange={(value) => updatePrice(value, `CI-${field.key}`)}
              min={0}
              controls={false}
              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={3}>
          <Form.Item name={[field.name, 'quantity']}>
            <InputNumber style={{ width: '100%' }} min={0} onChange={(value) => updateQt(value, `CI-${field.key}`)} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={4}>
          <Form.Item
            name={[field.name, 'total']}
            initialValue={totalState}
            shouldUpdate={(prevValues, currentValues) =>
              prevValues[field.name]?.total !== currentValues[field.name]?.total
            }
          >
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
          <Form.Item name={[field.name, 'remarks']}>
            <Input placeholder=" Remarks " />
          </Form.Item>
        </Col>

        {
          !isFirstRow && (
            <div style={{ position: 'absolute', right: '10px', top: ' 5px' }}>
              <DeleteOutlined onClick={() => { remove(field.name); CustomItemNameHandler(`CI-${field.key}`, null, null, null, true) }} />
            </div>
          )
        }


      </Row>
    </>
  );
}