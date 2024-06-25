import useLanguage from '@/locale/useLanguage';
import ReadContractModule from '@/modules/ContractModule/ReadContractModule';

export default function ContractRead() {
    const translate = useLanguage();

    const entity = 'contract';

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
    return <ReadContractModule config={configPage} />
}
