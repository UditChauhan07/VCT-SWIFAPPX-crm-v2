import dayjs from 'dayjs';
import { Tag } from 'antd';
import { tagColor } from '@/utils/statusTagColor';

import ContractDataTableModule from '@/modules/ContractModule/ContractDataTableModule';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

export default function Workorder() {
    const translate = useLanguage();
    const { dateFormat } = useDate();
    const entity = 'contract';
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
            dataIndex: 'grandTotal',
            onCell: () => {
                return {
                    style: {
                        textAlign: 'right',
                        whiteSpace: 'nowrap',
                    },
                };
            },
            render: (total) => moneyFormatter({ amount: total }),
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
        PANEL_TITLE: translate('contract'),
        DATATABLE_TITLE: translate('contract_list'),
        ADD_NEW_ENTITY: translate('add_new_contract'),
        ENTITY_NAME: translate('contract'),
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
    return <ContractDataTableModule config={config} />;
}
