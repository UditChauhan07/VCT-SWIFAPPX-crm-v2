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


export default function CompanyForm() {
  const { last_offer_number } = useSelector(selectFinanceSettings);
  return <LoadCompanyForm />;
}

function LoadCompanyForm() {
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
    dispatch(erp.update({ entity: 'roles', id, jsonData: dataToUpdate }));
    navigate("/roles")
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
      {/* <Row gutter={[12, 0]}>
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
          <Form.Item label={translate('Name')} //name="name" rules={[
            {
              required: true,
            },
          ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row> */}
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <div className={styles.headings}>
            <p className={styles.bold_text}>Company Super Admin Details</p>
          </div>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            //name="first_name"
            label={translate('First Name')}
            rules={[
              {
                required: true,
              },
              {
                type: 'string'
              }
            ]}
          ><Input placeholder='Enter Super Admin First Name' />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Address')} //name="name" 
            rules={[
              {
                type: 'string'
              },
              // {
              //   required: true,
              // },
            ]}>
            <Input placeholder='Enter Super Admin Address' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            //name="first_name"
            label={translate('LAst Name')}
            rules={[
              {
                type: 'string'
              },
              {
                required: true,
              },
            ]}
          ><Input placeholder='Enter Super Admin Last Name' />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('City')} //name="name" 
            rules={[
              {
                type: 'string'
              },
              // {
              //   required: true,
              // },
            ]}>
            <Input placeholder="Enter Super Admin Address's City" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            //name="first_name"
            label={translate('Profile Picture')}
            rules={[
              // {
              //   required: true,
              // },
              // {
              //   type: 'string'
              // }
            ]}
          ><Input type='file' />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('State')} //name="name" 
            rules={[
              {
                type: 'string'
              },
              // {
              //   required: true,
              // },
            ]}>
            <Input placeholder="Enter Super Admin Address's state" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            //name="first_name"
            label={translate('Contact Number')}
            rules={[
              {
                required: true,
              },
              {
                type: 'phone'
              }
            ]}
          ><Input placeholder="Enter Super Admin Contact Number" />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('COuntry')} //name="name" 
            rules={[
              {
                type: 'string'
              },
              // {
              //   required: true,
              // },
            ]}>
            <Input placeholder="Enter Super Admin Address's state" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            //name="first_name"
            label={translate('Email Address/Username')}
            rules={[
              {
                required: true,
              },
              {
                type: 'email'
              }
            ]}
          ><Input placeholder="Enter Super Admin Email Address/Username" />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('ZIP/Postal Code')} //name="name" 
            rules={[
              {
                type: 'number'
              },
              // {
              //   required: true,
              // },
            ]}>
            <Input placeholder="Enter Super Admin Address's Zip" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            //name="first_name"
            label={translate('Admin Password')}
            rules={[
              {
                required: true,
                type: 'password'
              }
            ]}
          >
            <Input type='password' placeholder="Enter SuperAdmin Password" />
          </Form.Item>
        </Col>

      </Row>


      {/* <Divider dashed style={{ margin: 0, borderColor: 'gray' }} /> */}

      {/* <Divider dashed style={{ margin: 20 }} /> */}

      < div style={{ position: 'relative', width: ' 100%', float: 'right', margin: 20 }
      }>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              {/* <Button className="text-center" type="primary" htmlType="submit" icon={<PlusOutlined />} block onClick={onSubmit}>

                {translate('Save')}
              </Button> */}
            </Form.Item>
          </Col>
        </Row>
      </div >
    </>
  );
}