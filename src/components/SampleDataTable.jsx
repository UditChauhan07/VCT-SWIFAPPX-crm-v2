import { useCallback, useEffect, useState } from 'react';

import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Table, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { dataForTable } from '@/utils/dataStructure';
import { useMoney, useDate } from '@/settings';

import { generate as uniqueId } from 'shortid';

import { useCrudContext } from '@/context/crud';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@/config/serverApiConfig';
let user = JSON.parse(window.localStorage.getItem('auth'))
let user_id = user.current._id


var role
var adminLevel
var permissions


function AddNewItem({ config }) {
  
  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY, entity } = config;

  const navigate = useNavigate();
  const handelClick = () => {

    if (entity == 'customer') {
      setIsVisible(true);
    }
    panel.open();
    collapsedBox.close();
  };

  return (
    <>
      {loading ? (
        <Spin>
          <Button type="primary" icon={<PlusOutlined />} disabled>
            {ADD_NEW_ENTITY}
          </Button>
        </Spin>
      ) : (
        <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
          {ADD_NEW_ENTITY}
        </Button>
      )}
    </>
  );
}

export default function DataTable({ config, extra = [] }) {
  let { entity, dataTableColumns, DATATABLE_TITLE, fields } = config;
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, modal, readBox, editBox, advancedBox } = crudContextAction;
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const { dateFormat } = useDate();
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    GetAdminDataHandler().then((res) => {
      setAdmin(res.result)
    }).catch((err) => {
      console.error({ err });
    })
  }, [])
  const GetAdminDataHandler = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(`${API_BASE_URL}admin/read/${user_id}`, {
      method: "GET",
      headers: headersList
    });

    let data = JSON.parse(await response.text());
    return data
  }
  role = admin?.role_id
  adminLevel = role?.admin_level
  permissions = role?.permissions


  let items = []
  if (permissions?.[entity + '_read'] || adminLevel == 1) {
    items.push({
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    })
  }

  if (permissions?.[entity + '_edit'] == true || adminLevel == 1) {
    items.push({
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    })
  }

  items.push(...extra,
    {
      type: 'divider',
    },
  )

  if (permissions?.[entity + '_delete'] || adminLevel == 1) {
    items.push({
      label: translate('Delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
    })
  }


  const handleRead = (record) => {
    dispatch(crud.currentItem({ data: record }));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };
  function handleEdit(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    editBox.open();
    panel.open();
    collapsedBox.open();
  }
  function handleDelete(record) {
    dispatch(crud.currentAction({ actionType: 'delete', data: record }));
    modal.open();
  }

  function handleUpdatePassword(record) {
    dispatch(crud.currentItem({ data: record }));
    dispatch(crud.currentAction({ actionType: 'update', data: record }));
    advancedBox.open();
    panel.open();
    collapsedBox.open();
  }

  let dispatchColumns = [];
  if (fields) {
    dispatchColumns = [...dataForTable({ fields, translate, moneyFormatter, dateFormat })];
  } else {
    dispatchColumns = [...dataTableColumns];
  }

  dataTableColumns = [
    ...dispatchColumns,
    {
      title: '',
      key: 'action',
      // fixed: 'right',
      render: (_, record) => (
        <Dropdown
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

                case 'delete':
                  handleDelete(record);
                  break;
                case 'updatePassword':
                  handleUpdatePassword(record);
                  break;

                default:
                  break;
              }
              // else if (key === '2')handleCloseTask
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items: dataSource } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(crud.list({ entity, options }));
  }, []);

  const dispatcher = () => {
    dispatch(crud.list({ entity }));
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
        onBack={() => window.history.back()}
        title={DATATABLE_TITLE}
        ghost={false}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`}>
            {translate('Refresh')}
          </Button>,
          permissions?.[entity + '_create'] || adminLevel == 1 ?
            < AddNewItem key={`${uniqueId()}`} config={config} />
            : ''
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader >
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
