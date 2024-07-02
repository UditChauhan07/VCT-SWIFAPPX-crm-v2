import { useState, useEffect, useRef } from 'react';

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
  const formRef = useRef(null);

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
      if (item) {
        if (item.offerPrice && item.quantity) {
          let offerTotal = calculate.multiply(item['quantity'], item['offerPrice']);
          subOfferTotal = calculate.add(subOfferTotal, offerTotal);
        }
        if (item.quantity && item.price) {
          let total = calculate.multiply(item['quantity'], item['price']);
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
      if (entity == 'roles' || entity == 'quote') {
        navigate(`/${entity}`);
      } else {
        navigate(`/${entity.toLowerCase()}/read/${result._id}`);
      }
    }
    return () => { };
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    console.log({ fieldsValue });
    const storedId = localStorage.getItem('SubscriptionId');
    // const WorkOrderstoredId = localStorage.getItem('Subscriptions');
    // const data = JSON.parse(WorkOrderstoredId);
    // const subscriptions = data.map((item) => item.subscription);
    // const subModules = data.map((item) => item.subModule);
    //  const serviceCost = data.map((item) => item.serviceCost)
    // const subscriptionString = subscriptions[0];
    // const subModuleString = subModules[0];

    if (fieldsValue) {
      if (entity === 'items') {
        let newList = [...fieldsValue.items];
        newList?.map((item) => {
          item.total = calculate.multiply(item.quantity, item.price);
        });
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
      }
      if (entity === 'servicelist') {
        let requestBody = {
          name: fieldsValue.name,
          serviceCategory: fieldsValue.serviceCategory,
          description: fieldsValue.description,
          subscriptions: [],
        };
        let lengthOfNameProperty = 0;
        for (let i = 0; i < 50; i++) {
          lengthOfNameProperty =
            lengthOfNameProperty +
            Object.keys(fieldsValue).filter((ele) => ele === `name${i}`).length;
        }

        for (let i = 0; i < Object.keys(fieldsValue).length - 4 - lengthOfNameProperty; i++) {
          let option = fieldsValue[i];
          console.log('option', option);
          let subscriptions = {
            subscription: option?.type,
            data: [],
          };
          for (let j = 0; j < Object.keys(option).length - 1; j++) {
            console.log('jiji', j);
            let price = option[`price${j}`];
            let name =
              fieldsValue[Object.keys(fieldsValue).filter((ele) => ele === `name${j}`)?.[0]];
            subscriptions.data.push({
              name: name,
              price: price?.toString(),
            });
          }
          requestBody.subscriptions.push(subscriptions);
        }

        fieldsValue = requestBody;
      }
      if (entity === 'workorder') {
        const Leader = {
          user: fieldsValue.LeadWorker,
          startTime: fieldsValue.startTime,
          endTime: fieldsValue.endTime,
          isLeader: true,
        };
        // const Worker = [
        //   {
        //     user: fieldsValue.SelectWorkers,
        //     startTime: fieldsValue.startTime,
        //     endTime: fieldsValue.endTime,
        //   },
        // ];
        const Worker = fieldsValue.SelectWorkers.map(workerId => ({
          user: workerId,
          startTime: fieldsValue.startTime,
          endTime: fieldsValue.endTime,
        }));


        const fielduser = [Leader, ...Worker];
        const startTime = new Date(fieldsValue.startTime).getTime();
        const expectedRequiredTime = new Date(fieldsValue.expectedRequiredTime).getTime();
        const EndTime = new Date(startTime + expectedRequiredTime).toISOString();
        fielduser.map((item) => {
          item.endTime = EndTime;
        });

        let additionalCost = {};
        let NewserviceCost = {};
        let serviceCostStr = localStorage.getItem('ServiceCostitem') || '{}';
        let additionalCostStr = localStorage.getItem('BQaBocV8yvv9ELm') || '{}';
        if (serviceCostStr) {
          NewserviceCost = JSON.parse(serviceCostStr);
        }
        if (additionalCostStr) {
          additionalCost = JSON.parse(additionalCostStr);
        }
        let grandTotal = localStorage.getItem('jv1GYkk6plxCpgx') || 0;
        let submodule = localStorage.getItem('WorkOrderSubId');

        let MyItems = {};

        let Items = localStorage.getItem('myItems');

        if (Items) {
          MyItems = JSON.parse(Items);
        }


        const WorkOrderstoredId = localStorage.getItem('Subscriptions');

        const subsdata = JSON.parse(WorkOrderstoredId);


        const subFinalData = subsdata[0];


        // const serviceCost = firstItem.serviceCost;
        // const subscription = firstItem.subscription;
        // const subModule = firstItem.subModule;

        const finalData = {
          // serviceCost: serviceCost,
          // subscription: subscription,
          // subModule: subModule,
        };
        const Tax = localStorage.getItem('TaxPercentage');

        const Customitem = JSON.parse(localStorage.getItem('CustomItems'));

        const CustomItemData = Customitem.map(item => ({
          item: item.name,
          quantity: item.qty,
          price: item.price,
          total: item.total,
          remarks: item.remarks
        }));

        const isCustommString = localStorage.getItem('IssCustomm');
        const isCustomm = JSON.parse(isCustommString);

        const SPC = localStorage.getItem('Salespersoncontact');
        const SalesPersonContact = JSON.parse(SPC);

        let Data = {
          client: fieldsValue.client,
          clientAddress: fieldsValue.clientAddress,
          billingAddress: fieldsValue.billingAddress,
          sendworkorderEmail: fieldsValue.sendQuotationEmail,
          salesPerson: fieldsValue.salesPerson,
          salesPersonContact: SalesPersonContact,
          startDate: fieldsValue.startDate,
          endDate: fieldsValue.endDate,
          startTime: fieldsValue.startTime,
          expectedRequiredTime: fieldsValue.expectedRequiredTime,
          serviceCategory: fieldsValue.serviceCategory,
          // serviceList: fieldsValue.serviceList,
          discount: fieldsValue.discount,
          isCustom: isCustomm,
          taxPercentage: Tax,
          adjustment: {
            type: fieldsValue.Adjustment,
            value: fieldsValue.AdjustmentValue,
          },
          subscription: subFinalData.subscription,
          // subModule: subFinalData.subModule,
          fieldUsers: fielduser,
          customService: {
            name: fieldsValue.ServiceName,
            price: fieldsValue.ServicePrice,
            description: fieldsValue.ServiceDescription,
          },
          items: MyItems,
          // items: fieldsValue.items,
          customItems: CustomItemData,
          remarks: fieldsValue.InitialRemarks,
          serviceCost: NewserviceCost,
          additionalCost,
          grandTotal,
          // ...(Array.isArray(fieldsValue.serviceList) ? { serviceList: fieldsValue.serviceList } : {}),
          ...(fieldsValue.serviceList !== 'custom' ? { serviceList: fieldsValue.serviceList } : {}),
          ...(subFinalData.subModule ? { subModule: subFinalData.subModule } : {})
        };
        console.log(Data);

        fieldsValue = Data;
      }



      if (entity === 'contract') {
        console.log(fieldsValue);


        const Leader = {
          user: fieldsValue.LeadWorker,
          startTime: fieldsValue.startTime,
          endTime: fieldsValue.endTime,
          isLeader: true,
        };
        // const Worker = [
        //   {
        //     user: fieldsValue.SelectWorkers,
        //     startTime: fieldsValue.startTime,
        //     endTime: fieldsValue.endTime,
        //   },
        // ];
        const Worker = fieldsValue.SelectWorkers.map(workerId => ({
          user: workerId,
          startTime: fieldsValue.startTime,
          endTime: fieldsValue.endTime,
        }));


        const fielduser = [Leader, ...Worker];
        const startTime = new Date(fieldsValue.startTime).getTime();
        const expectedRequiredTime = new Date(fieldsValue.expectedRequiredTime).getTime();
        const EndTime = new Date(startTime + expectedRequiredTime).toISOString();
        fielduser.map((item) => {
          item.endTime = EndTime;
        });

        let additionalCost = {};
        let NewserviceCost = {};
        let serviceCostStr = localStorage.getItem('ServiceCostitem') || '{}';
        let additionalCostStr = localStorage.getItem('BQaBocV8yvv9ELm') || '{}';
        if (serviceCostStr) {
          NewserviceCost = JSON.parse(serviceCostStr);
        }
        if (additionalCostStr) {
          additionalCost = JSON.parse(additionalCostStr);
        }
        let grandTotal = localStorage.getItem('jv1GYkk6plxCpgx') || 0;
        let submodule = localStorage.getItem('WorkOrderSubId');

        let MyItems = {};

        let Items = localStorage.getItem('myItems');

        if (Items) {
          MyItems = JSON.parse(Items);
        }


        const WorkOrderstoredId = localStorage.getItem('Subscriptions');

        const subsdata = JSON.parse(WorkOrderstoredId);


        const subFinalData = subsdata[0];


        // const serviceCost = firstItem.serviceCost;
        // const subscription = firstItem.subscription;
        // const subModule = firstItem.subModule;

        const finalData = {
          // serviceCost: serviceCost,
          // subscription: subscription,
          // subModule: subModule,
        };
        const Tax = localStorage.getItem('TaxPercentage');

        const Customitem = JSON.parse(localStorage.getItem('CustomItems'));

        const CustomItemData = Customitem.map(item => ({
          item: item.name,
          quantity: item.qty,
          price: item.price,
          total: item.total,
          remarks: item.remarks
        }));

        const isCustommString = localStorage.getItem('IssCustomm');
        const isCustomm = JSON.parse(isCustommString);

        let Data = {
          client: fieldsValue.client,
          clientAddress: fieldsValue.clientAddress,
          billingAddress: fieldsValue.billingAddress,
          sendworkorderEmail: fieldsValue.sendQuotationEmail,
          salesPerson: fieldsValue.salesPerson,
          salesPersonContact: fieldsValue.SalesPersonContact,
          startDate: fieldsValue.startDate,
          endDate: fieldsValue.endDate,
          startTime: fieldsValue.startTime,
          expectedRequiredTime: fieldsValue.expectedRequiredTime,
          serviceCategory: fieldsValue.serviceCategory,
          // serviceList: fieldsValue.serviceList,
          discount: fieldsValue.discount,
          isCustom: isCustomm,
          taxPercentage: Tax,
          adjustment: {
            type: fieldsValue.Adjustment,
            value: fieldsValue.AdjustmentValue,
          },
          subscription: subFinalData.subscription,
          // subModule: subFinalData.subModule,
          fieldUsers: fielduser,
          customService: {
            name: fieldsValue.ServiceName,
            price: fieldsValue.ServicePrice,
            description: fieldsValue.ServiceDescription,
          },
          items: MyItems,
          // items: fieldsValue.items,
          customItems: CustomItemData,
          remarks: fieldsValue.InitialRemarks,
          serviceCost: NewserviceCost,
          additionalCost,
          grandTotal,
          // ...(Array.isArray(fieldsValue.serviceList) ? { serviceList: fieldsValue.serviceList } : {}),
          ...(fieldsValue.serviceList !== 'custom' ? { serviceList: fieldsValue.serviceList } : {}),
          ...(subFinalData.subModule ? { subModule: subFinalData.subModule } : {})
        };
        console.log(Data);

        fieldsValue = Data;
      }



      if (entity === "quote") {

           
                const storedSubscriptions = JSON.parse(localStorage.getItem('Subscriptions')) || [];
                const WorkOrderstoredId = localStorage.getItem('Subscriptions');
                console.log(storedSubscriptions);
        
                const subsdata = JSON.parse(WorkOrderstoredId);
                const subFinalData = subsdata[0];
        
                let additionalCost = {};
                let serviceCostObj = {};
        
                let serviceCostStr = localStorage.getItem("ServiceCostitem") || "{}";
                if (serviceCostStr) {
                  serviceCostObj = JSON.parse(serviceCostStr);
                }
        
                let additionalCostStr = localStorage.getItem("BQaBocV8yvv9ELm") || "{}";
                if (additionalCostStr) {
                  additionalCost = JSON.parse(additionalCostStr);
                }
        
                // Calculate grandTotal
                let grandTotalStr = localStorage.getItem("jv1GYkk6plxCpgx") || "0";
                let grandTotal = parseFloat(grandTotalStr) || 0;
        
                // Update grandTotal by adding serviceCost and additionalCost
                // grandTotal += (serviceCostObj.totalPackageCost || 0) + (additionalCost.totalPackageCost || 0);
        
                let MyItems = {};
                let Items = localStorage.getItem('myItems');
                if (Items) {
                  MyItems = JSON.parse(Items);
                }
        
                const Customitem = JSON.parse(localStorage.getItem('CustomItems'));
                console.log({ Customitem });
        
                const CustomItemData = Customitem.map(item => ({
                  item: item.name,
                  quantity: item.qty,
                  price: item.price,
                  total: item.total,
                  // remarks: item.remarks
                }));
        
                console.log(CustomItemData);
                const Tax = localStorage.getItem('TaxPercentage');
                const discount = localStorage.getItem('discountValue');
        
                const isCustommString = localStorage.getItem('IssCustomm');
                const isCustomm = JSON.parse(isCustommString);
        
                const fieldData = {
                  client: fieldsValue.client,
                  clientAddress: fieldsValue.clientAddress,
                  billingAddress: fieldsValue.billingAddress,
                  sendQuotationEmail: fieldsValue.sendQuotationEmail,
                  startDate: fieldsValue.startDate,
                  expiredDate: fieldsValue.expiredDate,
                  startTime: fieldsValue.startTime,
                  expectedRequiredTime: fieldsValue.expectedRequiredTime,
                  salesPerson: fieldsValue.salesPerson,
                  salesPersonContact: fieldsValue.SalesPersonContact,
                  serviceCategory: fieldsValue.serviceCategory,
                  subscriptions: [...storedSubscriptions],
                  isCustom: isCustomm,
                  taxPercentage: Tax,
        
                  customService: {
                    name: fieldsValue.ServiceName,
                    price: fieldsValue.ServicePrice,
                    description: fieldsValue.ServiceDescription,
                  },
                  items: MyItems,
                  customItems: CustomItemData,
                  remarks: fieldsValue.InitialRemarks,
                  serviceCost: serviceCostObj,
                  additionalCost,
                  grandTotal, // Ensure grandTotal is included in the payload
                  ...(!isCustomm ? { serviceList: fieldsValue.serviceList } : {}),
                  ...(!isCustomm ? { subModule: subFinalData.subModule } : {}),
                  adjustment: {
                    type: fieldsValue.Adjustment,
                    value: fieldsValue.AdjustmentValue,
                  },
                  InitialRemarks: fieldsValue.InitialRemarks,
                };
                 console.log(fieldData);
                fieldsValue = fieldData;
              }



      dispatch(erp.create({ entity, jsonData: fieldsValue }));
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    if (errorFields && errorFields.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // if (entity === "roles" && errorFields && errorFields.length > 0) {
    // Scroll to the top of the page
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // }
  };

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={translate('New')}
        ghost={false}
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
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          ref={formRef}
          onValuesChange={handelValuesChange}
        >
          <CreateForm subTotal={subTotal} offerTotal={offerSubTotal} />
        </Form>
      </Loading>
    </>
  );
}
