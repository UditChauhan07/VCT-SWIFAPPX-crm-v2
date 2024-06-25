
const [WorkLead, setWorkLead] = useState()

useEffect(() => {
    const fetchData2 = async () => {
        try {
            const response = await request.getLeadWorker();
            if (response.success) {
                setWorkLead(response.result)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData2()
}, []);

const filteredWorkLead = WorkLead?.filter((item) => item._id !== Workers);





{/* <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: "20px" }}>
            
<Col className="gutter-row" span={8}>
    <Form.Item
        name='LeadWorker'

        label={translate('Lead Worker')}
        rules={[
            {
                required: true,
            },
        ]}
    >
        <Select
            style={{
                width: '100%',
            }}
            onChange={(event) => setWorkers(event)}
        >
            {WorkLead?.map((option, index) => (
                <Select.Option key={option._id} value={option._id} >{option.name}</Select.Option>
            ))}
        </Select>
    </Form.Item>
</Col>

<Col className="gutter-row" span={8}>
    <Form.Item
        name="SelectWorkers"
        label={translate('Select Workers')}
        rules={[
            {
                required: true,
            },
        ]}
    >
        <Select
            style={{
                width: '100%',
            }}
            mode="multiple"
        >
            {filteredWorkLead?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
            ))}
        </Select>
    </Form.Item>
</Col>
</Row> */}
<Divider dashed />