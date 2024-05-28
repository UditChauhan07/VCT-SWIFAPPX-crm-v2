import { useCallback, useEffect, useState } from 'react';
import { EnterOutlined, HomeOutlined } from '@ant-design/icons';
import {
  RedoOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from '@ant-design/icons';
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
import { useParams } from 'react-router-dom';
let data = JSON.parse(localStorage.getItem('auth'));
let user = data.current;

var role;
var permissions;
var isSAAS;

function AddNewItem({ config }) {

  const { crudContextAction } = useCrudContext();
  const { collapsedBox, panel } = crudContextAction;
  const { ADD_NEW_ENTITY, entity } = config;
  const navigate = useNavigate();
  const handelClick = () => {
    // if (entity == 'admin') {
    //   panel.open();
    //   collapsedBox.close();
    // }
    // else {
    //   navigate(`/${entity.toLowerCase()}/create`)
    // }
    if (entity == 'customer') {
      setIsVisible(true);
    }

    panel.open();
    collapsedBox.close();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined/>}>
      {ADD_NEW_ENTITY}
    </Button>
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

  const [authUser, setAuthUser] = useState({});
  useEffect(() => {
    data = JSON.parse(localStorage.getItem('auth'));
    user = data.current;
    setAuthUser(user);
    setAdmin(user?.role_id);
  }, []);

  role = user?.role_id;

  isSAAS = role?.is_saas;
  permissions = role?.permissions;

  let items = [];
  if (permissions?.[entity + '_read'] || isSAAS == true) {
    items.push({
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    });
  }

  if (permissions?.[entity + '_edit'] == true || isSAAS == true) {
    items.push({
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    });
  }

  // address module

  // if(entity === "client"){
  //   if (permissions?.[entity + 'address_list'] || isSAAS == true) {
  //     items.push({
  //       label: translate('address_list'),
  //       key: 'address_list',
  //       icon: <HomeOutlined />,
  //     });
  //   }
  // }

  if (permissions?.[entity + 'address_list'] || isSAAS == true) {
    items.push({
      label: translate('address_list'),
      key: 'address_list',
      icon: <HomeOutlined />,
    });
  }
  if (entity === "servicelist" && (permissions?.[entity + '_edit'] == true || isSAAS == true)) {
    items.push({
      label: translate('Pricing Model'),
      key: 'sec_edit',
      icon: <EditOutlined />,
    })
  }

  items.push(...extra, {
    type: 'divider',
  });

  if (permissions?.[entity + '_delete'] || isSAAS == true) {
    items.push({
      label: translate('Delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
    });
  }

  const navigate = useNavigate();

  const handleRead = (record) => {
    console.log(record)
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
    console.log(record);
    dispatch(crud.currentAction({ actionType: 'delete', data: record }));
    modal.open();
    useEffect(() => {
      if (isSuccess) {
        modal.close();
        dispatch(crud.list({ entity }));
        // dispatch(crud.resetAction({actionType:"delete"})); // check here maybe it wrong
      }
   
    }, [isSuccess]);
    // dispatch(crud.resetAction({ actionType: 'delete' }));
    // dispatch(crud.list({ entity }));
  }

  function handleAddresses(record) {
    let id = record._id;
    localStorage.setItem('key', id);
    dispatch(crud.Addresslist({ entity, id }));
    navigate(`/customer/address/${id}`);
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
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            // items,
            items: items.filter((item) => item.key !== 'address_list' || entity === 'client'),
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
                case 'address_list':
                  handleAddresses(record);

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

  const dispatcher = (id) => {
    dispatch(crud.list({ entity }));
    if (id) {
      dispatch(crud.list({ entity, id }));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    const id = localStorage.getItem('key');
    if (id) {
      dispatcher(id);
    }
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
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />}>
            {translate('Refresh')}
          </Button>,
          permissions?.[entity + '_create'] || isSAAS == true ? (
            <AddNewItem key={`${uniqueId()}`} config={config} />
          ) : (
            ''
          ),
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
