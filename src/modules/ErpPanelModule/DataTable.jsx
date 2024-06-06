import { useEffect, useState } from 'react';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  RedoOutlined,
  PlusOutlined,
  PayCircleOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';
import { generate as uniqueId } from 'shortid';
import { useNavigate } from 'react-router-dom';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';

let data = JSON.parse(localStorage.getItem('auth'))
let user = data.current

var role
var permissions
var isSAAS

function AddNewItem({ config }) {
  const [admin, setAdmin] = useState([]);
  const [authUser, setAuthUser] = useState({});
  useEffect(() => {
    data = JSON.parse(localStorage.getItem('auth'))
    user = data.current
    setAuthUser(user)
    setAdmin(user?.role_id)
  }, [])

  // role = admin?.role_id
  role = user?.role_id
  isSAAS = role?.isSAAS

  const navigate = useNavigate();
  const { ADD_NEW_ENTITY, entity } = config;
  // console.log(config)

  const handleClick = () => {
    navigate(`/${entity.toLowerCase()}/create`);
  };

  let { role_id } = authUser || {};
  let { permissions } = role_id || {};

  return (
    permissions?.[entity + '_create'] || isSAAS == true ? (
      <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
        {ADD_NEW_ENTITY}
      </Button>
    ) : null
  );
}

export default function DataTable({ config, extra = [] }) {
  const translate = useLanguage();
  let { entity, dataTableColumns, disableAdd = false } = config;

  // console.log(dataTableColumns)


  const descriptionField = dataTableColumns.find(item => item.title === 'Description');
  let descriptionValue = '';
  if (descriptionField && Array.isArray(descriptionField.dataIndex)) {
    descriptionValue = descriptionField.dataIndex[0];
  }
  const updatedDataTableColumns = dataTableColumns.filter(item => item.title !== 'Description');

  const [columns, setColumns] = useState(dataTableColumns);
  const { DATATABLE_TITLE } = config;
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items: dataSource } = listResult;
  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;
  role = user?.role_id
  isSAAS = role?.is_saas
  permissions = role?.permissions

  let items = []

  if ((permissions?.[entity + '_read'] || isSAAS == true) && entity != 'roles') {
    items.push({
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    })
  }

  if ((permissions?.[entity + '_edit'] === true || isSAAS === true) && entity !== 'workorder' && entity !== 'contract') {
    items.push({
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    })
  }



  items.push(...extra,

  )

  // if ((permissions?.[entity + '_delete'] || isSAAS === true) && entity !== 'workorder' && entity !== 'contract') {
  //   items.push({
  //     label: translate('Delete'),
  //     key: 'delete',
  //     icon: <DeleteOutlined />,
  //   })
  // }

  const navigate = useNavigate();

  const handleRead = (record) => {
    dispatch(erp.currentItem({ data: record }));
    navigate(`/${entity}/read/${record._id}`);
  };
  const handleEdit = (record) => {
    const data = { ...record };
    dispatch(erp.currentAction({ actionType: 'update', data }));
    navigate(`/${entity}/update/${record._id}`);
  };
  const handleDownload = (record) => {
    window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${record._id}.pdf`, '_blank');
  };

  const handleDelete = (record) => {
    dispatch(erp.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  };
  const handlePriceModel = (record) => {
    const data = { ...record };
    console.log("data", data);
    dispatch(erp.currentAction({ actionType: 'update', data }));
    navigate(`/${entity}/update/pricing/${record._id}`);
  };

  const handleRecordPayment = (record) => {
    dispatch(erp.currentItem({ data: record }));
    navigate(`/invoice/pay/${record._id}`);
  };

  if (entity === 'servicelist') {
    dataTableColumns = [
      ...updatedDataTableColumns,
    ];
  }
 dataTableColumns = [

    ...dataTableColumns,
    {
      title: '',
      key: 'action',
      // fixed: 'right',
      render: (_, record) => {
        return <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'edit':
                  handleEdit(record);
                  break;
                case 'download':
                  handleDownload(record);
                  break;
                case 'delete':
                  handleDelete(record);
                  break;
                case 'price_model':
                  handlePriceModel(record);
                  break;
                case 'recordPayment':
                  handleRecordPayment(record);
                default:
                  break;
              }

            },

          }
          }
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>

      }
    },
  ];


  const dispatch = useDispatch();
  const handelDataTableLoad = (pagination) => {
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(erp.list({ entity, options }));
  };

  const dispatcher = () => {
    dispatch(erp.list({ entity }));
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />}>
            {translate('Refresh')}
          </Button>,
          !disableAdd && <AddNewItem config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>

      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={dataSource}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
        scroll={{ x: true }}
      />
    </>
  );
}