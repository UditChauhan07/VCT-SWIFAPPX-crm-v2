import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields, readColumns } from './config';
import useLanguage from '@/locale/useLanguage';
import { useParams } from 'react-router-dom';

export default function Address() {
  const translate = useLanguage();
  const entity = 'clientaddress';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];
  let { id } = useParams();
  
  const Labels = {
    PANEL_TITLE: translate('clientaddress'),
    DATATABLE_TITLE: translate('client_address_list'),
    ADD_NEW_ENTITY: translate('add_new_client_address'),
    ENTITY_NAME: translate('clientaddress'),
  };
  
  const configPage = {
    entity,
    ...Labels,
  };
  
  const config = {
    ...configPage,
    fields,
    readColumns,
    searchConfig,
    deleteModalLabels,
    id
  };

  return (  

    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}

