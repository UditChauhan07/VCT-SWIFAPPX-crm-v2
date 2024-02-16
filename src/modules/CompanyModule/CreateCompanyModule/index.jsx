import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import CompanyForm from '@/modules/CompanyModule/Forms/CompanyForm';

export default function CreateCompanyModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={CompanyForm} />
    </ErpLayout>
  );
}
