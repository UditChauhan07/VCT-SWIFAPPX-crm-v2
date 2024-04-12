import useLanguage from '@/locale/useLanguage';
import ReadServiceListModule from '@/modules/ServiceListModule/ReadServiceListModule';

export default function ServiceListRead() {
    const translate = useLanguage();

    const entity = 'servicelist';

    const Labels = {
        PANEL_TITLE: translate('quote'),
        DATATABLE_TITLE: translate('service_list'),
        ADD_NEW_ENTITY: translate('add_new_servicelist'),
        ENTITY_NAME: translate('servicelist'),
    };

    const configPage = {
        entity,
        ...Labels,
    };
    return <ReadServiceListModule config={configPage} />;
}
