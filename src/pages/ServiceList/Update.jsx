import useLanguage from '@/locale/useLanguage';
import UpdateServiceListModule from '@/modules/ServiceListModule/UpdateServiceListModule';

export default function ServiceListUpdate() {
    const translate = useLanguage();

    const entity = 'servicelist';

    const Labels = {
        PANEL_TITLE: translate('servicelist'),
        DATATABLE_TITLE: translate('servvice_list'),
        ADD_NEW_ENTITY: translate('add_new_servicelist'),
        ENTITY_NAME: translate('servicelist'),
    };

    const configPage = {
        entity,
        ...Labels,
    };
    return <UpdateServiceListModule config={configPage} />;
}
