import { countryList } from '@/utils/countryList'
import { validatePhoneNumber } from '@/utils/helpers'
import { Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import styles from './styles.module.css'; // Import the CSS module
import useLanguage from '@/locale/useLanguage';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const CompanyContactInfo = () => {
    const translate = useLanguage();
    const [visible, setVisible] = useState(false);

    const handlePasswordVisibility = () => {
        setVisible(!visible);
    };
    const validateZipCode = (_, value) => {
        if (!value || /^\d{4,6}$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Please enter a valid 4 to 6 digit zip code'));
    };
    return (
        <>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={24}>
                    <div className={styles.headings}>
                        <p className={styles.bold_text}>Company Contact Information</p>
                    </div>
                </Col>
            </Row>
            {/* Address line 1 and Company Contact Person  */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Address Line 1')}
                        name="address"
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            }
                        ]}>
                        <Input placeholder='Enter Company Address' />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Company Contact Person')}
                        name="executiveName"
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            }
                        ]}>
                        <Input placeholder='Enter Company Contact Person' />
                    </Form.Item>
                </Col>
            </Row>
            {/* Address line 2 and Contact Person Phone: */}

            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Address Line 2')}
                        name="address"
                        rules={[
                            {
                                type: 'string'
                            }
                        ]}>
                        <Input placeholder='Enter Company Address Line 2' />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="phone"
                        label={translate('Contact Person Phone')}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: validatePhoneNumber,
                                message: "Please enter valid phone number"
                            },
                        ]}
                    >
                        <Input placeholder="Enter Company Person Phone" />

                    </Form.Item>
                </Col>
            </Row>
            {/* City and Company Office Phone: */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('City')}
                        name="city"
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            },
                        ]}>
                        <Input placeholder="Enter Company Address's City" />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="phone"
                        label={translate('Company Office Phone')}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: validatePhoneNumber,
                                message: "Please enter valid phone number"
                            },
                        ]}
                    >
                        <Input placeholder="Enter Company Office Phone" />

                    </Form.Item>
                </Col>
            </Row>
            {/* State and  Company Office Email Address:*/}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('State')}
                        name="state"
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            },
                        ]}>
                        <Input placeholder="Enter Company Address's state" />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="email"
                        label={translate('Company Office Email Address')}
                        rules={[
                            {
                                required: true,
                                type: 'email'
                            }
                        ]}
                    ><Input placeholder="Enter Company Office Email Address" />
                    </Form.Item>
                </Col>
            </Row>
            {/* *ZIP/Postal Code and country */}
            <Row gutter={[12, 0]}>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('COuntry')}
                        name="country"
                        rules={[
                            {
                                type: 'country'
                            },
                        ]}>
                        <Select
                            showSearch
                            // defaultValue={field.defaultValue}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            {countryList.map((language) => (
                                <Select.Option
                                    key={language.value}
                                    value={language.value}
                                    label={translate(language.label)}
                                >
                                    {language?.icon && language?.icon + ' '}
                                    {translate(language.label)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('ZIP or Postal Code')}
                        name="postalCode"
                        rules={[
                            {
                                validator: validateZipCode,
                            },
                        ]}>
                        <Input placeholder="Enter Company Address's Zip" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

export default CompanyContactInfo