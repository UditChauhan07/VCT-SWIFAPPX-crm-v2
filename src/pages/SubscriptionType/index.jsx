import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields, readColumns } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Customer() {
  const translate = useLanguage();
  const entity = 'subscriptiontype';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('subscription_type'),
    DATATABLE_TITLE: translate('subscription_type_list'),
    ADD_NEW_ENTITY: translate('add_subscription_type'),
    ENTITY_NAME: translate('subscription_type'),
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
  };

  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} entity={entity} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
