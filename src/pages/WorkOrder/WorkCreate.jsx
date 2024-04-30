import useLanguage from '@/locale/useLanguage';
import CreateWorkOrderModule from '@/modules/WorkOrderModule/CreateWorkOrderModule';

export default function WorkOrderCreate() {
  const translate = useLanguage();

  const entity = 'workorder';

  const Labels = {
    PANEL_TITLE: translate('workorder'),
    DATATABLE_TITLE: translate('workorder'),
    ADD_NEW_ENTITY: translate('workorder'),
    ENTITY_NAME: translate('workorder'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateWorkOrderModule config={configPage} />;
}
