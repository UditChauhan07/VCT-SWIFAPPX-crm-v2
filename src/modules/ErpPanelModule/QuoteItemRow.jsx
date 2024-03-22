import { useState, useEffect } from 'react';
import { Collapse, Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney, useDate } from '@/settings';
import calculate from '@/utils/calculate';
import { useForm } from 'antd/lib/form/Form';
import useLanguage from '@/locale/useLanguage';
import styles from '../QuoteModule/Forms/styles.module.css'; // Import the CSS module

export default function ItemRow({ field, remove, current = null, response }) {
    const translate = useLanguage();
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
    const [accordionActiveKey, setAccordionActiveKey] = useState([]);

    const handleChange = (key) => {
        setAccordionActiveKey(key);
    };

    return (
        <>
            <Collapse accordion activeKey={accordionActiveKey} onChange={handleChange}>
                {response.subItem.map((mainData, i) => (
                    <Collapse.Panel header={mainData.Servicename} key={mainData.Serviceid}>
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
                            {mainData.subItemlist.map((data, index) => (

                                <Row gutter={[12, 12]} style={{ position: 'relative' }} key={[`${i}`, `${index}`]}>
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
                                                onChange={updatePrice}
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
                                            <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
                                        </Form.Item>
                                    </Col>

                                    <Col className="gutter-row" span={4}>
                                        <Form.Item name={[`${i}`, `${index}`, 'total']} >
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
                    </Collapse.Panel>
                ))}
            </Collapse>
        </>
    );
}
