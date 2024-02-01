import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Worker() {
  const translate = useLanguage();
  const entity = 'worker';
  const searchConfig = {
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
  };
  const deleteModalLabels = ['firstname', 'lastname'];

  const Labels = {
    PANEL_TITLE: translate('worker'),
    DATATABLE_TITLE: translate('worker_list'),
    ADD_NEW_ENTITY: translate('add_new_worker'),
    ENTITY_NAME: translate('worker'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}