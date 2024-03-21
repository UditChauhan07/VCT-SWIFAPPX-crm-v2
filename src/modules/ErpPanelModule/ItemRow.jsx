import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import { useForm } from 'antd/lib/form/Form';

export default function ItemRow({ field, remove, current = null, response }) {
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
    // <Row gutter={[12, 12]} style={{ position: 'relative' }}>
    //   <Col className="gutter-row" span={4}>
    //     <Form.Item
    //       name={[field.name, 'itemName']}
    //       rules={[
    //         {
    //           required: true,
    //           message: 'Missing itemName name',
    //         },
    //         {
    //           pattern: /^(?!\s*$)[\s\S]+$/, // Regular expression to allow spaces, alphanumeric, and special characters, but not just spaces
    //           message: 'Item Name must contain alphanumeric or special characters',
    //         },
    //       ]}
    //     >
    //       <Input placeholder="Item Name" />
    //     </Form.Item>
    //   </Col>
    //   <Col className="gutter-row" span={4}>
    //     <Form.Item name={[field.name, 'price']} rules={[{ required: true }]}>
    //       <InputNumber
    //         className="moneyInput"
    //         onChange={updatePrice}
    //         min={0}
    //         controls={false}
    //         addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
    //         addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
    //       />
    //     </Form.Item>
    //   </Col>
    //   <Col className="gutter-row" span={3}>
    //     <Form.Item name={[field.name, 'quantity']} rules={[{ required: true }]}>
    //       <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
    //     </Form.Item>
    //   </Col>

    //   <Col className="gutter-row" span={4}>
    //     <Form.Item name={[field.name, 'total']}>
    //       <Form.Item>
    //         <InputNumber
    //           readOnly
    //           className="moneyInput"
    //           value={totalState}
    //           min={0}
    //           controls={false}
    //           addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
    //           addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
    //           formatter={(value) => money.amountFormatter({ amount: value })}
    //         />
    //       </Form.Item>
    //     </Form.Item>
    //   </Col>

    //   <Col className="gutter-row" span={7}>
    //     <Form.Item name={[field.name, 'remarks']}>
    //       <Input placeholder=" Remarks for Quotation" />
    //     </Form.Item>
    //   </Col>

    //   <div style={{ position: 'absolute', right: '50px', top: ' 5px' }}>
    //     <DeleteOutlined onClick={() => remove(field.name)} />
    //   </div>
    // </Row>
    //     <>
    //       {
    //         response.subItem.map((mainData) => (
    //           <div key={mainData.Serviceid}></div>
    //           <h2>{mainData.Servicename}</h2>
    //           {
    //             mainData.subItemlist.map((data, index) => (
    //               <Row gutter={[12, 12]} style={{ position: 'relative' }} key={index}>
    //                 <Col className="gutter-row" span={4}>
    //                   <Form.Item
    //                     name={[`${index}`, 'itemName']}
    //                     rules={[
    //                       {
    //                         required: true,
    //                         message: 'Missing itemName name',
    //                       },
    //                       {
    //                         pattern: /^(?!\s*$)[\s\S]+$/, // Regular expression to allow spaces, alphanumeric, and special characters, but not just spaces
    //                         message: 'Item Name must contain alphanumeric or special characters',
    //                       },
    //                     ]}
    //                   >
    //                     {data.name && <Input placeholder="Item Name" value={data?.name || ''} />}
    //                   </Form.Item>
    //                 </Col>
    //                 <Col className="gutter-row" span={4}>
    //                   <Form.Item name={[index, 'price']} rules={[{ required: true }]}>
    //                     <InputNumber
    //                       className="moneyInput"
    //                       min={0}
    //                       controls={false}
    //                       addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
    //                       addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
    //                     />
    //                   </Form.Item>
    //                 </Col>
    //                 <Col className="gutter-row" span={3}>
    //                   <Form.Item name={[index, 'quantity']} rules={[{ required: true }]}>
    //                     <InputNumber style={{ width: '100%' }} min={0} />
    //                   </Form.Item>
    //                 </Col>

    //                 <Col className="gutter-row" span={4}>
    //                   <Form.Item name={[index, 'total']}>
    //                     <InputNumber
    //                       readOnly
    //                       className="moneyInput"
    //                       min={0}
    //                       controls={false}
    //                       addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
    //                       addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
    //                       formatter={(value) => money.amountFormatter({ amount: value })}
    //                     />
    //                   </Form.Item>
    //                 </Col>

    //                 <Col className="gutter-row" span={7}>
    //                   <Form.Item name={[index, 'remarks']}>
    //                     <Input placeholder=" Remarks for Quotation" />
    //                   </Form.Item>
    //                 </Col>

    //                 <div style={{ position: 'absolute', right: '50px', top: ' 5px' }}>
    //                   <DeleteOutlined onClick={() => remove(index)} />
    //                 </div>
    //               </Row>
    //             ))
    //           }
    //           </div >
    //         ));
    // }
    //     </>
    <>
      {response.subItem.map((mainData, i) => (
        <div key={mainData.Serviceid}>
          <h4>{mainData.Servicename}</h4>
          {mainData.subItemlist.map((data, index) => (

            <Row gutter={[12, 12]} style={{ position: 'relative' }} key={index}>
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
                  <InputNumber style={{ width: '100%' }} min={0} />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={4}>
                <Form.Item name={[`${i}`, `${index}`, 'total']} >
                  <InputNumber
                    readOnly
                    className="moneyInput"
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
      ))}
    </>
  );
}
