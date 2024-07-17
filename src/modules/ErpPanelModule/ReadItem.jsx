import { useState, useEffect } from 'react';
import { Divider,Tooltip } from 'antd';

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
import { current } from '@reduxjs/toolkit';
import Element from 'antd/es/skeleton/Element';
// import { tagColor } from '@/utils/statusTagColor';

const Item = ({ item }) => {
  const RemarksComponent = ({ remarks }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    const renderRemarks = (remarks) => {
      if (remarks.length > 10) {
        return (
          <Tooltip title={remarks}>
            <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {remarks.substring(0, 12)}...
            </span>
          </Tooltip>
        );
      }
      return remarks;
    };
  
    return (
      <p
        style={{
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        {renderRemarks(remarks)}
      </p>
    );
  };

  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={5}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.item.name}</strong>
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
          {item.qty}
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
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {/* {item.remarks} */}
          <RemarksComponent remarks={item.remarks} />
          {/* {moneyFormatter({ amount: item.remark })} */}
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
  console.log(currentErp);
  const [client, setClient] = useState({});


  const additionalCost = currentErp.additionalCost.totalPackageCost;
  const serviceCost = currentErp.serviceCost.totalPackageCost;
  const grandTotal = additionalCost + serviceCost;


  useEffect(() => {
    if (currentResult) {
      const { items, invoice, customItems, ...others } = currentResult;

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
      case 1:
        daySuffix = 'st';
        break;
      case 2:
        daySuffix = 'nd';
        break;
      case 3:
        daySuffix = 'rd';
        break;
      default:
        daySuffix = 'th';
    }
  }

  const Time = new Date(currentErp.startTime);
  const hours = Time.getHours();
  const minutes = Time.getMinutes().toString();

  // const ExpectedTime = new Date(currentErp.expectedRequiredTime);
  // const Expectedhours = ExpectedTime.getHours();
  // const Expectedminutes = ExpectedTime.getMinutes().toString();

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

  const {
    text: statusText,
    color: textColor,
    backgroundColor: bgColor,
  } = getStatusText(currentErp.status);

  const Createddate = new Date(currentErp.created);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const Createdday = Createddate.getDate();
  const Createdmonth = monthNames[Createddate.getMonth()];
  const Createdyear = Createddate.getFullYear();
  const Createdhours = Createddate.getHours();
  const Createdminutes = Createddate.getMinutes();
  const Createdseconds = Createddate.getSeconds();

  const CreatedformattedDate = ` ${Createdday} ${Createdmonth}, ${Createdyear} ${Createdhours}:${Createdminutes}:${Createdseconds}`;

  const renderItems = currentErp.customItems.map((item) => {
    const remarks = item.remarks || '';
    const truncatedRemarks = remarks.length > 12 ? `${remarks.substring(0, 12)}...` : remarks;
  
    
    return (
      <Row gutter={[12, 0]} key={item._id}>
        <Col className="gutter-row" span={5}>
          <p style={{ marginBottom: 5 }}>
            <strong>{item.item}</strong>
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
        <Col className="gutter-row" span={5}>
          <Tooltip title={remarks}>
            <p
              style={{
                textAlign: 'right',
                fontWeight: '700',
              }}
            >
              {truncatedRemarks}
            </p>
          </Tooltip>
        </Col>
        <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
      </Row>
    );
  });
  
  const formattedTime = new Date(0, 0, 0, hours, minutes);
  let formattedHours = formattedTime.getHours();

  // Convert hours to 12-hour format
  const ampm = formattedHours >= 12 ? 'PM' : 'AM';
  formattedHours = formattedHours % 12;
  formattedHours = formattedHours ? formattedHours : 12; // Handle midnight (0 hours)

  // Construct the formatted time string
  const formattedTimeString = `${formattedHours}:${('0' + minutes).slice(-2)} ${ampm}`;
  // ...............................

  const ExpectedTime = new Date(0, 0, 0, hours, minutes);
  let Expectedhours = ExpectedTime.getHours();

  // Convert hours to 12-hour format
  const hrs = Expectedhours >= 12 ? 'hrs' : 'hrs';
  formattedHours = Expectedhours % 12;
  Expectedhours = Expectedhours ? Expectedhours : 12; // Handle midnight (0 hours)

  // Construct the formatted time string
  const ExpectedTimeString = `${Expectedhours}:${('0' + minutes).slice(-2)} ${hrs}`;




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
        extra={
          [
            // <Button
            //   key={`${uniqueId()}`}
            //   onClick={() => {
            //     navigate(`/${entity.toLowerCase()}`);
            //   }}
            //   icon={<CloseCircleOutlined />}
            // >
            //   {translate('Close')}
            // </Button>,
            // <Button
            //   key={`${uniqueId()}`}
            //   onClick={() => {
            //     window.open(
            //       `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
            //       '_blank'
            //     );
            //   }}
            //   icon={<FilePdfOutlined />}
            // >
            //   {translate('Download PDF')}
            // </Button>,
            // <Button
            //   key={`${uniqueId()}`}
            //   loading={mailInProgress}
            //   onClick={() => {
            //     send(currentErp._id);
            //   }}
            //   icon={<MailOutlined />}
            // >
            //   {translate('Send by Email')}
            // </Button>,
            // <Button
            //   key={`${uniqueId()}`}
            //   onClick={() => {
            //     dispatch(erp.convert({ entity, id: currentErp._id }));
            //   }}
            //   icon={<RetweetOutlined />}
            // >
            //   {translate('Convert to Invoice')}
            // </Button>,
          ]
        }
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>

      <h2 className="" style={{ marginLeft: '5px' }}>
        Customer Details
      </h2>
      <Row className="gutter-row">
        <Col span={24}>
          <div
            className=""
            style={{
              width: '100%',
              border: '1px solid rgb(240,240,240)',
              height: '250px',
              borderRadius: '5px',
              boxShadow: '0px 0px 0px 1px rgb(240,240,240)',
            }}
          >
            <Row gutter={[12 - 12]} style={{ padding: '0px 0px 0px 20px' }}>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>
                  {translate('Bill To')} :<br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    {currentErp.client.name}
                  </span>
                  <br />
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>
                  {translate('Client Address')} :<br></br>
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Mob: {currentErp.clientAddress.contactNumber}
                  </span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Address: {currentErp.clientAddress.block}, {currentErp.billingAddress.street},
                    {currentErp.billingAddress.state}
                  </span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Zipcode: {currentErp.clientAddress.zipCode}
                  </span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Country: {currentErp.clientAddress.country}
                  </span>
                  <br />
                </p>
              </Col>
              <Col className="gutter-row" span={12} style={{ marginTop: '-6%' }}>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>
                  {translate('Billing Address')} :<br></br>
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Mob: {currentErp.billingAddress.contactNumber}
                  </span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Address: {currentErp.billingAddress.block}, {currentErp.billingAddress.street},
                    {currentErp.billingAddress.state}
                  </span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Zipcode: {currentErp.billingAddress.zipCode}
                  </span>
                  <br />
                  <span style={{ fontSize: '14px', color: '#a3a3a3' }}>
                    Country: {currentErp.billingAddress.country}
                  </span>
                  <br />
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <h2 style={{ marginTop: '4%' }}>Basic WorkOrder Details</h2>
      <Row className="gutter-row">
        <Col span={24}>
          <div
            className=""
            style={{
              width: '100%',
              border: '1px solid rgb(240,240,240)',
              height: '260px',
              borderRadius: '5px',
              boxShadow: '0px 0px 0px 1px rgb(240,240,240)',
            }}
          >
            <Row className="gutter-row" style={{ padding: '0px 0px 0px 20px' }}>
              <Col span={12}>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Workorder No')} .:<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {currentErp.workOrderNumber}
                      <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Workorder Status')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: textColor,
                        backgroundColor: bgColor,
                        width: '90px',
                        textAlign: 'center',
                        padding: '4px 4px 4px 4px',
                        borderRadius: '14px',
                      }}
                    >
                      {statusText} <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Start Date')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {`${day}${daySuffix} ${month} ${year}`}
                      <br></br>
                    </p>
                  </Col>
                </Row>

                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Start Time')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {`${formattedTimeString}`} <br></br>
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Expected Time Required')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {`${ExpectedTimeString}`} <br></br>
                    </p>
                  </Col>
                </Row>

                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Sales Person')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {currentErp.salesPerson.name} <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600', marginTop: '19px' }}>
                      {translate('Sales Person Contact')} :<br></br>
                    </p>{' '}
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {currentErp.salesPersonContact} <br></br>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <h2 className="" style={{ marginLeft: '5px', marginTop: '4%' }}>
        Workorder Details
      </h2>
      <Row className="gutter-row">
        <Col span={24}>
          <div
            className=""
            style={{
              width: '100%',
              border: '1px solid rgb(240,240,240)',
              height: '110px',
              borderRadius: '5px',
              boxShadow: '0px 0px 0px 1px rgb(240,240,240)',
            }}
          >
            <Row gutter={[12 - 12]} style={{ padding: '0px 0px 0px 20px' }}>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px', fontWeight: '600' }}>
                  {translate('Service Type')} :<br></br>
                </p>
              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {/* {currentErp.serviceList.name} */}
                  {currentErp.serviceList && currentErp.serviceList.name
                    ? currentErp.serviceList.name
                    : currentErp.customService.name}
                  <br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate('Service Description')} :<br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {/* {currentErp.customService.description} */}
                  {/* {currentErp.customService?.description ? (
                    <span>{currentErp.customService.description}</span>
                  ) : (
                    ""
                  )} */}
                  {currentErp?.customService?.description?.trim() ? (
                    <span>{currentErp.customService.description}</span>
                  ) : (
                    <span>--</span>
                  )}
                  <br></br>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      {/* ........WORKORDER BILLING DETAILS......... */}
      <h2 style={{ marginTop: '4%' }}>WorkOrder Billing Detail</h2>
      <Row className="gutter-row" style={{ marginTop: '20px' }}>
        <Col span={24}>
          <div
            className=""
            style={{
              width: '100%',
              border: '1px solid rgb(240,240,240)',
              height: '360px',
              borderRadius: '5px',
              boxShadow: '0px 0px 0px 1px rgb(240,240,240)',
            }}
          >
            <Row gutter={[12 - 12]} style={{ padding: '0px 0px 0px 20px' }}>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px', fontWeight: '600' }}>
                  {translate('Workorder For')} :<br></br>
                </p>
              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {/* {`${currentErp.serviceList.name} / One Time`} */}
                  {currentErp.serviceList && currentErp.serviceList.name
                    ? `${currentErp.serviceList.name} / One Time`
                    : `${currentErp.customService.name} / One Time`}
                  <br></br>
                </p>
              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate('Per Workorder Cost')} :<br></br>
                </p>{' '}
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {/* {currentErp.serviceCost.servicePerWO} */}
                  { currentErp.serviceCost &&   currentErp.serviceCost.servicePerWO ? currentErp.serviceCost.servicePerWO : '-'}
                  <br></br>
                </p>{' '}
              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate('Adjustment')} :<br></br>
                </p>{' '}
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {currentErp.adjustment && currentErp.adjustment.value
                    ? currentErp.adjustment.value
                    : ''}
                  <br></br>
                </p>{' '}
              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate(`Discount`)} :<br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {currentErp.serviceCost &&  currentErp.serviceCost.discount ? currentErp.serviceCost.discount: '-'}
                  <br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate('SubTotal')} :<br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                  {currentErp.serviceCost &&  currentErp.serviceCost.subTotal ? currentErp.serviceCost.subTotal: '-'}
                  <br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate('Tax')} :<br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                {currentErp.serviceCost && currentErp.serviceCost.tax ? currentErp.serviceCost.tax : "-"}
                  <br></br>
                </p>
              </Col>

              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '15px' }}>
                  {translate('Total Package Cost')} :<br></br>
                </p>
              </Col>
              <Col className="gutter-row" span={12}>
                <p style={{ fontSize: '14px', color: '#a3a3a3' }}>
                {currentErp.serviceCost && currentErp.serviceCost.totalPackageCost ? currentErp.serviceCost.totalPackageCost :"-" }
                  <br></br>
                </p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <h2 style={{ marginTop: '4%' }}>Other detail</h2>
      <Row className="gutter-row">
        <Col span={24}>
          <div
            className=""
            style={{
              width: '100%',
              border: '1px solid rgb(240,240,240)',
              height: '290px',
              borderRadius: '5px',
              boxShadow: '0px 0px 0px 1px rgb(240,240,240)',
            }}
          >
            <Row className="gutter-row" style={{ padding: '0px 0px 0px 20px' }}>
              <Col span={20}>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Initial Remarks')} .:<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {currentErp.remarks} <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Picture Uploaded')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#fdf2ff',
                        backgroundColor: '#808080',
                        width: '100px',
                        textAlign: 'center',
                        padding: '40px 10px 40px 10px',
                        borderRadius: '14px',
                      }}
                    >
                      +Add Image <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Created By')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {currentErp.createdBy.name} <br></br>
                    </p>
                  </Col>
                </Row>
                <Row className="gutter-row">
                  <Col span={12}>
                    <p style={{ fontSize: '15px', fontWeight: '600' }}>
                      {translate('Created At')} :<br></br>
                    </p>
                  </Col>
                  <Col span={12}>
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#a3a3a3',
                        marginTop: '19px',
                      }}
                    >
                      {CreatedformattedDate}
                      <br></br>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <h2 style={{ marginTop: '4%' }}>Additional Cost</h2>
      <Divider />
      <Row gutter={[12, 0]} style={{ marginTop: '-14px' }}>
        <Col className="gutter-row" span={5}>
          <p style={{ fontSize: '16px' }}>
            <strong>{translate('Product')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '16px',
            }}
          >
            <strong>{translate('Price')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '16px',
            }}
          >
            <strong>{translate('Quantity')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '16px',
            }}
          >
            <strong>{translate('Total')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '16px',
            }}
          >
            <strong>{translate('Remarks')}</strong>
          </p>
        </Col>
        <Divider style={{ marginTop: '1%' }} />
      </Row>

      {/* {itemslist.map((item) => (
        <Item key={item._id} item={item}></Item>
      ))} */}
      {itemslist.length > 0 ? (
        itemslist.map((item) => <Item key={item._id} item={item}></Item>)
      ) : (
        <p style={{ textAlign: 'center', fontSize: '20px' }}>No Selected Items Found!</p>
      )}

      {itemslist.length === 0 && <Divider dashed style={{ marginTop: '1%' }} />}
      
      {/* {currentErp.customItems.map((item) => (
        
        <Row gutter={[12, 0]} key={item._id}>
          <Col className="gutter-row" span={5}>
            <p style={{ marginBottom: 5 }}>
              <strong>{item.item}</strong>
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
          <Col className="gutter-row" span={6}>
            <p
              style={{
                textAlign: 'right',
                fontWeight: '700',
              }}
            >
              {item.remarks}
            
            </p>
          </Col>
          <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
        </Row>
      ))} */}
          {renderItems}


      

      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          // fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={13}>
            <p style={{ fontSize: '17px' }}>{translate('Item Total')} :</p>
          </Col>

          <Col className="gutter-row" span={11}>
            <p style={{ fontSize: '16px' }}>
              {/* {moneyFormatter({
                amount: currentErp.additionalCost.itemTotal,
              })} */}
              {currentErp.additionalCost &&  currentErp.additionalCost.itemTotal ? moneyFormatter({ amount: currentErp.additionalCost.itemTotal }) : ''}
            </p>
          </Col>

          <Col className="gutter-row" span={13}>
            <p style={{ fontSize: '17px' }}>
              {translate('Discount')} ({currentErp.discount}%) :
            </p>
          </Col>

          <Col className="gutter-row" span={11}>
            <p style={{ fontSize: '16px' }}>
              {/* {moneyFormatter({
                amount: currentErp.additionalCost.discount,
              })} */}

