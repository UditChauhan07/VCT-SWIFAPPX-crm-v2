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
    // {
    //   title: translate('Company'),
    //   dataIndex: ['company_id', 'name'],
    // },
    {
      title: translate('Slug'),
      dataIndex: 'slug',
    },
    {
      title: translate('User Level'),
      dataIndex: 'admin_level',
      render: (adminLevel) => {
        let userLevelString = '';
        switch (adminLevel) {
          case 1:
            userLevelString = translate('Swif SAAS Level');
            break;
          case 2:
            userLevelString = translate('Service Provider');
            break;
          // case 3:
          //   userLevelString = translate('End Customer');
          //   break;
          default:
            userLevelString = translate('End Customer');
            break;
        }
        return userLevelString;
      },
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => dayjs(date).format(dateFormat),
    },
  ];

  const entity = 'roles';
  console.log({ entity });
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
