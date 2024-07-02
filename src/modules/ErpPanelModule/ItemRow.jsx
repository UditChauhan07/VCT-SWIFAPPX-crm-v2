// import { useState, useEffect } from 'react';
// import { Form, Input, InputNumber, Row, Col } from 'antd';

// import { DeleteOutlined } from '@ant-design/icons';
// import { useMoney, useDate } from '@/settings';
// import calculate from '@/utils/calculate';
// import { useForm } from 'antd/lib/form/Form';
// import { Checkbox } from 'antd/lib';

// export default function ItemRow({ field, remove, current = null, response, isFirstRow }) {

//   const [totalState, setTotal] = useState(undefined);
//   const [price, setPrice] = useState(0);
//   const [name, setName] = useState('');
//   const [quantity, setQuantity] = useState(0);

//   const money = useMoney();
//   const updateQt = (value) => {
//     setQuantity(value);
//   };
//   const updatePrice = (value) => {
//     setPrice(value);
//   };
//   const updateName = (value) => {
//     setName(value);
//   };
//   const [form] = useForm();

//   useEffect(() => {
//     if (field.fieldKey === 0 && current && current.items && current.items.length > 0) {
//       const firstItem = current.items[0];
//       form.setFieldsValue({ [field.name]: firstItem });
//       setName(firstItem.itemName || '');
//       setPrice(firstItem.price || 0);
//       setQuantity(firstItem.quantity || 0);
//     }
//   }, [current, form]);

//   useEffect(() => {
//     if (current) {

//       const { items, invoice } = current;

//       if (invoice) {
//         const item = invoice[field.fieldKey];

//         if (item) {
//           setQuantity(item.quantity);
//           setPrice(item.price);
//         }
//       } else {
//         const item = items[field.fieldKey];
//         if (item) {
//           setQuantity(item.quantity);
//           setPrice(item.price);
//         }
//       }
//     }
//   }, [current]);

//   useEffect(() => {
//     const currentTotal = calculate.multiply(price, quantity);
//     setTotal(currentTotal);
//   }, [price, quantity]);

//   return (
//     <>
//       <Row gutter={[12, 12]} style={{ position: 'relative' }}>
//         <Col className="gutter-row" span={4}>
//           <Form.Item
//             name={[field.name, 'item']}>
//             <Input onChange={updateName} placeholder="Item Name" />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={4}>
//           <Form.Item name={[field.name, 'price']} >
//             <InputNumber
//               className="moneyInput"
//               onChange={updatePrice}
//               min={0}
//               controls={false}
//               addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
//               addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
//             />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={3}>
//           <Form.Item name={[field.name, 'quantity']}>
//             <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={4}>
//           <Form.Item
//             name={[field.name, 'total']}
//             initialValue={totalState}
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues[field.name]?.total !== currentValues[field.name]?.total
//             }
//           >
//             <Form.Item>
//               <InputNumber
//                 readOnly
//                 className="moneyInput"
//                 value={totalState}
//                 min={0}
//                 controls={false}
//                 addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
//                 addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
//                 formatter={(value) => money.amountFormatter({ amount: value })}
//               />
//             </Form.Item>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={7}>
//           <Form.Item name={[field.name, 'remarks']}>
//             <Input placeholder=" Remarks " />
//           </Form.Item>
//         </Col>

//         {
//           !isFirstRow && (
//             <div style={{ position: 'absolute', right: '10px', top: ' 5px' }}>
//               <DeleteOutlined onClick={() => remove(field.name)} />
//             </div>
//           )
//         }

//       </Row>
//     </>
//   );
// }

// NEW CODE

import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import { useForm } from 'antd/lib/form/Form';
import { Checkbox } from 'antd/lib';

