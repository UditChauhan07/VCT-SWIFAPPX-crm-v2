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
    console.log("currentErp", currentErp);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await request.getServiceCategory(); // Assuming your request function is named getData()
                // Assuming your API response contains an array of options as response.options
                if (response.success) {
                    setOptions(response.result); // Set options state based on API response
                }

                console.log(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, []);
    // Function to extract subscription names
    const getSubscriptionNames = () => {
        console.log('name', currentErp.subscriptions.map(item => item.subscription.name));
        return currentErp.subscriptions.map(item => item.subscription.name);
    };

    // Function to extract price values
    const getPriceValues = () => {
        console.log('item', currentErp.subscriptions.map(item => Object.values(item.data).map(subitem => subitem.price)));
        return currentErp.subscriptions.map(item => Object.values(item.data).map(subitem => subitem.price));
    };

    // Function to generate table columns
    const generateColumns = () => {
        console.log('key pair ', ...currentErp.subscriptions.map((item => Object.values(item.data).map((subitem, key) => ({
            title: subitem.name,
            dataIndex: subitem.name,
        })))), 'old key pair ', ...currentErp.subscriptions.map((item, key) => ({
            title: item.data[key].name,
            dataIndex: item.data[key].name,
        })));
        const columns = [
            {
                title: 'Subscription',
                dataIndex: 'subscription',
            },
            ...currentErp.subscriptions.map((item, key) => ({
                title: item.data[key].name,
                dataIndex: item.data[key].name,
            })),
            // ...currentErp.subscriptions.map((item => Object.values(item.data).map((subitem, key) => ({
            //     title: subitem.name,
            //     dataIndex: subitem.name,
            // }))))
        ];
        console.log({ columns });
        return columns;
    };

    // Function to generate table data
    const generateTableData = () => {
        const subscriptionNames = getSubscriptionNames();
        const priceValues = getPriceValues();
        console.log(subscriptionNames, priceValues);
        const tableData = subscriptionNames.map((subscription, index) => {
            // console.log(subscription);
            const rowData = {
                subscription: subscription,
            };
            priceValues[index].forEach((price, idx) => {
                // console.log(currentErp.subscriptions, idx, price);
                rowData[currentErp.subscriptions[index].data[idx].name] = price;
            });
            return rowData;
        });
        return tableData;
    };
    console.log(options.filter((ele) => ele._id === currentErp.serviceCategory)?.[0]?.name);
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

                    {/* <p>{currentErp.serviceCategory?.name}</p> */}
                    <p>{options.filter((ele) => ele._id === currentErp.serviceCategory)?.[0]?.name}</p>
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

                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Table
                                columns={generateColumns()}
                                dataSource={generateTableData()}
                                pagination={false} />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
    );
}
