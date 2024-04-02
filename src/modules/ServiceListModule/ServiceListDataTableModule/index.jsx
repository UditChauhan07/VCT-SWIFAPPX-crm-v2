import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';

export default function ServiceListDataTableModule({ config }) {
    return (
        <ErpLayout>
            <ErpPanel config={config}></ErpPanel>
        </ErpLayout>
    );
}