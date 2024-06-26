import { Tag, Switch } from 'antd';
import { tagColor } from '@/utils/statusTagColor';
import ServiceListDataTableModule from '@/modules/ServiceListModule/ServiceListDataTableModule';
import useLanguage from '@/locale/useLanguage';
import { useEffect, useState } from 'react';


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
      title: translate('Service Category'),
      dataIndex: 'serviceCategory',
      render: (serviceCategory) => (
            
        <span>
          <Tag color='#6f42c1'>
            {serviceCategory.name}
          </Tag>
        </span >
      ),
    },
    {
      title: translate('Description'),
      dataIndex: ['description'],
      
    },
    
    {
      title: translate('Status'),
      dataIndex: 'enabled',
      render: (status) => {
        if (status) {
          return (
            <Switch checked={true} />
          );
        } else {
          return (
            <Switch checked={false} />
          );
        }
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
