import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { dataForRead } from '@/utils/dataStructure';
import { useCrudContext } from '@/context/crud';
import { selectCurrentItem } from '@/redux/crud/selectors';
import { valueByString } from '@/utils/helpers';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';


export default function ReadItem({ config }) {

  console.log( config )
  const { dateFormat } = useDate();
  let { readColumns, fields } = config;

  const translate = useLanguage();
  const { result: currentResult } = useSelector(selectCurrentItem);
  const { state } = useCrudContext();
  const { isReadBoxOpen } = state;
  const [listState, setListState] = useState([]);
 
  const readFields = !readColumns ? fields : readColumns
  if (fields) readColumns = [...dataForRead({ fields: readFields, translate: translate })];
  useEffect(() => {
    const list = [];
    readColumns.map((props) => {
      const propsKey = props.dataIndex;
      const propsTitle = props.title;
      const isDate = props.isDate || false;
      let value = valueByString(currentResult, propsKey);
      value = isDate  ? dayjs(value).format(dateFormat) : value;
      list.push({ propsKey, label: propsTitle, value: value });
    });
    setListState(list);
  }, [currentResult]);

  const show = isReadBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };




  const itemsList = listState.map((item) => {
    // console.log(item)
    // console.log({ listState })
    return (
      <Row key={item.propsKey} gutter={12}>
        <Col className="gutter-row" span={12}>
          <p>{translate(item.label)}</p>
        </Col>
        <Col className="gutter-row" span={2}>
          <p> : </p>
        </Col>
        <Col className="gutter-row" span={10}>
          {/* <p>{translate(item.value)}</p> */}
          {/* <p>{item.value}</p> */}
          <p> 
  {item.value === 'true' 
    ? 'Active' 
    : item.value === 'false' 
      ? 'Inactive' 
      : item.value}
</p>
        </Col>
      </Row>
    );
  });



  return <div style={show}>{itemsList}</div>;
}
