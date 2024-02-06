import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';

import calculate from '@/utils/calculate';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import { useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import TextArea from 'antd/es/input/TextArea';

export default function RoleForm({ subTotal = 0, current = null }) {
  const { last_offer_number } = useSelector(selectFinanceSettings);

  // if (!last_offer_number) {
  //   return <></>;
  // }

  return <LoadRoleForm subTotal={subTotal} current={current} />;
}

function LoadRoleForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="company_id"
            label={translate('Company')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync entity={'company'} displayLabels={['name']} searchFields={'name'} />
          </Form.Item>
        </Col>
       
        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Name')} name="name" rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item label={translate('Description')} name="description">
            <TextArea rows={5}/>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button className="text-center" type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
