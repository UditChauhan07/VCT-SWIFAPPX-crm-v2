import useLanguage from '@/locale/useLanguage';
import CreateContractModule from '@/modules/Convert_QT_to_Contract/CreateContract';


export default function ContractCreate() {
    const translate = useLanguage();

    const entity = 'contract';

    const Labels = {
        PANEL_TITLE: translate('contract'),
        DATATABLE_TITLE: translate('contract'),
        ADD_NEW_ENTITY: translate('contract'),
        ENTITY_NAME: translate('contract'),
    };

    const configPage = {
        entity,
        ...Labels,
    };
    return <CreateContractModule config={configPage} />;
}
