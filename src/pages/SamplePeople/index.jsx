import CrudModule from '@/modules/CrudModule/CrudModule';
import SampleForm from '@/forms/SampleForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function SamplePeople() {
  const translate = useLanguage();
  const entity = 'people';
  const searchConfig = {
    displayLabels: ['firstname', 'lastname'],
    searchFields: 'firstname,lastname',
  };
  const deleteModalLabels = ['firstname', 'lastname'];

  const Labels = {
    PANEL_TITLE: translate('person'),
    DATATABLE_TITLE: translate('people_list'),
    ADD_NEW_ENTITY: translate('add_new_person'),
    ENTITY_NAME: translate('person'),
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
      createForm={<SampleForm fields={fields} />}
      updateForm={<SampleForm fields={fields} />}
      config={config}
    />
  );
}
