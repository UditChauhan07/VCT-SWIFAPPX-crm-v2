import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';

import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function CreateForm({ config, formElements, withUpload = false  }) {
  let { entity,  } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();
  const translate = useLanguage();

  const onSubmit = (fieldsValue) => {

    console.log("Form Submitted:", fieldsValue);
   
    if (fieldsValue.file && withUpload) {
      fieldsValue.file = fieldsValue.file[0].originFileObj;
    }

    const trimmedValues = Object.keys(fieldsValue).reduce((acc, key) => {
      acc[key] = typeof fieldsValue[key] === 'string' ? fieldsValue[key].trim() : fieldsValue[key];
      return acc;
    }, {});


    if (entity === 'clientaddress') {
      const ClientId = localStorage.getItem('key');
      dispatch(crud.create({ entity, jsonData: trimmedValues, id:ClientId, withUpload }));
    } else {
      dispatch(crud.create({ entity, jsonData: trimmedValues, withUpload }));
    }
        
    // dispatch(crud.create({ entity, jsonData: trimmedValues, withUpload   }));
  };



  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical"  onFinish={onSubmit}>
        {formElements}
        <Form.Item style={{ marginTop: '12%' }} >
          <Button type="primary" htmlType="submit" >
            {translate('Submit')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}
