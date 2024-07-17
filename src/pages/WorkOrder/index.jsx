import dayjs from 'dayjs';
import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';
import WorkOrderDataTableModule from '@/modules/WorkOrderModule/WorkDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

export default function Workorder() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'workorder';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = [];//['number', 'client.name'];
  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'code',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('expired Date'),
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    // {
    //   title: translate('Sub Total'),
    //   dataIndex: 'subTotal',
    //   onCell: () => {
    //     return {
    //       style: {
    //         textAlign: 'right',
    //         whiteSpace: 'nowrap',
    //       },
    //     };
    //   },
    //   render: (subTotal) => moneyFormatter({ amount: subTotal }),
    // },
    {
      title: translate('grand_total'),
      dataIndex: 'serviceCost',
      onCell: () => ({
        style: {
          textAlign: 'right',
          whiteSpace: 'nowrap',
        },
      }),
      render: (serviceCost, record) => {
        // Assuming serviceCost and additionalCost are keys in your data record
        const { additionalCost } = record;
        const total = additionalCost?.totalPackageCost + serviceCost?.totalPackageCost;
        return moneyFormatter({ amount: total });
      },
    },

    // {
    //   title: translate('Status'),
    //   dataIndex: 'status',
    //   render: (status) => {
    //     let tagStatus = tagColor(status);

    //     return (
    //       <Tag color={tagStatus.color}>
    //         {/* {tagStatus.icon + ' '} */}
    //         {status && translate(tagStatus.label)}
    //       </Tag>
    //     );
    //   },
    // },
  ];

  const Labels = {
    PANEL_TITLE: translate('workorder'),
    DATATABLE_TITLE: translate('workorder_list'),
    ADD_NEW_ENTITY: translate('add_new_workorder'),
    ENTITY_NAME: translate('workorder'),
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
  return <WorkOrderDataTableModule config={config} />;
}
