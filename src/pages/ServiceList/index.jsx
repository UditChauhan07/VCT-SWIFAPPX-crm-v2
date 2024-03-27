import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';
import ServiceListDataTableModule from '@/modules/ServiceListModule/ServiceListDataTableModule';
import useLanguage from '@/locale/useLanguage';


export default function Customer() {
  const translate = useLanguage();
  const entity = 'servicelist';
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
      title: translate('Subscription Type'),
      dataIndex: ['subscriptionType'],
    },
    {
      title: translate('Description'),
      dataIndex: ['description'],
    },
    {
      title: translate('Enabled'),
      dataIndex: 'enable',
      render: (status) => {
        let tagStatus = tagColor(status);

        return (
          <Tag color={tagStatus.color}>
            {/* {tagStatus.icon + ' '} */}
            {status && translate(tagStatus.label)}
          </Tag>
        );
      },
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('service_list'),
    DATATABLE_TITLE: translate('service_list'),
    ADD_NEW_ENTITY: translate('add_service_list'),
    ENTITY_NAME: translate('service_list'),
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

  return <ServiceListDataTableModule config={config} />;
}
