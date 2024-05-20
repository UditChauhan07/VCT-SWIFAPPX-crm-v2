import useLanguage from '@/locale/useLanguage';
import ReadWorkOrderModule from '@/modules/WorkOrderModule/ReadWorkOrderModule';


export default function QuoteRead() {
    const translate = useLanguage();

    const entity = 'workorder';

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
    return <ReadWorkOrderModule config={configPage} /> 
}
