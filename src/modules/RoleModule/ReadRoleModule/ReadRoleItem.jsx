import { useState, useEffect } from 'react';

import { Button, Row, Col, Descriptions, Statistic, Tag, Divider } from 'antd';
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



export default function ReadRoleItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();

  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });
  const navigate = useNavigate();
  const [lead, setLead] = useState({});

  const { result: currentResult } = useSelector(selectCurrentItem);

  // const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem);

  return (
    <>
      <PageHeader
        onBack={() => {
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={`${ENTITY_NAME} `}
        ghost={false}
        // subTitle="This is cuurent erp page"
        extra={[
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
      <Descriptions title={`Role  :  ${currentErp.name}`}>
      </Descriptions>
      <Descriptions title={`Company  : ${currentErp.company_id.name}`}>
      </Descriptions>
      <Descriptions title={`Slug  : ${currentErp.slug ? currentErp.slug : ''}`}>
      </Descriptions>
      <Descriptions title={`Description  : ${currentErp.description}`}>
      </Descriptions>
      
    </>
  );
}
