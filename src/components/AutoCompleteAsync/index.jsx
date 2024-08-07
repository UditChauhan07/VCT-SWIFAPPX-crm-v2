import { useState, useEffect, useRef } from 'react';

import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import useDebounce from '@/hooks/useDebounce';
import { Spin } from 'antd';
import { Select, Empty, Input } from 'antd';

export default function AutoCompleteAsync({
  entity,
  displayLabels,
  searchFields,
  outputValue = '_id',  
  value, /// this is for update
  onChange, /// this is for update
  client,
  defaultValue

}) 



{ 
 console.log(defaultValue)

  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const isUpdating = useRef(true);
  const isSearching = useRef(false);

  const [searching, setSearching] = useState(false);
 
  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);


const [, cancel] = useDebounce(
    () => {
     
      setDebouncedValue(valToSearch);
    },
    500,
    [valToSearch]
  );

  const asyncSearch = async (options) => {

    const response = await request.search({ entity, options });
    console.log({ entity, options })
    if (response.success) {
      const data = await response.result;
      const firstResult = data[0];
      setSearchResult(firstResult);
    }
    return response;
  };


  let { onFetch, result, isSuccess, isLoading } = useOnFetch();

  const labels = (optionField) => {
    return displayLabels?.map((x) => optionField[x]).join(' ');
  };

  useEffect(() => {
    if (debouncedValue != '') {
      const options = {
        q: debouncedValue,
        fields: searchFields,
      };
      const callback = asyncSearch(options);
      onFetch(callback);
    }

    return () => {
      cancel();
    };
  }, [debouncedValue]);



  const onSearch = (searchText) => {
    if (searchText && searchText != '') {
      isSearching.current = true;
      setSearching(true);
      setOptions([]);
      setCurrentValue(undefined);
      setValToSearch(searchText);
    }
  };

  useEffect(() => {
    if (isSearching.current) {
      if (isSuccess) {
        setOptions(result);
      } else {
        setSearching(false);
        setCurrentValue(undefined);
        setOptions([]);
      }
    }
  }, [isSuccess, result]);
  useEffect(() => {

    if (value && isUpdating.current) {
      if (!isSearching.current) {
        setOptions([value]);
      }
      setCurrentValue(value[outputValue] || value); // set nested value or value
      onChange(value[outputValue] || value);
      isUpdating.current = false;
    }
  }, [value]);

  return (
    <Select
      loading={isLoading}
      showSearch
      allowClear
      placeholder={'Search Here'}
      defaultActiveFirstOption={false}
      defaultValue={defaultValue}
      filterOption={false}
      notFoundContent={searching ? <Spin size="small" />  : <Empty />}
      // value={currentValue}
      onSearch={onSearch}
      onChange={(newValue) => {
    
        if (onChange) {
          if (newValue) onChange(newValue[outputValue] || newValue);
        }
      }}
      onClear={() => {
        setOptions([]);
        setCurrentValue(undefined);
        setSearching(false);
      }}
    >
      {selectOptions?.map((optionField) => (
        
        <Select.Option
        
          key={optionField[outputValue] || optionField}
          value={optionField[outputValue] || optionField}
        >
          {labels(optionField)}
        </Select.Option>
      ))}
    </Select>
  );
}