{currentErp.additionalCost &&  currentErp.additionalCost.discount ? moneyFormatter({ amount: currentErp.additionalCost.discount }) : ''}
            </p>
          </Col>

          <Col className="gutter-row" span={13}>
            <p style={{ fontSize: '17px' }}>{translate('sub total')} :</p>
          </Col>

          <Col className="gutter-row" span={11}>
            <p style={{ fontSize: '16px' }}>
              {/* {moneyFormatter({
                amount: currentErp.additionalCost.subTotal,
              })} */}
              {currentErp.additionalCost &&  currentErp.additionalCost.subTotal ? moneyFormatter({ amount: currentErp.additionalCost.subTotal }) : ''}
            </p>
          </Col>

          <Col className="gutter-row" span={13}>
            <p style={{ fontSize: '17px' }}>
              {translate('Tax')} ({currentErp.taxPercentage}%) :
            </p>
          </Col>
          <Col className="gutter-row" span={11}>
            <p style={{ fontSize: '16px' }}>
              {/* {moneyFormatter({
                amount: currentErp.additionalCost.tax,
              })} */}
              {currentErp.additionalCost &&  currentErp.additionalCost.tax ? moneyFormatter({ amount: currentErp.additionalCost.tax }) : ''}
            </p>
          </Col>

          <Col className="gutter-row" span={13}>
            <p style={{ fontSize: '17px' }}>{translate('Total Item Cost')} :</p>
          </Col>
          <Col className="gutter-row" span={11}>
            <p style={{ fontSize: '16px' }}>
              {/* {moneyFormatter({
                amount: currentErp.additionalCost.totalPackageCost,
              })} */}
               {currentErp.additionalCost &&  currentErp.additionalCost.totalPackageCost ? moneyFormatter({ amount: currentErp.additionalCost.totalPackageCost }) : ''}
            </p>
          </Col>
        </Row>
      </div>

      {/* <Row style={{ marginTop: '23%' }}>
        <Col className="gutter-row" span={4}>
          <h3 style={{ fontSize: '18px' }}>{translate('Grand Total')} :</h3>
        </Col>
        <Col className="gutter-row" style={{ marginLeft: '1%' }}>
          <h3 style={{ fontSize: '18px' }}>
            {moneyFormatter({
              amount: currentErp.grandTotal,
            })}
          </h3>
        </Col>
      </Row> */}
      <Divider />

      <h2 style={{ marginTop: '5%' }}>Total Workorder Cost</h2>
      <Divider />

      <Row gutter={[12, 0]} style={{ marginTop: '-14px' }}>
        <Col className="gutter-row" span={11}>
          <p style={{ fontSize: '18px' }}>
            <strong>{translate('Additional Cost')}</strong>
          </p>
        </Col>

        <Col className="gutter-row" span={12}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '18px',
            }}
          >
            {/* {moneyFormatter({
              amount: currentErp.additionalCost.totalPackageCost,
            })} */}
            {currentErp.additionalCost &&  currentErp.additionalCost.totalPackageCost ? moneyFormatter({ amount: currentErp.additionalCost.totalPackageCost }) : '-'}
          </p>
        </Col>
        <Divider dashed style={{ marginTop: '0%' }} />
      </Row>

      <Row gutter={[12, 0]} style={{ marginTop: '-14px' }}>
        <Col className="gutter-row" span={11}>
          <p style={{ fontSize: '18px' }}>
            <strong>{translate('Service Cost')}</strong>
          </p>
        </Col>

        <Col className="gutter-row" span={12}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '18px',
            }}
          >
            {/* {moneyFormatter({
              amount: currentErp.serviceCost.totalPackageCost,
            })} */}
                {currentErp.serviceCost &&  currentErp.serviceCost.totalPackageCost ? moneyFormatter({ amount: currentErp.serviceCost.totalPackageCost }) : '-'}

          </p>
        </Col>
        {/* <Divider  dashed  /> */}
      </Row>

      <Row
        gutter={[12, 0]}
        style={{
          marginTop: '13px',
          backgroundColor: 'rgb(141,40,221)',
          height: '68px',
          color: 'white',
        }}
      >
        <Col className="gutter-row" span={11}>
          <p style={{ fontSize: '21px' }}>
            <strong>{translate('Grand Total')}</strong>
          </p>
        </Col>

        <Col className="gutter-row" span={12}>
          <p
            style={{
              textAlign: 'right',
              fontSize: '21px',
            }}
          >
            {moneyFormatter({
              amount:grandTotal,
            })}


           
          </p>
        </Col>
        <Divider style={{ marginTop: '0%' }} />
      </Row>

      <h2 style={{ marginTop: '5%' }}>Basic Attendance Details</h2>
      <Row className="gutter-row">
        <Col span={24}>
          <div
            className=""
            style={{
              width: '100%',
              border: '1px solid rgb(240,240,240)',
              height: '400px',
              borderRadius: '5px',
              boxShadow: '0px 0px 0px 1px rgb(240,240,240)',
            }}
          >
            <Row className="gutter-row" style={{ padding: '0px 0px 0px 20px', marginTop: '20px' }}>
              <Col span={[8]}>
                <Col className="gutter-row" span={12}>
                  <p style={{ fontSize: '15px', fontWeight: '600' }}>
                    {translate('Attendance Type')}:<br></br>
                  </p>
                </Col>
              </Col>
              <Col span={[12]}>
                <Col className="gutter-row" span={12}>
                  <p style={{ fontSize: '15px', fontWeight: '600', marginLeft: '-33%' }}>
                    {translate('Independent Attendance')} <br></br>
                  </p>
                </Col>
              </Col>
            </Row>
            <div
              className=""
              style={{
                width: '98%',
                border: '1px solid rgb(240,240,240)',
                height: '300px',
                overflowY: 'scroll',

                borderRadius: '0px',
                boxShadow: '0px 0px 0px 1px #0e0e0e',
                marginLeft: '1%',
              }}
            >
              <Row className="gutter-row" style={{ padding: '0px 0px 0px 0px', marginTop: '10px' }}>
                <Col span={24}>
                  <Row style={{ padding: '0px 0px 0px 20px' }}>
                    <Col span={6}>
                      <p style={{ fontSize: '15px', fontWeight: '600' }}>
                        {translate('Worker')} <br></br>
                      </p>
                    </Col>
                    <Col span={6}>
                      {' '}
                      <p style={{ fontSize: '15px', fontWeight: '600' }}>
                        {translate('Expected Time')} <br></br>
                      </p>
                    </Col>
                    <Col span={6}>
                      {' '}
                      <p style={{ fontSize: '15px', fontWeight: '600' }}>
                        {translate('Actual Time')} <br></br>
                      </p>
                    </Col>

                    <Col span={6}>
                      <Row style={{ padding: '0px 0px 0px 20px' }}>
                        <Col span={4}>
                          <p style={{ fontSize: '15px', fontWeight: '600' }}>
                            {translate('Status')} <br></br>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr></hr>

                  {currentErp.fieldUsers.map((ele) => {
                    const date = new Date(ele.endTime);

                    const monthNames = [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ];

                    const day = date.getUTCDate();
                    const month = monthNames[date.getUTCMonth()];
                    const year = date.getUTCFullYear();
                    const hours = date.getUTCHours();
                    const minutes = date.getUTCMinutes();
                    const seconds = date.getUTCSeconds();

                    const fielduserDate = `${day} ${month}, ${year} ${hours}:${minutes}:${seconds}`;

                    function getStatusText(status) {
                      switch (status) {
                        case 1:
                          return {
                            text: 'Pending',
                            color: '#fdf2ff',
                            backgroundColor: 'rgb(167,0,255)',
                          };
                        case 2:
                          return { text: 'In Process', color: '#fdf2ff', backgroundColor: 'green' };
                        case 3:
                          return { text: 'Completed', color: '#fdf2ff', backgroundColor: 'purple' };
                        case 4:
                          return {
                            text: 'Rescheduled',
                            color: '#fdf2ff',
                            backgroundColor: 'orange',
                          };
                        case 5:
                          return { text: 'Cancelled', color: '#fdf2ff', backgroundColor: 'red' };
                        case 6:
                          return {
                            text: 'Request for Reshedule',
                            color: '#fdf2ff',
                            backgroundColor: 'brown',
                          };
                        case 7:
                          return {
                            text: 'Request for Cancel',
                            color: '#fdf2ff',
                            backgroundColor: 'gray',
                          };
                        case 8:
                          return { text: 'Terminate', color: '#fdf2ff', backgroundColor: 'black' };
                        case 9:
                          return { text: 'Hold', color: '#fdf2ff', backgroundColor: 'yellow' };
                        default:
                      }
                    }

                    const {
                      text: statusText,
                      color: textColor,
                      backgroundColor: bgColor,
                    } = getStatusText(ele.status);

                    return (
                      <Row style={{ padding: '0px 0px 0px 20px' }}>
                        <Col span={6}>
                          <p style={{ fontSize: '15px', fontWeight: '600' }}>
                            {translate(ele.user.name)} <br></br>
                            {ele.isLeader && (
                              <span style={{ fontSize: '12px', color: '#7928dd' }}>Leader</span>
                            )}
                          </p>
                        </Col>
                        <Col span={6}>
                          {' '}
                          <p style={{ fontSize: '15px', fontWeight: '600' }}>
                            {fielduserDate}
                            <br></br>
                          </p>
                        </Col>
                        <Col span={6}>
                          {' '}
                          <p style={{ fontSize: '15px', fontWeight: '600' }}>
                            {' '}
                            <br></br>
                          </p>
                        </Col>

                        <Col span={6}>
                          <Row>
                            <Col span={4}>
                              <p
                                style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: textColor,
                                  backgroundColor: bgColor,
                                  width: '90px',
                                  textAlign: 'center',
                                  padding: '4px 4px 4px 4px',
                                  borderRadius: '14px',
                                }}
                              >
                                {translate(statusText)} <br></br>
                              </p>
                            </Col>
                            {/* <Col span={2}>
                          4
                        </Col> */}
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
