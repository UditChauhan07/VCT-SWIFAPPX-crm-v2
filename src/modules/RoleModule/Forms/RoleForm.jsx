import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Checkbox } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import { useDispatch, useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import TextArea from 'antd/es/input/TextArea';
import styles from './styles.module.css'; // Import the CSS module

import { useNavigate, useParams } from 'react-router-dom';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import { erp } from '@/redux/erp/actions';

import { API_BASE_URL } from '@/config/serverApiConfig';
let user = JSON.parse(window.localStorage.getItem('auth'))
let user_id = user.current._id
var role
var adminLevel
var permissions
var isSAAS

export default function RoleForm() {
  const { last_offer_number } = useSelector(selectFinanceSettings);
  return <LoadRoleForm />;
}

function LoadRoleForm({ isUpdateForm = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translate = useLanguage();
  const { dateFormat } = useDate();

  const [form] = Form.useForm();
  const { id } = useParams();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const resetErp = {
    status: '',
  };
  const [currentErp, setCurrentErp] = useState(current ?? resetErp);
  var initialAdminLevel

  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    GetAdminDataHandler().then((res) => {
      // console.log('result data --- ', res);
      setAdmin(res.result)
    }).catch((err) => {
      console.error({ err });
    })
  }, [])
  const GetAdminDataHandler = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(`${API_BASE_URL}admin/read/${user_id}`, {
      method: "GET",
      headers: headersList
    });

    let data = JSON.parse(await response.text());
    return data
  }

  role = admin?.role_id
  adminLevel = role?.admin_level

  // console.log({ adminLevel });

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'update' }));
      navigate(`/roles`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      setCurrentErp(current);
      let formData = { ...current };
      if (formData.date) {
        formData.date = dayjs(formData.date);
      }

      if (formData.admin_level) {
        initialAdminLevel = formData.admin_level == 1 ? 'Swif SAAS Admin' : (formData.admin_level == 2 ? 'Service Provider' : 'End Customer')
      }

      form.resetFields();
      form.setFieldsValue(formData);
      console.log({ formData });
    }
  }, [current]);

  // console.log({ current });

  let entities = ['people', 'client', 'worker', 'company', 'lead', 'offer', 'invoice', 'quote', 'payment', 'product', 'productcategory', 'expense', 'expensecategory', 'admin', 'roles', 'paymentMode', 'taxes', 'pricingmodel', 'subscriptiontype']

  // console.log('current?.admin_level --- ', current?.admin_level);

  return (
    <>
      <Row gutter={[12, 0]}>
        {/* <Col className="gutter-row" span={12}>
          <Form.Item
            name="company_id"
            label={translate('Company')}
          >
            <AutoCompleteAsync entity={'company'} displayLabels={['name']} searchFields={'name'} />
          </Form.Item>
        </Col> */}

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Name')} name="name" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={adminLevel == 1 ? 6 : 12}>
          <Form.Item
            label={translate('User Level')}
            name="admin_level"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              {(adminLevel == 1) && (
                <Select.Option value="1">{translate('Swif SAAS Level')}</Select.Option>
              )}

              {(adminLevel <= 2) && (
                <Select.Option value="2">{translate('Service Provider')}</Select.Option>
              )}


              <Select.Option value="3">{translate('End Customer')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        {adminLevel == 1 && (<Col className="gutter-row" span={6}>
          <Form.Item
            label={translate('Is Default Role')}
            name="is_default"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              <Select.Option value="true">{translate('Yes')}</Select.Option>
              <Select.Option value="false">{translate('No')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>)}

      </Row>
      <Row gutter={[12, 0]} >
        <Col className="gutter-row" span={24}>
          <Form.Item label={translate('Description')} name="description">
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[24, 0]}>
        <Col className="gutter-row" span={12} style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
          {translate('Permissions')}
        </Col>

      </Row>

      {/* Module Name and Module Actions */}
      <Row align="middle" className={styles.first_row}>
        <Col className="gutter-row" span={6} >
          <p className={styles.bold_text}>{translate('Module Name')}</p>
        </Col>
        <Col className={`${styles.custom_col} gutter-row`} span={12}>
          <p className={styles.bold_text}>{translate('Module Actions')}</p>
        </Col >
      </Row >

      {entities.map((entity, key) => (
        < Row align="middle" className={styles.middle_row} >
          <Col className="gutter-row" span={6}>
            {translate(entity[0].toUpperCase() +
              entity.slice(1))}
          </Col>
          <Col className={`${styles.custom_col} gutter-row`} span={18}>
            <div className={styles['permissions_container']}>
              <p className='m-0'>Check to add Permissions</p>
              <div className={styles['permissions_checkboxes']}>
                <div className={styles.w_100px}>
                  <Form.Item name={['permissions', `${entity}_list`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
                    <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_list`], e.target.checked)}>
                      {translate('List')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={styles.w_100px}>
                  <Form.Item name={['permissions', `${entity}_create`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                    <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_create`], e.target.checked)}>
                      {translate('Create')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={styles.w_100px}>
                  <Form.Item name={['permissions', `${entity}_read`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={entity === 'admin' ? true : false}>
                    <Checkbox disabled={entity === 'admin' ? true : false} onChange={(e) => form.setFieldValue(['permissions', `${entity}_read`], e.target.checked)}>
                      {translate('Read')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={styles.w_100px}>
                  <Form.Item name={['permissions', `${entity}_edit`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                    <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_edit`], e.target.checked)}>
                      {translate('Edit')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={styles.w_100px}>
                  <Form.Item name={['permissions', `${entity}_delete`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                    <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_delete`], e.target.checked)}>
                      {translate('Delete')}
                    </Checkbox>
                  </Form.Item>
                </div>
              </div >
            </div >
          </Col >
        </Row >
      ))
      }

      < div style={{ position: 'relative', width: ' 100%', marginTop: 30 }
      }>
        <Row gutter={[10, -20]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button className="text-center" type="primary" htmlType="submit" icon={<PlusOutlined />} block >
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div >
    </>
  );
}