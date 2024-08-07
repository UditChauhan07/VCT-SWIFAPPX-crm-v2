// import { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Checkbox, Radio } from 'antd';
// // import { Radio, RadioGroup } from '@ant-design/react';

// import { PlusOutlined } from '@ant-design/icons';
// import AutoCompleteAsync from '@/components/AutoCompleteAsync';
// import { selectFinanceSettings } from '@/redux/settings/selectors';
// import { useDate } from '@/settings';
// import { useDispatch, useSelector } from 'react-redux';
// import useLanguage from '@/locale/useLanguage';
// import TextArea from 'antd/es/input/TextArea';
// import styles from './styles.module.css'; // Import the CSS module

// import { useNavigate, useParams } from 'react-router-dom';
// import { selectUpdatedItem } from '@/redux/erp/selectors';
// import { erp } from '@/redux/erp/actions';

// import { API_BASE_URL } from '@/config/serverApiConfig';

// let data = JSON.parse(localStorage.getItem('auth'))
// let user = data.current

// var role
// var adminLevel
// var permissions
// var isSAAS

// export default function RoleForm() {
//   const { last_offer_number } = useSelector(selectFinanceSettings);
//   return <LoadRoleForm />;
// }

// function LoadRoleForm({ isUpdateForm = false }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const translate = useLanguage();
//   const { dateFormat } = useDate();

//   const [form] = Form.useForm();
//   const { id } = useParams();
//   const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
//   const resetErp = {
//     status: '',
//   };
//   const [currentErp, setCurrentErp] = useState(current ?? resetErp);
//   var initialAdminLevel
//   // console.log(form.getFieldValue("is_worker"));

//   const [admin, setAdmin] = useState([]);
//   const [authUser, setAuthUser] = useState({});
//   useEffect(() => {
//     data = JSON.parse(localStorage.getItem('auth'))
//     user = data.current
//     setAuthUser(user)
//     setAdmin(user?.role_id)
//   }, [])

//   // role = admin?.role_id
//   role = user?.role_id

//   // role = admin?.role_id
//   adminLevel = role?.admin_level
//   isSAAS = role?.is_saas

//   // console.log({ isSAAS });

//   useEffect(() => {
//     if (isSuccess) {
//       form.resetFields();
//       dispatch(erp.resetAction({ actionType: 'update' }));
//       navigate(`/roles`);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     if (current) {
//       setCurrentErp(current);
//       let formData = { ...current };
//       if (formData.date) {
//         formData.date = dayjs(formData.date);
//       }
//       if (formData.admin_level) {
//         initialAdminLevel = formData.admin_level == 1 ? 'Swif SAAS Admin' : (formData.admin_level == 2 ? 'Service Provider' : 'End Customer')
//       }

//       // console.log("formData.is_worker", formData.is_worker);
//       // if (moduleAccessPermission) {
//       //   formData.is_worker = true
//       // }
//       // else {
//       //   formData.is_worker = false

//       // }
//       form.resetFields();
//       form.setFieldsValue(formData);
//       // console.log({ formData });
//     }
//   }, [current]);
//   // console.log(current);

//   // console.log({ current });

//   let entities = ['people', 'api_access', 'company', 'lead', 'client', 'client_address', 'offer', 'invoice', 'quote', 'contract', 'workorder', 'payment', 'product', 'product_category', 'expense', 'expense_category', 'admin', 'roles', 'payment_mode', 'taxes', 'pricing_model', 'subscription_type', 'service_category', 'service_list', 'public_holiday', 'worker']

//   // console.log('current?.admin_level --- ', current?.admin_level);
//   const [moduleAccessPermission, setModuleAccessPermission] = useState(true);
//   user?.current?.has_worker ? setModuleAccessPermission(false) : null;
//   form.setFieldValue("is_worker", true)
//   return (
//     <>
//       <Row gutter={[12, 0]}>
//         {/* <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="company_id"
//             label={translate('Company')}
//           >
//             <AutoCompleteAsync entity={'company'} displayLabels={['name']} searchFields={'name'} />
//           </Form.Item>
//         </Col> */}

//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             label={translate('Name')}
//             name="name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Name is required',
//               },
//               {
//                 min: 3,
//                 message: 'Name must be at least 3 characters',
//               },
//               {
//                 max: 30,
//                 message: 'Name must be at most 30 characters',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//         </Col>


//         <Col className="gutter-row" span={adminLevel == 1 ? 12 : 12}>
//           <Form.Item
//             label={translate('User Level')}
//             name="admin_level"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please Select User Level',
                
//               },
//             ]}
//           >
//             <Select>
//               {(adminLevel == 1) && (
//                 <Select.Option value="1">{translate('Swif SAAS Level')}</Select.Option>
//               )}
//               {(adminLevel <= 2) && (
//                 <Select.Option value="2">{translate('Service Provider')}</Select.Option>
//               )}
//               <Select.Option value="3">{translate('End Customer')}</Select.Option>
//             </Select>
//           </Form.Item>
//         </Col>
//         {/* {isSAAS == true && (<Col className="gutter-row" span={6}>
//           <Form.Item
//             label={translate('Is Default Role')}
//             name="is_default"
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select>
//               <Select.Option value="true">{translate('Yes')}</Select.Option>
//               <Select.Option value="false">{translate('No')}</Select.Option>
//             </Select>
//           </Form.Item>
//         </Col>)} */}

