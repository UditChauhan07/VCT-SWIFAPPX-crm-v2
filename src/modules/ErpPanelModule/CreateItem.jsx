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

export default function CreateItem({ config, CreateForm })  {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(settingsAction.list({ entity: 'setting' }));
  }, []);
  let { entity } = config;


  const { isLoading, isSuccess, result } = useSelector(selectCreatedItem);

  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const [offerSubTotal, setOfferSubTotal] = useState(0);
  const handelValuesChange = (changedValues, values) => {
    const item = values['items'];
    let subTotal = 0;
    let subOfferTotal = 0;

    if (item) {
      // items.map((item) => {
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
      // });
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
    const storedId = localStorage.getItem('SubscriptionId');
    const WorkOrderstoredId = localStorage.getItem('WorkOrderSubId');
    console.log({ fieldsValue });
    if (fieldsValue) {

      if (entity === "items") {
        let newList = [...fieldsValue.items];
        newList.map((item) => {
          item.total = calculate.multiply(item.quantity, item.price);
        });
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
      }
      if (entity === "serviceCategory") {
        let requestBody = {
          name: fieldsValue.name,
          serviceCategory: fieldsValue.serviceCategory,
          description: fieldsValue.description,
          subscriptions: [],
        };
        let lengthOfNameProperty = 0;
        for (let i = 0; i < 50; i++) {
          lengthOfNameProperty = lengthOfNameProperty + Object.keys(fieldsValue).filter((ele) => ele === `name${i}`).length
        }
        // for (let i = 0; i < Object.keys(fieldsValue).length - 4; i++) {

        for (let i = 0; i < Object.keys(fieldsValue).length - 4 - lengthOfNameProperty; i++) {
          let option = fieldsValue[i];
          console.log("option", option);
          let subscriptions = {
            // Type: option.type,
            subscription: option?.type,
            data: []
          };
          for (let j = 0; j < Object.keys(option).length - 1; j++) {
            console.log("jiji", j);
            let price = option[`price${j}`];
            let name = fieldsValue[Object.keys(fieldsValue).filter((ele) => ele === `name${j}`)?.[0]];
            subscriptions.data.push({
              name: name,
              price: price?.toString()
            });
          }
          requestBody.subscriptions.push(subscriptions)
        }

        fieldsValue = requestBody;

      }
      if (entity === "workorder") {
          
        const Leader = {
          user: fieldsValue.LeadWorker,
          startTime: fieldsValue.startTime,
          endTime: fieldsValue.endTime,
          isLeader: true
        }
        const Worker = [
          {
            user: fieldsValue.SelectWorkers,
            startTime: fieldsValue.startTime,
            endTime: fieldsValue.endTime,
          }
        ]
        const fielduser = [
          Leader,
          ...Worker
        ];
        const startTime = new Date(fieldsValue.startTime).getTime();
        const expectedRequiredTime = new Date(fieldsValue.expectedRequiredTime).getTime();
        const EndTime = new Date(startTime + expectedRequiredTime).toISOString();
        fielduser.map((item) => {
          item.endTime = EndTime
        })

     

        let Data = {
          client: fieldsValue.client,
          clientAddress: fieldsValue.clientAddress,
          billingAddress: fieldsValue.billingAddress,
          sendworkorderEmail: fieldsValue.sendworkorderEmail,
          salesPerson: fieldsValue.salesPerson,
          salesPersonContact: fieldsValue.salesPersonContact,
          startDate: fieldsValue.startDate,
          endDate: fieldsValue.endDate,
          startTime: fieldsValue.startTime,
          expectedRequiredTime: fieldsValue.expectedRequiredTime,
          serviceCategory: fieldsValue.serviceCategory,
          serviceList: fieldsValue.serviceList,
          subscription: WorkOrderstoredId,
          fieldUsers: fielduser,
          customService: {
            name: fieldsValue.ServiceName,
            price: fieldsValue.ServicePrice,
            description: fieldsValue.ServiceDescription
          },

        items: fieldsValue.items,
        customItems: fieldsValue.customItems,
          remarks: fieldsValue.InitialRemarks
      }

        fieldsValue = Data
      }

      if (entity === "contract") {
        console.log(fieldsValue)
        const Leader = {
          user: fieldsValue.LeadWorker,
          startTime: fieldsValue.startTime,
          endTime: fieldsValue.endTime,
          isLeader: true
        }
        const Worker = [
          {
            user: fieldsValue.SelectWorkers,
            startTime: fieldsValue.startTime,
            endTime: fieldsValue.endTime,
          }
        ]
        const fielduser = [
          Leader,
          ...Worker
        ];
        const startTime = new Date(fieldsValue.startTime).getTime();
        const expectedRequiredTime = new Date(fieldsValue.expectedRequiredTime).getTime();
        const EndTime = new Date(startTime + expectedRequiredTime).toISOString();
        fielduser.map((item) => {
          item.endTime = EndTime
        })

       
        let Data = {
          client: fieldsValue.client,
          clientAddress: fieldsValue.clientAddress,
          billingAddress: fieldsValue.billingAddress,
          sendworkorderEmail: fieldsValue.sendworkorderEmail,
          salesPerson: fieldsValue.salesPerson,
          salesPersonContact: fieldsValue.salesPersonContact,
          startDate: fieldsValue.startDate,
          endDate: fieldsValue.endDate,
          startTime: fieldsValue.startTime,
          expectedRequiredTime: fieldsValue.expectedRequiredTime,
          serviceCategory: fieldsValue.serviceCategory,
          serviceList: fieldsValue.serviceList,
          subscription: storedId,
          fieldUsers: fielduser,
          customService: {
            name: fieldsValue.ServiceName,
            price: fieldsValue.ServicePrice,
            description: fieldsValue.ServiceDescription
          },
          items: fieldsValue.items,
          customItems: fieldsValue.customItems,
          remarks: fieldsValue.InitialRemarks,
          adjustment: {
            type: fieldsValue.Adjustment,
            value: fieldsValue.AdjustmentValue
          }
        }
        fieldsValue = Data
        // console.log(fieldsValue)
      }

      // console.log(fieldsValue)
      dispatch(erp.create({ entity, jsonData: fieldsValue }));
    };
  }

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
  );
}