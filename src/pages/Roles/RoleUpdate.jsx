import useLanguage from '@/locale/useLanguage';
import UpdateRoleModule from '@/modules/RoleModule/UpdateRoleModule';

export default function RoleUpdate() {
  const translate = useLanguage();

  const entity = 'roles';
  const Labels = {
    PANEL_TITLE: translate('roles'),
    DATATABLE_TITLE: translate('role_list'),
    ADD_NEW_ENTITY: translate('add_new_role'),
    ENTITY_NAME: translate('roles'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <UpdateRoleModule config={configPage} />;
}
