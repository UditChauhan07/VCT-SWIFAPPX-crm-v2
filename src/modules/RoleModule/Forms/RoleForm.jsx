import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Checkbox } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import SelectAsync from '@/components/SelectAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';

import calculate from '@/utils/calculate';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import { useDispatch, useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import TextArea from 'antd/es/input/TextArea';
import styles from './styles.module.css'; // Import the CSS module
import { useNavigate, useParams } from 'react-router-dom';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import { erp } from '@/redux/erp/actions';

export default function RoleForm() {
  const { last_offer_number } = useSelector(selectFinanceSettings);
  return <LoadRoleForm />;
}

function LoadRoleForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translate = useLanguage();
  const { dateFormat } = useDate();
  // const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [form] = Form.useForm();
  const { id } = useParams();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const resetErp = {
    status: '',
    client: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };
  const [currentErp, setCurrentErp] = useState(current ?? resetErp);

  const onSubmit = (fieldsValue) => {
    let dataToUpdate = { ...fieldsValue };
    if (fieldsValue) {
      if (fieldsValue.date || fieldsValue.expiredDate) {
        dataToUpdate.date = dayjs(fieldsValue.date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        dataToUpdate.expiredDate = dayjs(fieldsValue.expiredDate).format(
          'YYYY-MM-DDTHH:mm:ss.SSSZ'
        );
      }
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        newList.map((item) => {
          item.total = item.quantity * item.price;
        });
        dataToUpdate.items = newList;
      }
    }

    // dispatch(erp.update({ entity, id, jsonData: dataToUpdate }));
    // navigate
  };
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
      if (formData.expiredDate) {
        formData.expiredDate = dayjs(formData.expiredDate);
      }
      if (!formData.taxRate) {
        formData.taxRate = 0;
      }

      const { subTotal } = formData;

      form.resetFields();
      form.setFieldsValue(formData);
    }
  }, [current]);
  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="company_id"
            label={translate('Company')}
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
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
      {/* <Divider dashed style={{ margin: 0, borderColor: 'gray' }} /> */}
      {/* Module Name and Module Actions */}
      <Row align="middle" className={styles.first_row}>
        <Col className="gutter-row" span={6} >
          <p className={styles.bold_text}>{translate('Module Name')}</p>
        </Col>
        <Col className={`${styles.custom_col} gutter-row`} span={12}>
          <p className={styles.bold_text}>{translate('Module Actions')}</p>
        </Col >
      </Row >
      {/* Saas Customer Level */}
      <Row align="middle" className={styles.middle_row}>
        <Col className="gutter-row" span={6}>
          {translate('SAAS Customer Module')}
        </Col>
        <Col className={`${styles.custom_col} gutter-row`} span={12}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_customer_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_customer_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_customer_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_customer_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_customer_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_customer_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_customer_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_customer_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/* Saas Reports Module */}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          {translate('SAAS Reports Module')}
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={12}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_report_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_report_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_report_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_report_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_report_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_report_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_report_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_report_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div >
            </div >
          </div >
        </Col >
      </Row >
      {/* SAAS Setting Module */}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          {translate('SAAS Setting Module')}
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={12}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_setting_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_setting_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_setting_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_setting_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_setting_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_setting_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'saas_setting_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'saas_setting_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div >
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Quotations Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Quotations Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'quotation_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'quotation_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'quotation_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'quotation_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'quotation_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'quotation_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'quotation_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'quotation_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'quotation_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'quotation_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Contract Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Contract Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'contract_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'contract_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'contract_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'contract_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'contract_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'contract_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'contract_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'contract_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'contract_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'contract_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Work Order Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Work Order Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'wo_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'wo_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'wo_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'wo_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'wo_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'wo_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'wo_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'wo_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'wo_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'wo_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Request Work Order Module (Rescheduled)*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Request Work Order Module (Rescheduled))') == "No translate" ? "Company Request Work Order Module (Rescheduled)" : translate('Company Request Work Order Module (Rescheduled))')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'rwo_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'rwo_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'rwo_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'rwo_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'rwo_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'rwo_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'rwo_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'rwo_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'rwo_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'rwo_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Request Work Order Module (Cancelled)*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Request Work Order Module (Cancelled))') == "No translate" ? "Company Request Work Order Module (Cancelled)" : translate('Company Request Work Order Module (Cancelled))')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cwo_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cwo_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cwo_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cwo_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cwo_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cwo_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cwo_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cwo_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cwo_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cwo_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Reports Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Reports Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'report_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'report_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'report_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'report_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'report_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'report_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'report_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'report_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'report_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'report_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company HR Setting Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company HR Setting Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cHR_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cHR_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cHR_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cHR_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cHR_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cHR_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cHR_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cHR_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cHR_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cHR_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Master Setting Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Master Setting Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cMS_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cMS_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cMS_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cMS_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cMS_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cMS_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cMS_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cMS_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'cMS_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'cMS_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Customers Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Customers Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'customer_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'customer_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'customer_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'customer_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'customer_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'customer_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'customer_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'customer_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'customer_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'customer_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Office User Module*/}
      < Row align="middle" className={styles.middle_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Office User Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'user_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'user_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'user_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'user_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'user_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'user_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'user_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'user_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'user_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'user_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >
      {/*  Company Field User Module*/}
      < Row align="middle" className={styles.last_row} >
        < Col className="gutter-row" span={6} >
          <p>{translate('Company Field User Module')}</p>
        </Col >
        <Col className={`${styles.custom_col} gutter-row`} span={18}>
          <div className={styles['permissions_container']}>
            <p className='m-0'>Check to add Permissions</p>
            <div className={styles['permissions_checkboxes']}>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'worker_list']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'worker_list'], e.target.checked)}>
                    {translate('View')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'worker_read']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'worker_read'], e.target.checked)}>
                    {translate('Read')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'worker_create']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'worker_create'], e.target.checked)}>
                    {translate('Create')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'worker_edit']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'worker_edit'], e.target.checked)}>
                    {translate('Edit')}
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.w_100px}>
                <Form.Item name={['permissions', 'worker_delete']} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
                  <Checkbox onChange={(e) => form.setFieldValue(['permissions', 'worker_delete'], e.target.checked)}>
                    {translate('Delete')}
                  </Checkbox>
                </Form.Item>
              </div>
            </div >
          </div >
        </Col >
      </Row >

      {/* <Divider dashed style={{ margin: 20 }} /> */}

      < div style={{ position: 'relative', width: ' 100%', float: 'right', margin: 20 }
      }>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button className="text-center" type="primary" htmlType="submit" icon={<PlusOutlined />} block onClick={onSubmit}>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div >
    </>
  );
}