export default function ItemRow({
  key,
  field,
  remove,
  current = null,
  response,
  isFirstRow,
  onChange = {},
}) {
  const {
    CustomItemNameHandler,
    CustomItemPriceHandler,
    CustomItemQTYHandler,
    CustomItemRemarksHandler,
  } = onChange || null;

  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [quantity, setQuantity] = useState(0);

  const money = useMoney();
  const updateQt = (value, _id) => {
    CustomItemQTYHandler(_id, value ?? 0);
    setQuantity(value);
  };
  const updatePrice = (value, _id) => {
    CustomItemPriceHandler(_id, value ?? 0);
    setPrice(value);
  };
  const updateName = (value) => {
    setName(value);
  };

  const updateRemarks = (value, _id) => {
    CustomItemRemarksHandler(_id, value ?? '');
    setRemarks(value);
  };

  const [form] = useForm();

  useEffect(() => {
    if (field.fieldKey === 0 && current && current.items && current.items.length > 0) {
      const firstItem = current.items[0];
      form.setFieldsValue({ [field.name]: firstItem });
      setName(firstItem.itemName || '');
      setPrice(firstItem.price || 0);
      setQuantity(firstItem.quantity || 0);
      setRemarks(firstItem.remarks || '');
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
          setRemarks(item.remarks);
        }
      } else {
        const item = items[field.fieldKey];
        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
          setRemarks(item.remarks);
        }
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);
    setTotal(currentTotal);
  }, [price, quantity]);
 const [errorMessage, setErrorMessage]= useState()
  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow decimal point (.) and digits (0-9)
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      setErrorMessage('Only numeric values are accepted');
    } else {
      setErrorMessage(''); // Clear error message if valid character
    }
  }
  const numericFormatter = (value) => {
    // Remove non-numeric characters
    return value.replace(/[^0-9.]/g, '');
  };

  // const validateNumber = (_, value) => {
  //   if (!value) {
  //     return Promise.resolve();
  //   }
  //   if (!/^\d{1,10}$/.test(value)) {
  //     return Promise.reject(new Error('Price must be at most 10 digits.'));
  //   }
  //   return Promise.resolve();
  // };

  // const validateNumber = (_, value) => {
  //   console.log(typeof value)
  //   if (value === undefined || value === null ) {
  //     return Promise.resolve();
  //   }
  //   if (typeof value !== 'number'  || isNaN(value)) {
  //     return Promise.reject(new Error('Only numerical values are accepted.'));
  //   }
  //   if (!/^\d{1,10}$/.test(value.toString())) {
  //     return Promise.reject(new Error('Price must be at most 10 digits.'));
  //   }
  //   return Promise.resolve();
  // };

  const validateNumber = (_, value) => {
    if (value === undefined || value === null) {
      return Promise.resolve();
    }
    if (isNaN(value) || value === '') {
      return Promise.reject(new Error('Only numerical values are accepted.'));
    }
    if (!/^\d{1,10}$/.test(value.toString())) {
      return Promise.reject(new Error('Price must be at most 10 digits.'));
    }
    return Promise.resolve();
  };

  const validateNumberqt = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    if (!/^\d{1,10}$/.test(value)) {
      return Promise.reject(new Error('Quantity must be at most 10 digits.'));
    }
    return Promise.resolve();
  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      setErrorMessage('Only numeric values are accepted.');
    } else {
      setErrorMessage('');
    }
  };

  const numericFormatter = (value) => {
    return value.replace(/[^0-9.]/g, '');
  };

  return (
    <>
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={4}>
          <Form.Item
            name={[field.name, 'item']}
            rules={[{ max: 15, message: 'Name can have a maximum of 10 characters.' }]}
          >
            <Input
              onChange={updateName}
              placeholder="Item Name"
              onKeyUp={(e) => {
                CustomItemNameHandler(`CI-${field.key}`, e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            name={[field.name, 'price']}
            // rules={[
            //   {
            //     validator: validateNumber,
            //   },
            // ]}
          >
            <InputNumber
              className="moneyInput"
              onChange={(value) => updatePrice(value, `CI-${field.key}`)}
              formatter={numericFormatter}
              
              onKeyPress={handleKeyPress}
              min={0}
              // formatter={(value) => (value ? `${value}`.slice(0, 10) : '')}
              formatter={numericFormatter}
              onKeyPress={handleKeyPress}
              controls={false}
              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
            />
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={3}>
          <Form.Item
            name={[field.name, 'quantity']}
            rules={[
              {
                validator: validateNumberqt,
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              //  min={0}
              formatter={(value) => (value ? `${value}`.slice(0, 10) : '')}
              onChange={(value) => updateQt(value, `CI-${field.key}`)}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={4}>
          {/* <Form.Item
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
                value={totalState ? totalState : price}
                min={0}
                controls={false}
                addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
                addonBefore={
                  money.currency_position === 'before' ? money.currency_symbol : undefined
                }
                formatter={(value) => money.amountFormatter({ amount: value })}
              />
            </Form.Item>
          </Form.Item> */}

          <Form.Item  name={[field.name, 'total']}
            initialValue={totalState ? totalState : price}
            min={0}
            shouldUpdate={(prevValues, currentValues) =>
              prevValues[field.name]?.total !== currentValues[field.name]?.total
            } >
            <span style={{ marginLeft: '24%' }}>{totalState ? totalState : price}</span>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={7}>
          <Form.Item name={[field.name, 'remarks']}>
            <Input
              placeholder=" Remarks "
              onChange={(e) => updateRemarks(e.target.value, `CI-${field.key}`)}
            />
          </Form.Item>
        </Col>

        {!isFirstRow && (
          <div style={{ position: 'absolute', right: '10px', top: ' 5px' }}>
            <DeleteOutlined
              onClick={() => {
                remove(field.name);
                CustomItemNameHandler(`CI-${field.key}`, null, null, null, true);
              }}
            />
          </div>
        )}
      </Row>
    </>
  );
}
