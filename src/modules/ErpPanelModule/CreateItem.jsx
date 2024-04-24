import { useState, useEffect } from 'react';

import { Button, Tag, Form, Divider } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';

import useLanguage from '@/locale/useLanguage';

import { settingsAction } from '@/redux/settings/actions';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';

import calculate from '@/utils/calculate';
import { generate as uniqueId } from 'shortid';

import Loading from '@/components/Loading';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

function SaveForm({ form }) {
  const translate = useLanguage();
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {translate('Save')}
    </Button>
  );
}

export default function CreateItem({ config, CreateForm }) {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);
  let { entity } = config;
  console.log(config)

  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const [offerSubTotal, setOfferSubTotal] = useState(0);
  const handelValuesChange = (changedValues, values) => {
    const items = values['items'];
    let subTotal = 0;
    let subOfferTotal = 0;

    if (items) {
      items.map((item) => {
        if (item) {
          if (item.offerPrice && item.quantity) {
            let offerTotal = calculate.multiply(item['quantity'], item['offerPrice']);
            subOfferTotal = calculate.add(subOfferTotal, offerTotal);
          }
          if (item.quantity && item.price) {
            let total = calculate.multiply(item['quantity'], item['price']);
            //sub total
            subTotal = calculate.add(subTotal, total);
          }
        }
      });
      setSubTotal(subTotal);
      setOfferSubTotal(subOfferTotal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'create' }));
      setSubTotal(0);
      setOfferSubTotal(0);
      if (entity == 'roles') {
        navigate(`/${entity}`);
      }
      else {
        navigate(`/${entity.toLowerCase()}/read/${result._id}`);
      }
    }
    return () => { };
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    // console.log({ fieldsValue });
    if (fieldsValue) {
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        newList.map((item) => {
          item.total = calculate.multiply(item.quantity, item.price);
        });
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
      }
      if (fieldsValue.servicecategory) {
        console.log('10tty', { fieldsValue });
        let requestBody = {
          name: fieldsValue.name,
          servicecategory: fieldsValue.servicecategory,
          description: fieldsValue.description,
          subscriptionType: [],
        };
        // for (let i = 0; i < Object.keys(fieldsValue).length - 4; i++) {
        //   let option = fieldsValue[i];
        //   let subscriptionType = {
        //     Type: option.type, 
        //     data: []
        //   };
        //   for (let j = 0; j < Object.keys(option).length - 1; j++) {
        //     let price = option[j].price;
        //     let name = option[j].name;
        //     subscriptionType.data.push({
        //       name: name,
        //       price: price.toString()
        //     });
        //   }
        //   requestBody.subscriptionType.push(subscriptionType)
        // }

        fieldsValue = requestBody;

      }
    }
    console.log(fieldsValue)
    dispatch(erp.create({ entity, jsonData: fieldsValue }));
  };

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={translate('New')}
        ghost={false}
        // tags={entity != 'roles' ? <Tag>{translate('Draft')}</Tag> : ''}
        // subTitle="This is create page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Cancel')}
          </Button>,
          <SaveForm form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} onValuesChange={handelValuesChange}>
          <CreateForm subTotal={subTotal} offerTotal={offerSubTotal} />
        </Form>
      </Loading>
    </>
  );6
}
