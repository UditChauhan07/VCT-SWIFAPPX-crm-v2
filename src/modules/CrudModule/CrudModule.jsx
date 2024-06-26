import { useLayoutEffect, useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateForm from '@/components/CreateForm';
import UpdateForm from '@/components/UpdateForm';
import DeleteModal from '@/components/DeleteModal';
import ReadItem from '@/components/ReadItem';
import SearchItem from '@/components/SearchItem';
import DataTable from '@/components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentItem } from '@/redux/crud/selectors';
import useLanguage from '@/locale/useLanguage';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { CrudLayout } from '@/layout';
import {  Modal } from 'antd';

let data = JSON.parse(localStorage.getItem('auth'))
let user = data.current

var role
var adminLevel
var permissions
var isSAAS

function SidePanelTopContent({ config, formElements, withUpload }) {

  const entity = config.entity
  const translate = useLanguage();
  const { crudContextAction, state } = useCrudContext();

  const { deleteModalLabels } = config;
  const { modal, editBox } = crudContextAction;
  const { isReadBoxOpen, isEditBoxOpen } = state;
  const { result: currentItem } = useSelector(selectCurrentItem);

  const dispatch = useDispatch();
  const [labels, setLabels] = useState('');

  useEffect(() => {
    if (currentItem) {
      const currentlabels = deleteModalLabels.map((x) => currentItem[x]).join(' ');
      setLabels(currentlabels);
    }
  }, [currentItem]);

  const removeItem = () => {
    dispatch(crud.currentAction({ actionType: 'delete', data: currentItem }));
    modal.open();
    // dispatch(crud.list({ entity }));

  };



  const editItem = () => {
   
    dispatch(crud.currentAction({ actionType: 'update', data: currentItem }));
    editBox.open();
  };

  const [admin, setAdmin] = useState([]);
  const [authUser, setAuthUser] = useState({});
  useEffect(() => {
    data = JSON.parse(localStorage.getItem('auth'))
    user = data.current
    setAuthUser(user)
    setAdmin(user?.role_id)
  }, [])
  role = user?.role_id
  adminLevel = role?.admin_level
  permissions = role?.permissions
  isSAAS = role?.is_saas

  const show = isReadBoxOpen || isEditBoxOpen ? { opacity: 1 } : { opacity: 0 };
  return (
    <>
    
      <Row style={show} gutter={(24, 24)}>
        <Col span={10}>
          <p style={{ marginBottom: '10px' }}>{labels}</p>
        </Col>
        <Col span={14}>
          {(permissions?.[entity + '_delete'] || isSAAS == true) ? <Button
            onClick={removeItem}
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            style={{ float: 'right', marginLeft: '5px', marginTop: '10px' }}
          >
            {translate('remove')}
          </Button>
          
            : ""
          }
          {(permissions?.[entity + '_edit'] || isSAAS == true) ?
            <Button
              onClick={editItem}
              type="text"
              icon={<EditOutlined />}
              size="small"
              style={{ float: 'right', marginLeft: '0px', marginTop: '10px' }}
            >
              {translate('edit')}
            </Button>
            : ""
          }
        </Col>

        <Col span={24}>
          <div className="line"></div>
        </Col>
        <div className="space10"></div>
      </Row>
      <ReadItem config={config} />
      <UpdateForm config={config} formElements={formElements} withUpload={withUpload} />
    </>
  );
}

function FixHeaderPanel({ config }) {
  const entity = config.entity
  role = user?.role_id
  permissions = role?.permissions
  isSAAS = role?.is_saas
  const { crudContextAction } = useCrudContext();
  const { collapsedBox } = crudContextAction;

  const addNewItem = () => {
    collapsedBox.close();
  };

  return (
    <Row gutter={8}>
      <Col className="gutter-row" span={21}>
        {(permissions?.[entity + '_read'] || isSAAS == true) ?
          <SearchItem config={config} />
          : ""}
      </Col>
      <Col className="gutter-row" span={3}>
        {(permissions?.[entity + '_create'] || isSAAS == true) ?
          <Button onClick={addNewItem} block={true} icon={<PlusOutlined />}></Button>
          : ""}
      </Col>
    </Row>
  );
}

function CrudModule({ config, createForm, updateForm, withUpload = false }) {


  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(crud.resetState());
  }, []);

  return (
    <CrudLayout
      config={config}
      fixHeaderPanel={<FixHeaderPanel config={config} />}
      sidePanelBottomContent={<CreateForm config={config} formElements={createForm} withUpload={withUpload} />}
      sidePanelTopContent={
        <SidePanelTopContent config={config} formElements={updateForm} withUpload={withUpload} />
      }
    >
      <DataTable config={config} />
      <DeleteModal config={config} />
    </CrudLayout>
  );
}

export default CrudModule;
