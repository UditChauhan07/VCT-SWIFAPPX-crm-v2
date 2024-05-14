import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import ContractForm from '@/modules/ContractModule/Forms/ContractForm';

export default function CreateContractModule({ config }) {
    return (
        <ErpLayout>
            <CreateItem config={config} CreateForm={ContractForm} />
        </ErpLayout>
    );
}