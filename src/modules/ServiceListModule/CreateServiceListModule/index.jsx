import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import ServiceListForm from '@/modules/ServiceListModule/Forms/ServiceListForm';

export default function CreateServiceListModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={ServiceListForm} />
    </ErpLayout>
  );
}
