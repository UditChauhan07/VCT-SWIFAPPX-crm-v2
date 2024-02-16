import useLanguage from '@/locale/useLanguage';
import CreateCompanyModule from '@/modules/CompanyModule/CreateCompanyModule/index';

export default function CompanyCreate() {
  const translate = useLanguage();

  const entity = 'company';
  const Labels = {
    PANEL_TITLE: translate('company'),
    DATATABLE_TITLE: translate('company_list'),
    ADD_NEW_ENTITY: translate('add_new_company'),
    ENTITY_NAME: translate('company'),
  };

  const configPage = {
    entity,
    ...Labels,
  };

  return <CreateCompanyModule config={configPage} />;
}
