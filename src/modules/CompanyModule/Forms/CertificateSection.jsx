import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

const CertificateSection = ({ field, remove, current = null }) => {
    const translate = useLanguage();

    return (
        <>
            <Row gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name={[field.name, 'certification[name]']}
                        rules={[
                            {
                                pattern: /^(?!\s*$)[\s\S]+$/, 
                                
                            },
                        ]}
                    >
                        <Input placeholder='Enter Company Certificate Name' />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Form.Item
                        name={[field.name, 'certification[number]']}
                        rules={[
                            {
                                type: 'string',
                            },
                        ]}>
                        <Input placeholder="Enter Company Certificate Number" />
                    </Form.Item>
                </Col>

                <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
                    <DeleteOutlined onClick={() => remove(field.name)} />
                </div>
            </Row>
        </>)
}

export default CertificateSection