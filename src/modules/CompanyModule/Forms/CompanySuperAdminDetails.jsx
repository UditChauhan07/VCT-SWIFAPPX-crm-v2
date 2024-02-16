import { countryList } from '@/utils/countryList'
import { validatePhoneNumber } from '@/utils/helpers'
import { Col, Form, Input, Row, Select } from 'antd'
import React, { useState } from 'react'
import styles from './styles.module.css'; // Import the CSS module
import useLanguage from '@/locale/useLanguage';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const CompanySuperAdminDetails = () => {
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
                        <p className={styles.bold_text}>Company Super Admin Details</p>
                    </div>
                </Col>
            </Row>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="firstname"
                        label={translate('First Name')}
                        rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'string'
                            }
                        ]}
                    ><Input placeholder='Enter Super Admin First Name' />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('Address')}
                        name="address"
                        rules={[
                            {
                                type: 'string'
                            },
                        ]}>
                        <Input placeholder='Enter Super Admin Address' />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="lastname"
                        label={translate('LAst Name')}
                        rules={[
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                            },
                        ]}
                    ><Input placeholder='Enter Super Admin Last Name' />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('City')}
                        name="city"
                        rules={[
                            {
                                type: 'string'
                            },
                            // {
                            //   required: true,
                            // },
                        ]}>
                        <Input placeholder="Enter Super Admin Address's City" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="logo"
                        label={translate('Profile Picture')}
                        rules={[
                            // {
                            //   required: true,
                            // },
                            {
                                type: 'file'
                            }
                        ]}
                    ><Input type='file' />
                    </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('State')}
                        name="state"
                        rules={[
                            {
                                type: 'string'
                            },
                            // {
                            //   required: true,
                            // },
                        ]}>
                        <Input placeholder="Enter Super Admin Address's state" />
                    </Form.Item>
                </Col>
            </Row>
            {/* contact number and country */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="phone"
                        label={translate('phone')}
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
                        <Input placeholder="Enter Super Admin Contact Number" />

                    </Form.Item>
                </Col>

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
            </Row>
            {/* email and zip code */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="email"
                        label={translate('Email Address or Username')}
                        rules={[
                            {
                                required: true,
                                type: 'email'
                            }
                        ]}
                    ><Input placeholder="Enter Super Admin Email Address/Username" />
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
                        <Input placeholder="Enter Super Admin Address's Zip" />
                    </Form.Item>
                </Col>
            </Row>
            {/* password */}
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name="password"
                        label={translate('Admin Password')}
                        rules={[
                            {
                                required: true,
                                type: 'password'
                            }
                        ]}
                    >
                        <Input.Password placeholder="Enter SuperAdmin Password" iconRender={(visible) => (visible ? <EyeOutlined onClick={handlePasswordVisibility} /> : <EyeInvisibleOutlined onClick={handlePasswordVisibility} />)}
                        />
                    </Form.Item>
                </Col>

            </Row>
        </>
    )
}

export default CompanySuperAdminDetails