//       </Row>
//       <Row gutter={[12, 0]} >
//         <Col className="gutter-row" span={24}>
//           <Form.Item label={translate('Description')} name="description">
//             <TextArea rows={5} />
//           </Form.Item>
//         </Col>
//       </Row>
//       {/* Radio buttons */}
//       {/* {user?.current?.has_worker ? null : <Row gutter={[12, 0]} >
//         <Col className="gutter-row" span={24}>
//           <Form.Item
//             label={translate('Access Permission')}
//             name="is_worker"
//             initialValue={true}
//             rules={[
//               {
//                 required: true,
//                 message: translate('Please select an access permission'),
//               },
//             ]}
//           >
//             <Radio.Group defaultValue={moduleAccessPermission} onChange={(e) => {
//               setModuleAccessPermission(e.target.value);
//               form.setFieldValue("is_worker", e.target.value)
//             }
//             }>
//               <Radio value={true} style={{ marginRight: "5rem" }} defaultChecked={true}>{('API Access')}</Radio>
//               <Radio value={false}>{translate('Admin Panel Access')}</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>} */}

//       {(user?.current?.has_worker)}
//       {/* permissions */}
//       {/* {moduleAccessPermission === false ? */}
//       {/* <> */}

//       <Row gutter={[24, 0]}>
//         <Col className="gutter-row" span={12} style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
//           {translate('Permissions')}
//         </Col>

//       </Row>
//       <Row align="middle" className={styles.first_row}>
//         <Col className="gutter-row" span={6} >
//           <p className={styles.bold_text}>{translate('Module Name')}</p>
//         </Col>
//         <Col className={`${styles.custom_col} gutter-row`} span={12}>
//           <p className={styles.bold_text}>{translate('Module Actions')}</p>
//         </Col >
//       </Row >

