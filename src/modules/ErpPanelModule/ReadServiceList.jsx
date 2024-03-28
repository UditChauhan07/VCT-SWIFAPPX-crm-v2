import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Table } from 'antd';
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
import { tagColor } from '@/utils/statusTagColor';
import { request } from '@/request';


export default function ReadServiceList({ config, selectedItem }) {
    const translate = useLanguage();
    const { entity, ENTITY_NAME } = config;
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
    const [serviceName, setServiceName] = useState('');
    useEffect(() => {
        // Function to fetch the name from the backend using the service category ID
        const fetchServiceName = async () => {
            try {
                const response = await request.getCateGoryDetails({ id: currentErp.service_category }); // Assuming your request function is named getData()
                // Assuming your API response contains an array of options as response.options
                if (response.success) {
                    const { name } = response.result;
                    setServiceName(name);
                }

                console.log(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch the service name when the component mounts
        fetchServiceName();
    }, [currentErp.service_category]);

    console.log(currentErp);
    // Function to extract subscription names
    const getSubscriptionNames = () => {
        return currentErp.subscriptions.map(item => item.subscription);
    };

    // Function to extract price values
    const getPriceValues = () => {
        return currentErp.subscriptions.map(item => Object.values(item.data).map(subitem => subitem.price));
    };

    // Function to generate table columns
    const generateColumns = () => {
        const columns = [
            {
                title: 'Subscription',
                dataIndex: 'subscription',
            },
            ...currentErp.subscriptions.map(item => ({
                title: item.data[0].name,
                dataIndex: item.data[0].name,
            })),
        ];
        return columns;
    };

    // Function to generate table data
    const generateTableData = () => {
        const subscriptionNames = getSubscriptionNames();
        const priceValues = getPriceValues();
        const tableData = subscriptionNames.map((subscription, index) => {
            // console.log(subscription);
            const rowData = {
                subscription: subscription,
            };
            priceValues[index].forEach((price, idx) => {
                // console.log(currentErp.subscriptions, idx, price);
                rowData[currentErp.subscriptions[index].data[0].name] = price;
            });
            return rowData;
        });
        return tableData;
    };

    return (
        <>
            <PageHeader
                onBack={() => {
                    navigate(`/${entity.toLowerCase()}`);
                }}
                title='Service List'//</>{ENTITY_NAME}//{`${currentErp.name}`}
                ghost={false}

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
                            dispatch(
                                erp.currentAction({
                                    actionType: 'update',
                                    data: currentErp,
                                })
                            );
                            navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
                        }}
                        type="primary"
                        icon={<EditOutlined />}
                    >
                        {translate('Edit')}
                    </Button>,
                ]}
                style={{
                    padding: '20px 0px',
                }}
            >

            </PageHeader>
            <Divider dashed />
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={6}>
                    <p><strong>{translate('Name')}: </strong></p>
                </Col>
                <Col className="gutter-row" span={12}>
                    <p>{currentErp.name}</p>
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col className="gutter-row" span={6}>
                    <p><strong>{translate('Service Category')}: </strong></p>
                </Col>
                <Col className="gutter-row" span={12}>
                    <p>{serviceName}</p>
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col className="gutter-row" span={6}>
                    <p><strong>{translate('Description')}: </strong></p>
                </Col>
                <Col className="gutter-row" span={12}>
                    <p>{currentErp.description}</p>
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col className="gutter-row" span={6}>
                    <p><strong>{translate('Pricing Modal')}: </strong></p>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Table
                        columns={generateColumns()}
                        dataSource={generateTableData()}
                        pagination={false} />
                </Col>
            </Row>

        </>
    );
}
