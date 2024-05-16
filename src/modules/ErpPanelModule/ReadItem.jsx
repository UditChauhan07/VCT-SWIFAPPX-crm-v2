import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import { generate as uniqueId } from 'shortid';

import { selectCurrentItem } from '@/redux/erp/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import { displayName } from 'react-quill';
import color from '@/utils/color';
// import { tagColor } from '@/utils/statusTagColor';

const Item = ({ item }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });

  const { result: currentResult } = useSelector(selectCurrentItem);

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

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  console.log(currentErp)
  const [client, setClient] = useState({});
  const [Dates, setDates] = useState();


  useEffect(() => {
    if (currentResult) {
      const { items, invoice, ...others } = currentResult;

      if (items) {
        setItemsList(items);
        setCurrentErp(currentResult);
      } else if (invoice.items) {
        setItemsList(invoice.items);
        setCurrentErp({ ...invoice.items, ...others, ...invoice });
      }
    }
    return () => {
      setItemsList([]);
      setCurrentErp(resetErp);
    };
  }, [currentResult]);

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client[currentErp.client.type]);
    }
  }, [currentErp]);


 
  const date = new Date(currentErp.startDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  let daySuffix;
  if (day > 3 && day < 21) {
    daySuffix = 'th';
  } else {
    switch (day % 10) {
      case 1: daySuffix = 'st'; break;
      case 2: daySuffix = 'nd'; break;
      case 3: daySuffix = 'rd'; break;
      default: daySuffix = 'th';
    }
  }

  const Time = new Date(currentErp.startTime);
  const hours = Time.getHours();
  const minutes = Time.getMinutes().toString(); 
 
  const ExpectedTime = new Date(currentErp.expectedRequiredTime);
  const Expectedhours = ExpectedTime.getHours();
  const Expectedminutes = ExpectedTime.getMinutes().toString();
  
  function getStatusText(status) {
  
    switch (status) {
      case 1:
        return { text: 'Pending', color: '#fdf2ff', backgroundColor: 'blue' };
      case 2:
        return { text: 'In Process', color: '#fdf2ff', backgroundColor: 'green' };
      case 3:
        return { text: 'Completed', color: '#fdf2ff', backgroundColor: 'purple' };
      case 4:
        return { text: 'Rescheduled', color: '#fdf2ff', backgroundColor: 'orange' };
      case 5:
        return { text: 'Cancelled', color: '#fdf2ff', backgroundColor: 'red' };
      case 6:
        return { text: 'Request for Reshedule', color: '#fdf2ff', backgroundColor: 'brown' };
      case 7:
        return { text: 'Request for Cancel', color: '#fdf2ff', backgroundColor: 'gray' };
      case 8:
        return { text: 'Terminate', color: '#fdf2ff', backgroundColor: 'black' };
      case 9:
        return { text: 'Hold', color: '#fdf2ff', backgroundColor: 'yellow' };
      default:
        return { text: 'Pending', color: '#fdf2ff', backgroundColor: 'blue' };
    }
  }

  // const status = currentErp.status
  const { text: statusText, color: textColor, backgroundColor: bgColor } = getStatusText(currentErp.status);



 

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={` #${currentErp.code}`}
        ghost={false}
        // tags={[
        //   <Tag color={tagColor(currentErp.status)?.color} key="status">
        //     {currentErp.status && translate(currentErp.status)}
        //   </Tag>,
        //   currentErp.paymentStatus && (
        //     <Tag color={tagColor(currentErp.paymentStatus)?.color} key="paymentStatus">
        //       {currentErp.paymentStatus && translate(currentErp.paymentStatus)}
        //     </Tag>
        //   ),
        // ]}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              navigate(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            loading={mailInProgress}
            onClick={() => {
              send(currentErp._id);
            }}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.convert({ entity, id: currentErp._id }));
            }}
            icon={<RetweetOutlined />}
          // style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
          </Button>,

          // <Button
          //   key={`${uniqueId()}`}
          //   onClick={() => {
          //     dispatch(
          //       erp.currentAction({
          //         actionType: 'update',
          //         data: currentErp,
          //       })
          //     );
          //     navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
          //   }}
          //   type="primary"
          //   icon={<EditOutlined />}
          // >
          //   {translate('Edit')}
          // </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        {/* <Row>
          <Statistic title="Status" value={currentErp.status} />
          <Statistic
            title={translate('SubTotal')}
            value={moneyFormatter({ amount: currentErp.subTotal })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Total')}
            value={moneyFormatter({ amount: currentErp.total })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title={translate('Balance')}
            value={moneyFormatter({ amount: currentErp.credit })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row> */}
      </PageHeader>
      {/* <Divider dashed /> */}

      <h3 className='' style={{ marginLeft: "5px" }}>Customer Details</h3>
      <Row className="gutter-row">
        <Col span={24}>

          <div className='' style={{ width: "100%", border: "1px solid rgb(240,240,240)", height: "250px", borderRadius: "5px", boxShadow: "0px 0px 0px 1px rgb(240,240,240)" }}>

            <Row gutter={[12 - 12]} style={{ padding: "0px 0px 0px 20px" }}>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>{translate('Bill To')} :<br/>

                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Mr/Mrs. {currentErp.client.name}</span><br />
                 
                  </p>
                  

              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>{translate('Client Address')} :<br></br>

                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Mob: {currentErp.clientAddress.contactNumber}</span><br />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Address: {currentErp.clientAddress.block}, {currentErp.billingAddress.street},{currentErp.billingAddress.state}</span><br />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Zipcode: {currentErp.clientAddress.zipCode}</span><br />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Country: {currentErp.clientAddress.country}</span><br />
                </p>

              </Col>
              <Col className="gutter-row" span={12} style={{marginTop:"-6%"}}>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>{translate('Billing Address')} :<br></br>

                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Mob: {currentErp.billingAddress.contactNumber}</span><br />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Address: {currentErp.billingAddress.block}, {currentErp.billingAddress.street},{currentErp.billingAddress.state}</span><br/>
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Zipcode: {currentErp.billingAddress.zipCode}</span><br />
                  <span style={{ fontSize: "14px", color: "#a3a3a3" }}>Country: {currentErp.billingAddress.country}</span><br />
                </p>

              </Col>

              {/* <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }}>
                  {translate('Contact Person')} :<br></br>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}>Tel: {currentErp.clientAddress.contactNumber}</span>
                </p>


              </Col> */}


              {/* <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }} >
                  {translate('Bill To Contact')} :<br></br>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}> Name: {currentErp.billingAddress.contactPerson}</span><br/>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}> Tel: {currentErp.billingAddress.contactNumber}</span><br/>

                </p>

              </Col> */}

              {/* <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }}>
                  {translate('Work Site Contact')} :<br></br>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}> Tel: 46747474</span>
                </p>


              </Col> */}


              {/* <Col className="gutter-row" span={12} >
                <p style={{ fontSize: "15px" }}>{translate('Billing Address')} :
                  <br></br>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}>{currentErp.billingAddress.block},</span>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}>{currentErp.billingAddress.street},</span>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}>{currentErp.billingAddress.state},</span>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}>{currentErp.billingAddress.zipCode}</span>
                </p>

              </Col> */}
              {/* <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }}>
                  {translate('Work Address')} :<br></br>
                  <span style={{ fontSize: "13px", color: "#a3a3a3" }}> block,street,unit,Armenia,2662</span>
                </p>


              </Col> */}

            </Row>
          </div>

        </Col >


      </Row >


      {/* <Row className="gutter-row" style={{ marginTop: "20px" }}>
        <Col span={12}>
          <h3>Basic WorkOrder Details</h3>
         

        </Col>
        <Col span={12}>
          <h3>WorkOrder Details</h3>
          <div className='' style={{ width: "100%", border: "1px solid rgb(240,240,240)", height: "240px", borderRadius: "5px", boxShadow: "0px 0px 0px 1px rgb(240,240,240)" }}>

          </div>

        </Col>

      </Row> */}



      <h3 style={{marginTop: "4%"}}>Basic WorkOrder Details</h3>
      <Row className="gutter-row">
        <Col span={24}>
          <div className='' style={{ width: "100%", border: "1px solid rgb(240,240,240)", height: "260px", borderRadius: "5px", boxShadow: "0px 0px 0px 1px rgb(240,240,240)" }}>
            <Row className="gutter-row" style={{ padding: "0px 0px 0px 20px" }}>
              <Col span={12}>
                <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Workorder No')} .:<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{currentErp.workOrderNumber}<br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Workorder Status')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{
                      fontSize: "14px", fontWeight: "600", color:
                        textColor, backgroundColor: bgColor, width: "90px",
                      textAlign: "center", padding: "4px 4px 4px 4px", borderRadius: "14px"
                    }}>
                      {statusText} <br></br>
                    </p>

                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Start Date')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{`${day}${daySuffix} ${month} ${year}` }<br></br>
                    </p>


                  </Col>
                </Row>
                <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Start Time')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{`${hours}:${minutes} hrs`} <br></br>
                    </p>


                  </Col>
                </Row>
               
              </Col>

              <Col span={12}>
               

                <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Expected Time Required')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{`${Expectedhours}:${Expectedminutes} hrs`}  <br></br>
                    </p>


                  </Col>
                </Row>

                <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Sales Person')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{currentErp.salesPerson.name} <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600", marginTop: "19px" }}>{translate('Sales Person Contact')} :<br></br>
                    </p> </Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{currentErp.salesPersonContact} <br></br></p>

                  </Col>
                </Row>

                {/* <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Work Leader')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{translate('Test Leader')} <br></br>
                    </p>


                  </Col>
                </Row> */}
                {/* <Row className="gutter-row" >
                  <Col span={12}>
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Workers')} :<br></br>
                    </p></Col>
                  <Col span={12}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#a3a3a3", marginTop: "19px" }}>{translate('Alfreda Byers,Carly Alvarez')} <br></br>
                    </p>


                  </Col>
                </Row> */}
              </Col>
            </Row>
          </div>


        </Col>

      </Row>
      {/* ................. */}
      <h3>WorkOrder Billing Detail</h3>
      <Row className="gutter-row" style={{ marginTop: "20px" }}>
        <Col span={24}>
          <div className='' style={{ width: "100%", border: "1px solid rgb(240,240,240)", height: "360px", borderRadius: "5px", boxShadow: "0px 0px 0px 1px rgb(240,240,240)" }}>

            <Row gutter={[12 - 12]} style={{ padding: "0px 0px 0px 20px" }}>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Workorder For')} :<br></br>
                </p>

              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "14px", color: "#a3a3a3" }}>
                  {translate('Lawn Care:One Time')} <br></br>

                </p>


              </Col>


              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }} >
                  {translate('Per Workorder Cost')} :<br></br>

                </p> </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "14px", color: "#a3a3a3" }} >
                  {translate('300.00 /Workorder')} <br></br>
                </p> </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }}>
                  {translate('Adjustment')} :<br></br>

                </p> </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "14px", color: "#a3a3a3" }}>
                  {translate(`${(+10.00)}`)} <br></br>

                </p> </Col>


              <Col className="gutter-row" span={12} >
                <p style={{ fontSize: "15px" }}>{translate(`Discount1`)} :
                  <br></br>

                </p>

              </Col>
              <Col className="gutter-row" span={12} >
                <p style={{ fontSize: "14px", color: "#a3a3a3" }}>{translate('3.06')}
                  <br></br>

                </p>

              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }}>
                  {translate('Package SubTotal')} :<br></br>

                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "14px", color: "#a3a3a3" }}>
                  {translate('306.90/One Time')} <br></br>

                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <sp style={{ fontSize: "15px" }}>
                  {translate('Tax 20')} :<br></br>

                </sp>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "14px", color: "#a3a3a3" }}>
                  {translate('61.38')} <br></br>

                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "15px" }}>
                  {translate('Total Package Cost')} :<br></br>

                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: "14px", color: "#a3a3a3" }}>
                  {translate('368.28/One Time')} <br></br>

                </p>
              </Col>

            </Row>
          </div>
        </Col>
      </Row>
     
      




      <h3>Basic Attendence Details</h3>
      <Row className="gutter-row">
        <Col span={24}>
          <div className='' style={{ width: "100%", border: "1px solid rgb(240,240,240)", height: "400px", borderRadius: "5px", boxShadow: "0px 0px 0px 1px rgb(240,240,240)" }}>
            <Row className="gutter-row" style={{ padding: "0px 0px 0px 20px", marginTop: "20px" }}>
              <Col span={[8]}>
                <Col className="gutter-row" span={12}>
                  <p style={{ fontSize: "15px", fontWeight: "600" }}>{translate('Attendance Type')}:<br></br>
                  </p></Col>
              </Col>
              <Col span={[12]}>
                <Col className="gutter-row" span={12}>
                  <p style={{ fontSize: "15px", fontWeight: "600",  marginLeft:"-33%"}}>{translate('Independent Attendance')} <br></br>
                  </p></Col>
              
               
              </Col>
            </Row>
            <div className='' style={{ width: "98%", border: "1px solid rgb(240,240,240)", height: "300px", borderRadius: "0px", boxShadow: "0px 0px 0px 1px #0e0e0e", marginLeft:"1%"}}>
            <Row className="gutter-row" style={{ padding: "0px 0px 0px 0px", marginTop: "10px" }}>
             
                  <Col span={24} >
                  <Row style={{ padding: "0px 0px 0px 20px" }}>
                    <Col span={6}>
                      <p style={{ fontSize: "15px", fontWeight: "600",  }}>{translate('Worker')} <br></br>
                    </p>
                    </Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Expected Time')} <br></br>
                    </p></Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Actual Time')} <br></br>
                    </p></Col>
                    

                    <Col span={6}>
                      <Row style={{ padding: "0px 0px 0px 20px" }}>
                        <Col span={4}>
                          <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Status')} <br></br>
                          </p>
                      </Col>
                        {/* <Col span={2}>
                          4
                        </Col> */}
                    </Row >
                    </Col>
                    </Row>
                    <hr ></hr>
                  <Row style={{ padding: "0px 0px 0px 20px" }}>
                    <Col span={6}>
                      <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Test Leader')} <br></br>
                        <span style={{ fontSize: "12px", color:"#7928dd"}}>Leader</span>
                      </p>
                    
                    </Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}>09:00 AM-01:00 PM <br></br>
                    </p></Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}> <br></br>
                    </p></Col>


                    <Col span={6}>
                      <Row>
                        <Col span={4}>
                          <p style={{
                            fontSize: "14px", fontWeight: "600", color:
                              "#fdf2ff", backgroundColor: "#faad09", width: "90px",
                            textAlign: "center", padding: "4px 4px 4px 4px", borderRadius: "14px"
                          }}>
                            {translate('Scheduled')} <br></br>
                          </p>
                        </Col>
                        {/* <Col span={2}>
                          4
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                  <hr></hr>
                  <Row style={{ padding: "0px 0px 0px 20px" }} >
                    <Col span={6}>
                      <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Alfreda Byers')} <br></br>
                      </p>
                    </Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}>09:00 AM-01:00 PM <br></br>
                    </p></Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}><br></br>
                    </p></Col>


                    <Col span={6}>
                      <Row>
                        <Col span={4}>
                          <p style={{
                            fontSize: "14px", fontWeight: "600", color:
                              "#fdf2ff", backgroundColor: "#faad09", width: "90px",
                            textAlign: "center", padding: "4px 4px 4px 4px", borderRadius: "14px"
                          }}>
                            {translate('Scheduled')} <br></br>
                          </p>
                        </Col>
                        {/* <Col span={2}>
                          4
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                  <hr></hr>
                  <Row style={{ padding: "0px 0px 0px 20px" }}>
                    <Col span={6}>
                      <p style={{ fontSize: "15px", fontWeight: "600", }}>{translate('Carly Alvarez')} <br></br>
                      </p>
                    </Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}>09:00 AM-01:00 PM<br></br>
                    </p></Col>
                    <Col span={6}> <p style={{ fontSize: "15px", fontWeight: "600", }}>05:30 AM<br></br>
                    </p></Col>


                    <Col span={6}>
                      <Row>
                        <Col span={4}>
                          <p style={{
                            fontSize: "14px", fontWeight: "600", color:
                              "#fdf2ff", backgroundColor: "#1963b5", width: "90px",
                            textAlign: "center", padding: "4px 4px 4px 4px", borderRadius: "14px"
                          }}>
                            {translate('In-Progress')} <br></br>
                          </p>
                        </Col>
                        {/* <Col span={2}>
                          4
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>
                  </Col>

              </Row>
              </div>
                

              
            
          </div>


        </Col>

      </Row>


      <Row gutter={[12, 0]} style={{ marginTop: "20px" }}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>{translate('Product')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Price')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Quantity')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>{translate('Total')}</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {
        itemslist.map((item) => (
          <Item key={item._id} item={item}></Item>
        ))
      }
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>{translate('Sub Total')} :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.subTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {translate('Tax Total')} ({currentErp.taxRate} %) :
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.taxTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{translate('Total')} :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.total })}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
