import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'; // Import the CSS module
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { LockOutlined, PlusOutlined } from '@ant-design/icons';

export default function OtherCompanySettings() {
    const translate = useLanguage();
    const money = useMoney();
    const addField = useRef(false);
    const current = null
    const [clicked, setClicked] = useState(false);


    return (
        <>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={24}>
                    <div className={styles.headings}>
                        <p className={styles.bold_text}>Other Company Settings</p>
                    </div>
                </Col>
            </Row>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        label={translate("Select Package")}
                    >
                        <Space>
                            <Button type="primary">
                                {translate('CRM Only')}
                            </Button>
                            <Button>
                                {translate('Field Pack')}
                            </Button>
                            <Button>
                                {translate('Full Pack')}
                            </Button>
                        </Space>

                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        label={translate("Package Description")}
                    >
                        <div>1. Each Quotation creation Charge will be $0.15/quotation</div>

                    </Form.Item>
                </Col>
            </Row>
            {/* Default Work Order Time and Quotation’s Cost */}
            < Row gutter={[12, 0]} >
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        label={translate('Default Work Order Time')}
                        name="taxPercentage"
                        rules={[
                            {
                                type: 'number',
                            },
                            {
                                required: true,
                            },

                        ]}>
                        <InputNumber
                            className="moneyInput"
                            min={0}
                            controls={false}
                            addonAfter={'after' ? <span className={styles.highlightText}> ({translate("Working hours")})</span> : undefined}
                            placeholder='Enter Default Work Order Time'
                        />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item
                        label={translate('Quotations Cost')}
                        name="taxPercentage1"
                        rules={[
                            {
                                type: 'number',
                            },
                            // ({ getFieldValue }) => ({
                            //     validator(_, value) {
                            //         const onlyDigitsRegex = /^\d*$/;
                            //         if (!value || onlyDigitsRegex.test(value.toString())) {
                            //             return Promise.resolve();
                            //         }
                            //         return Promise.reject(new Error('Only digits are allowed'));
                            //     },
                            // }),
                            {
                                required: true,
                            },

                        ]}>
                        <InputNumber
                            className="moneyInput"
                            min={0}
                            controls={false}
                            addonAfter={'after' ? <span className={styles.highlightText}> ($USD/QN)</span> : undefined}
                            placeholder='Enter Quotations Cost'
                        />
                        {/* <Input placeholder="Enter Company Tax Percentage" /> */}
                    </Form.Item>
                </Col>
            </Row >

            {/*  Free Quotations and Free Work Orders*/}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="quotation"
                        label={translate('Free Quotations')}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    ><InputNumber className="moneyInput" placeholder='Enter Free Quotation Number' />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="wo"
                        label={translate('Free Work Orders')}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    ><InputNumber className="moneyInput" placeholder='Enter Free Work Order Number' />
                    </Form.Item>
                </Col>

            </Row>
            {/* Customer Address Format */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        label={translate('Customer Address Format')}
                        name="status"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        initialValue={'Select'}
                    >
                        <Select
                            options={[
                                { value: 'Select', label: translate('Select') },
                                { value: 'Singapore', label: translate('Singapore') },
                            ]}
                        ></Select>
                    </Form.Item>
                </Col>
            </Row>
            {/* attendanceType */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={24}>
                    <Form.Item
                        name="attendanceType"
                        label={translate('Attendance Type')}
                        rules={[
                            {
                                required: true,
                                message: 'Please select a Attendance Type:',
                            },
                        ]}
                    >
                        <Radio.Group style={{ display: "flex", gap: "20px" }}>
                            <Radio value="Independent">Independent Attendance</Radio>
                            <Radio value="Unified">Unified Attendance</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

            </Row>
            {/* Working Days */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={24}>
                    <Form.Item
                        name="attendanceType"
                        // label={translate("Working Days")}
                        label={(
                            <span>
                                {`${translate('Working Days')}:`}
                                <span className={styles.highlightText}> Default (Monday, Tuesday, Wednesday, Thursday, Friday)</span>
                            </span>
                        )}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Space>
                            <Button type="primary">
                                {translate('MONDAY').toUpperCase()}
                            </Button>
                            <Button type="primary">
                                {translate('tuesDAY').toUpperCase()}
                            </Button>
                            <Button type="primary">
                                {translate('wednesDAY').toUpperCase()}
                            </Button>
                            <Button type="primary">
                                {translate('thursDAY').toUpperCase()}
                            </Button>
                            <Button type="primary">
                                {translate('friDAY').toUpperCase()}
                            </Button>
                            <Button>
                                {translate('SATURDAY').toUpperCase()}
                            </Button>
                            <Button>
                                {translate('SUNDAY').toUpperCase()}
                            </Button>
                        </Space>
                    </Form.Item>
                </Col>

            </Row>
            {/* Checkbox- Company Status */}
            <Row gutter={[12, 0]}>
                <Col className={`gutter-row ${styles["mb-20"]}`} span={24}>
                    <Checkbox
                        onChange={(value) => {
                            // setFeedback(value.target.checked);
                        }}
                    // value={field.value}
                    >
                        {translate("Company Status")}
                    </Checkbox>
                </Col>
            </Row>
        </>
    )
}
