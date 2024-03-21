import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker, TimePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';

export default function QuoteForm({ subTotal = 0, current = null }) {
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
  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };
  const { TextArea } = Input;
  const money = useMoney();

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

  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="customerType"
            label={translate('Customer Type')}
            rules={[
              {
                required: true,
                message: 'Please select a Customer Type:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }}>
              <Radio value="New">New</Radio>
              <Radio value="Old">Existing</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="selectCustomer"
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
              searchFields={'name'}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="customerAddress"
            label={translate('Customer Address')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'address'}
              displayLabels={['address']}
              searchFields={'address'}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="sendQuotationEmail"
            label={translate('Send Quotation Email')}
            rules={[
              {
                required: true,
                message: 'Please select a Send Quotation Email:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }}>
              <Radio value="1">Yes</Radio>
              <Radio value="0">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="billingAddress"
            label={translate('Billing Address')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'address'}
              displayLabels={['address']}
              searchFields={'address'}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
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
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="serviceCategory"
            label={translate('Service Category')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'servicCategories'}
              displayLabels={['servicCategories']}
              searchFields={'servicCategories'}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="serviceName"
            label={translate('Service Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'services'}
              displayLabels={['services']}
              searchFields={'services'}
            // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>

      </Row>
      <Divider dashed />

      <Divider dashed />

      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
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
        {/* <Col className="gutter-row d-none" span={3}>
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
        </Col> */}
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
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
      <Divider dashed />

      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="adjustmentType"
            label={translate('Adjustment Type')}
            rules={[
              {
                required: true,
                message: 'Please select a Customer Type:',
              },
            ]}
          >
            <Radio.Group style={{ display: "flex", gap: "20px" }}>
              <Radio value="addition">Addition</Radio>
              <Radio value="substraction">Subsctraction</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="adjustmentValue"
            label={translate('Adjustment Value')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
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
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
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
