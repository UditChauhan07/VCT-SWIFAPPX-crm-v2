import useLanguage from '@/locale/useLanguage';
import CreateServiceListModule from '@/modules/ServiceListModule/CreateServiceListModule';

export default function ServiceListCreate() {
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
    return <CreateServiceListModule config={configPage} />;
}
