import { Form, Input, Select } from 'antd';
import { UploadOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { message, Upload, Button, Switch } from 'antd';

import useLanguage from '@/locale/useLanguage';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/serverApiConfig';


console.log('url --- ', `${API_BASE_URL}roles / list ? page = 1 & items=10`);

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function AdminForm({ isUpdateForm = false }) {
  const [roleList, setRoleList] = useState([]);
  useEffect(() => {
    GetRoleDataHandler().then((res) => {
      setRoleList(res.result)
    }).catch((err) => {
      console.error({ err });
    })
  }, [])
  const GetRoleDataHandler = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(`${API_BASE_URL}roles/list?page=1&items=10`, {
      method: "GET",
      headers: headersList
    });

    let data = JSON.parse(await response.text());
    return data

  }
  // console.log('role --- ', role)
  // console.log('roleList --- ', roleList)

  const translate = useLanguage();
  return (
    <>
      <Form.Item
        label={translate('first Name')}
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={translate('last Name')}
        name="surname"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label={translate('email')}
        name="email"
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      {!isUpdateForm && (
        <Form.Item
          label={translate('Password')}
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}

      <Form.Item label={translate('enabled')} name="enabled" valuePropName={'checked'}>
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
      </Form.Item>


      {!isUpdateForm && (
        <Form.Item
          label={translate('Role')}
          name="role_id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="">
            {roleList.map((role, rKey) => (
              < Select.Option key={rKey} value={role._id} > {translate(role.name)}</Select.Option>
            ))}
          </Select>
        </Form.Item >
      )}

      {/* <Form.Item
        label={translate('Role')}
        name="role"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value="admin">{translate('admin_super_admin')}</Select.Option>
          <Select.Option value="staffAdmin">{translate('staff_admin_crud')}</Select.Option>
          <Select.Option value="staff">{translate('staff_cru')}</Select.Option>
          <Select.Option value="createOnly">{translate('create_and_read_only')}</Select.Option>
          <Select.Option value="readOnly">{translate('read_only')}</Select.Option>
        </Select>
      </Form.Item > */}

      {/* <Form.Item
        name="file"
        label={translate('Photo')}
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload beforeUpload={beforeUpload}>
          <Button icon={<UploadOutlined />}>{translate('click_to_upload')}</Button>
        </Upload>
      </Form.Item> */}
    </>
  );
}
