import { useState, useEffect } from 'react';
import { Switch, Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { request } from '@/request';


export default function ServiceListEditForm() {
    const translate = useLanguage();
    const { TextArea } = Input;

    return (
        <>
            <Row gutter={[12, 0]}>
                <Col className="gutter-row" span={24}>
                    <Form.Item
                        name='name'
                        label={translate('Name')}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 12]} style={{ position: 'relative' }}>
                <Col className="gutter-row" span={24}>
                    <Form.Item
                        name="description"
                        label={translate('Description')}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[12, 12]}>

                <Col className="gutter-row" span={12}>
                    <Form.Item label={translate('enabled')} name="enabled" valuePropName={'checked'}>
                        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ position: 'relative', width: ' 100%', float: 'left' }}>
                <Row gutter={[12, -5]}>
                    <Col className="gutter-row" span={5}>
                        <Form.Item style={{ marginTop: '16px' }}>
                            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                                {translate('Save')}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </>
    );
}
