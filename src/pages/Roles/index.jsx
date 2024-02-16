import dayjs from 'dayjs';

import RoleDataTableModule from '@/modules/RoleModule/RoleDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

export default function Role() {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];
  const dataTableColumns = [
    {
      title: translate('Name'),
      dataIndex: 'name',
    },
    {
      title: translate('Company'),
      dataIndex: ['company_id', 'name'],
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => dayjs(date).format(dateFormat),
    },
    {
      title: translate('Slug'),
      dataIndex: 'slug',
    },
  ];

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
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return <RoleDataTableModule config={config} />;
}
