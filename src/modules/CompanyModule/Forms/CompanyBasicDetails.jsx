import { countryList } from '@/utils/countryList'
import { validatePhoneNumber } from '@/utils/helpers'
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'; // Import the CSS module
import useLanguage from '@/locale/useLanguage';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { useMoney } from '@/settings';
import { PlusOutlined } from '@ant-design/icons';
import ItemRow from '@/modules/ErpPanelModule/ItemRow';

const CompanyBasicDetails = () => {
    const translate = useLanguage();
    const money = useMoney();
    const addField = useRef(false);
    const current = null
    useEffect(() => {
        addField.current.click();
    }, []);
    return (
        <>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={24}>
                    <div className={styles.headings}>
                        <p className={styles.bold_text}>Company Basic Details</p>
                    </div>
                </Col>
            </Row>
            {/* Company Name and logo*/}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="company"
                        label={translate('Company Name')}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    ><Input placeholder='Enter Company Name' />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Company Logo')}
                        name="logo"
                        rules={[
                            {
                                type: 'file'
                            },
                        ]}>
                        <Input type='file' />
                    </Form.Item>
                </Col>
            </Row>
            {/* currency and time zone*/}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="currency"
                        label={translate('Currency')}
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Time Zone')}
                        name="city"
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            },
                        ]}>
                        <Input placeholder="Enter Super Admin Address's City" />
                    </Form.Item>
                </Col>
            </Row>
            {/* tax name and % */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="taxName"
                        label={translate("Tax Name")}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    >
                        <Input placeholder='Enter Company Tax Name' />

                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item
                        label={(
                            <span>
                                {translate('Tax Percentage')}
                                <span className={styles.highlightText}> (Max: 40%)</span>
                            </span>
                        )}

                        name="taxPercentage"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 40,
                                message: 'Tax percentage must be between 0 and 40',
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
                                message: 'Please enter valid tax percentage',
                            },

                        ]}>
                        <InputNumber
                            className="moneyInput"
                            min={0}
                            controls={false}
                            addonAfter={money.currency_position === 'after' ? "%" : undefined}
                            addonBefore={money.currency_position === 'before' ? "%" : undefined}
                            placeholder='Enter Company Tax Percentage'
                        />
                        {/* <Input placeholder="Enter Company Tax Percentage" /> */}
                    </Form.Item>
                </Col>
            </Row>
            {/* Certificate name and number */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="certification[name]"
                        label={translate("Certificate Name")}
                        rules={[
                            {
                                type: 'string'
                            }
                        ]}
                    >
                        <Input placeholder='Enter Company Certificate Name' />

                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Certificate Number')}
                        name="certification[number]"
                        rules={[
                            {
                                type: 'string',
                            },
                        ]}>
                        <Input placeholder="Enter Company Certificate Number" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={12}>
                    <p>{translate('Certificate name')}</p>
                </Col>
                <Col className="gutter-row" span={12}>
                    <p>{translate('Certificate number')}</p>
                </Col>

            </Row>
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                                ref={addField}
                            >
                                {translate('Add field')}
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

        </>
    )
}

export default CompanyBasicDetails