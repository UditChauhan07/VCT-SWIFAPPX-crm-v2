import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import WorkOrderForm from '@/modules/WorkOrderModule/Forms/WorkOrderForm';

export default function CreateWorkOrderModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={WorkOrderForm} />
    
    </ErpLayout>
  );
}