//       {entities?.map((entity, key) => (
//         < Row align="middle" className={styles.middle_row} >
//           <Col className="gutter-row" span={6}>
//             {translate(entity[0].toUpperCase() +
//               entity.slice(1))}
//           </Col>
//           <Col className={`${styles.custom_col} gutter-row`} span={18}>
//             <div className={styles['permissions_container']}>
//               <p className='m-0'>Check to add Permissions</p>
//               <div className={styles['permissions_checkboxes']}>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `${entity}_list`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_list`], e.target.checked)}>
//                       {translate('List')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `${entity}_create`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_create`], e.target.checked)}>
//                       {translate('Create')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `${entity}_read`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={entity === 'admin' ? true : false}>
//                     <Checkbox disabled={entity === 'admin' ? true : false} onChange={(e) => form.setFieldValue(['permissions', `${entity}_read`], e.target.checked)}>
//                       {translate('Read')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
                
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `${entity}_edit`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_edit`], e.target.checked)}>
//                       {translate('Edit')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `${entity}_delete`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `${entity}_delete`], e.target.checked)}>
//                       {translate('Delete')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//               </div >
//             </div >
//           </Col >
//         </Row >
//       ))
//       }
//       {/* </> :
//         null
//       } */}
//       {/* {moduleAccessPermission === true ? <>
//         <Row gutter={[24, 0]}>
//           <Col className="gutter-row" span={12} style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
//             {translate('Permissions')}
//           </Col>

//         </Row>
//         <Row align="middle" className={styles.first_row}>
//           <Col className="gutter-row" span={6} >
//             <p className={styles.bold_text}>{translate('Module Name')}</p>
//           </Col>
//           <Col className={`${styles.custom_col} gutter-row`} span={12}>
//             <p className={styles.bold_text}>{translate('Module Actions')}</p>
//           </Col >
//         </Row >
//         < Row align="middle" className={styles.middle_row} >
//           <Col className="gutter-row" span={6}>
//             {translate("API Access")}
//           </Col>
//           <Col className={`${styles.custom_col} gutter-row`} span={18}>
//             <div className={styles['permissions_container']}>
//               <p className='m-0'>Check to add Permissions</p>
//               <div className={styles['permissions_checkboxes']}>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `API_list`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}  >
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `API_list`], e.target.checked)}>
//                       {translate('List')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `API_create`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `API_create`], e.target.checked)}>
//                       {translate('Create')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `API_read`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `API_read`], e.target.checked)}>
//                       {translate('Read')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `API_edit`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `API_edit`], e.target.checked)}>
//                       {translate('Edit')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//                 <div className={styles.w_100px}>
//                   <Form.Item name={['permissions', `API_delete`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
//                     <Checkbox onChange={(e) => form.setFieldValue(['permissions', `API_delete`], e.target.checked)}>
//                       {translate('Delete')}
//                     </Checkbox>
//                   </Form.Item>
//                 </div>
//               </div >
//             </div >
//           </Col >
//         </Row >
//       </> : null} */}
//       {/* Module Name and Module Actions */}

//       < div style={{ position: 'relative', width: ' 100%', marginTop: 30 }
//       }>
//         <Row gutter={[10, -20]}>
//           <Col className="gutter-row" span={5}>
//             <Form.Item style={{ marginTop: '16px' }}>
//               <Button className="text-center" type="primary" htmlType="submit" icon={<PlusOutlined />} block >
//                 {translate('Save')}
//               </Button>
//             </Form.Item>
//           </Col>
//         </Row>
//       </div >
//     </>
//   );
// }
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, Row, Col, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectUpdatedItem } from '@/redux/erp/selectors';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';
import styles from './styles.module.css'; // Import the CSS module

let data = JSON.parse(localStorage.getItem('auth'));
let user = data.current;


var role = user?.role_id;
var adminLevel = role?.admin_level;
var isSAAS = role?.is_saas;

export default function RoleForm() {
  const { last_offer_number } = useSelector(selectFinanceSettings);
  return <LoadRoleForm />;
}

function LoadRoleForm({ isUpdateForm = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translate = useLanguage();
  const { dateFormat } = useDate();

  const [form] = Form.useForm(); // Ensure useForm is properly used
  const { id } = useParams();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
 
  console.log(current)



  const resetErp = {
    status: '',
  };
  const [currentErp, setCurrentErp] = useState(current ?? resetErp);

  const [admin, setAdmin] = useState([]);
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    data = JSON.parse(localStorage.getItem('auth'));
    user = data.current;
    setAuthUser(user);
    setAdmin(user?.role_id);
  }, []);

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
      // Map the value back to the label
      if (formData.admin_level) {
        formData.admin_level = userLevels.find(item => item.value === formData.admin_level)?.label;
      }
      form.resetFields();
      form.setFieldsValue(formData);
    }
  }, [current]);


  let entities = [
    'people', 'api_access', 'company', 'lead', 'client', 'client_address', 'offer', 'invoice', 'quote', 'contract', 'workorder', 'payment', 'product', 'product_category', 'expense', 'expense_category', 'admin', 'roles', 'payment_mode', 'taxes', 'pricing_model', 'subscription_type', 'service_category', 'service_list', 'public_holiday', 'worker'
  ];

  const [moduleAccessPermission, setModuleAccessPermission] = useState(true);
  user?.current?.has_worker ? setModuleAccessPermission(false) : null;
  form.setFieldValue("is_worker", true);

  // Options for the Select component
  const userLevels = [
    { value: "1", label: 'Swif SAAS Level' },
    { value: "2", label: 'Service Provider' },
    { value: "3", label: 'End Customer'}
  ];

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            label={translate('Name')}
            name="name"
            rules={[
              {
                required: true,
                message: 'Name is required',
              },
              {
                min: 3,
                message: 'Name must be at least 3 characters',
              },
              {
                max: 30,
                message: 'Name must be at most 30 characters',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" 
        span={adminLevel == 1 ? 12 : 12}
        >
          <Form.Item
            label={translate('User Level')}
            name="admin_level"
            rules={[
              {
                required: true,
                message: 'Please Select User Level',
              },
            ]}
          >
            <Select >
              
              {userLevels.map(({ value, label }) => (
                <Select.Option key={value} 
                value={value}
                >{translate(label)}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item label={translate('Description')} name="description">
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>

      {(user?.current?.has_worker)}

      <Row gutter={[24, 0]}>
        <Col className="gutter-row" span={12} style={{ fontSize: '1.3rem', marginBottom: '15px' }}>
          {translate('Permissions')}
        </Col>
      </Row>
      <Row align="middle" className={styles.first_row}>
        <Col className="gutter-row" span={6} >
          <p className={styles.bold_text}>{translate('Module Name')}</p>
        </Col>
        <Col className={`${styles.custom_col} gutter-row`} span={12}>
          <p className={styles.bold_text}>{translate('Module Actions')}</p>
        </Col >
      </Row >

      {entities.map((entity, key) => (
        <Row align="middle" className={styles.middle_row} key={key}>
          <Col className="gutter-row" span={6}>
            {translate(entity[0].toUpperCase() + entity.slice(1))}
          </Col>
          <Col className={`${styles.custom_col} gutter-row`} span={18}>
            <div className={styles['permissions_container']}>
              <p className='m-0'>Check to add Permissions</p>
              <div className={styles['permissions_checkboxes']}>
                <div className={styles.w_100px}>
                  <Form.Item name={['permissions', `${entity}_list`]} valuePropName="checked" style={{ marginBottom: 0 }} initialValue={false}>
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
      ))}
      <div style={{ position: 'relative', width: '100%', marginTop: 30 }}>
        <Row gutter={[10, -20]}>
          <Col className="gutter-row" span={5}>
            <Form.Item style={{ marginTop: '16px' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={isLoading}
                onClick={() => form.submit()}
              >
                {isUpdateForm ? translate('Update') : translate('Save')}
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={3}>
            <Form.Item style={{ marginTop: '16px' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => {
                  navigate(`/roles`);
                }}
              >
                {translate('Cancel')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
