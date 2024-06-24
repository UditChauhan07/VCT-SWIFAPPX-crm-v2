// import { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import {
//   Collapse,
//   Form,
//   Input,
//   InputNumber,
//   Button,
//   Select,
//   Divider,
//   Row,
//   Col,
//   Radio,
//   Checkbox,
//   Table,
// } from 'antd';

// import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

// import { DatePicker, TimePicker } from 'antd';

// import AutoCompleteAsync from '@/components/AutoCompleteAsync';

// import QuoteItemRow from '@/modules/ErpPanelModule/QuoteItemRow';
// // import ItemRow from '@/modules/ErpPanelModule/ItemRow';

// import MoneyInputFormItem from '@/components/MoneyInputFormItem';
// import { selectFinanceSettings } from '@/redux/settings/selectors';
// import { useMoney, useDate } from '@/settings';
// import useLanguage from '@/locale/useLanguage';

// import calculate from '@/utils/calculate';
// import { useSelector } from 'react-redux';
// import SelectAsync from '@/components/SelectAsync';
// import { response } from './jsonResponse';
// import styles from './styles.module.css'; // Import the CSS module

// import { useForm } from 'antd/lib/form/Form';
// import { request } from '@/request';
// import ItemRow from '@/modules/ErpPanelModule/ItemRow';
// const { Option } = Select;
// const { Panel } = Collapse;

// export default function WorkOrderForm({ subTotal = 0, current = null }) {
//   const { last_quote_number } = useSelector(selectFinanceSettings);

//   return <LoadQuoteForm subTotal={subTotal} current={current} />;
// }
// function LoadQuoteForm({ subTotal = 0, current = null }) {
//   const translate = useLanguage();
//   const { dateFormat } = useDate();
//   const { last_quote_number } = useSelector(selectFinanceSettings);
//   const [lastNumber, setLastNumber] = useState(() => last_quote_number + 1);
//   const [total, setTotal] = useState(0);
//   const [taxRate, setTaxRate] = useState(0);
//   const [taxTotal, setTaxTotal] = useState(0);
//   const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
//   const [active, IsActive] = useState(1);
//   const [activeness, IsActiveness] = useState(1);
//   const [activeSelect, IsActiveSelect] = useState(1);
//   const [isMainid, seTisMainid] = useState();

//   const handelTaxChange = (value) => {
//     setTaxRate(value / 100);
//   };
//   const { TextArea } = Input;
//   const money = useMoney();
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
//   const [serviceCategory, setserviceCategory] = useState([]);
//   const [subscriptiononetime, setsubscriptiononetime] = useState([]);

//   const [SalesPerson, setSalesPerson] = useState();
//   const [WorkLead, setWorkLead] = useState();
//   const [Workers, setWorkers] = useState();
//   const [CheckedId, setCheckedId] = useState();
//   // console.log(CheckedId)
//   const [customerAddress, setCustomerAddress] = useState([]);
//   const [customerSelect, setcustomSelect] = useState();
//   const [subscriptionData, setSubscriptionData] = useState({});
//   const [accordionData, setAccordionData] = useState([]);
//   const [serviceCategoryOptions, setserviceCategoryOptions] = useState([]);
//   const [selectedSalesPerson, setSelectedSalesPerson] = useState();

//   const handleDropdownChange = async (value) => {
//     setSelectedOption(value);
//     try {
//       // const response = await axios.get(`client/search?q=${value}&fields=label`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
//       // console.log(response)
//       setAccordionData(response); // Assuming the response contains an array of accordion data
//     } catch (error) {
//       console.error('Error fetching accordion data:', error);
//     }
//   };

//   useEffect(() => {
//     if (current) {
//       const { taxRate = 0, year, number } = current;
//       setTaxRate(taxRate / 100);
//       setCurrentYear(year);
//       setLastNumber(number);
//     }
//   }, [current]);
//   useEffect(() => {
//     const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
//     setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)));
//     setTotal(Number.parseFloat(currentTotal));
//   }, [subTotal, taxRate]);

//   const addField = useRef(null);

//   useEffect(() => {
//     // Check if addField.current is not null before clicking
//     if (addField.current) {
//       addField.current.click();
//     }
//   }, []); // This effect runs only once when the component mounts

//   // console.log({ serviceOptions });

//   const [productList, setProductList] = useState([]);

//   const [tax, setTax] = useState({});

//   useEffect(() => {
//     getProductHandler();
//     // getClientHandler()
//   }, []);
//   const getProductHandler = async () => {
//     try {
//       const productListRes = await request.getProductList();
//       if (productListRes.success) {
//         const taxHandller = await request.getTax();
//         if (taxHandller.success) {
//           setTax(taxHandller.result);
//         }
//         setProductList(productListRes.result);
//       } else {
//         setProductList([]);
//       }
//       // console.log({ productList });
//     } catch (er) {
//       console.error({ er });
//     }
//   };

//   const [selectedValue, setSelectedValue] = useState('');
//   const [serviceOptions, setServiceOptions] = useState(null);
//   const [ShowServiceList, setShowServiceList] = useState(null);
//   const [ShowServiceId, setShowServiceId] = useState();
//   // console.log(ShowServiceId)
//   const [isSubId, setSubId] = useState({});
//   // console.log(isSubId)

//   const getCategorySubscriptionHandler = (value) => {
//     setSelectedValue(value);

//     const fetchData2 = async () => {
//       try {
//         const response = await request.getCateGorySubscription({ id: value });

//         if (response.success) {
//           setServiceOptions(response.result);
//           getProductHandler();
//         } else {
//           setServiceOptions(null);
//         }
//       } catch (error) {
//         setServiceOptions(null);
//         console.error('Error fetching data:', error);
//       }
//     };

//     const fetchData3 = async () => {
//       try {
//         const response = await request.getServiceListShow({ id: value });
//         if (response.success) {
//           setShowServiceList(response.result);
//           setProductList(ShowServiceList);
//         } else {
//           setShowServiceList(null);
//         }
//       } catch (error) {
//         setShowServiceList(null);
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData2();
//     fetchData3();
//   };

//   const handleFirstDropdownChange = async (event) => {
//     try {
//       const response = await request.getSearchClientAddress(event);
//       console.log('response', response);
//       if (response.success) {
//         setCustomerAddress(response.result);
//         // Set options state based on API response
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const getServicesSubAndItems = async (event) => {
//     // const selectedValue = event.target.value;
//     // setSelectedOption(selectedValue);

//     // Make API request with the selected value
//     try {
//       // const response = await fetch(`your_api_endpoint/${selectedValue}`);
//       const data = [
//         { value: '1', label: 'Home' },
//         { value: '3', label: 'Billing' },
//         { value: '4', label: 'Shipping' },
//       ];
//       // Extract options from the API response
//       const extractedOptions = data.map((item) => ({
//         value: item.value,
//         label: item.label,
//       }));

//       // Update the options for the second dropdown
//       setSecondDropdownOptions(extractedOptions);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const [accordionActiveKey, setAccordionActiveKey] = useState([]);
//   const handleChange = (key) => {
//     setAccordionActiveKey(key);
//   };
//   // const translate = useLanguage();
//   const [totalState, setTotal2] = useState(undefined);
//   const [price, setPrice] = useState();

//   const [name, setName] = useState('');
//   const [quantity, setQuantity] = useState(0);

//   // const money = useMoney();
//   const updateQt = (value) => {
//     setQuantity(value);
//   };
//   const updatePrice = (value) => {
//     console.log(value);
//     setPrice(value);
//   };
//   const updateName = (value) => {
//     setName(value);
//   };
//   const [form] = useForm();

//   useEffect(() => {
//     if (current) {
//       const { items, invoice } = current;
//       console.log(items);
//       if (invoice) {
//         const item = invoice[field.fieldKey];
//         if (item) {
//           setQuantity(item.quantity);
//           setPrice(item.price);
//         }
//       } else {
//         const item = items[field.fieldKey];
//         if (item) {
//           setQuantity(item.quantity);
//           setPrice(item.price);
//         }
//       }
//     }
//   }, [current]);

//   useEffect(() => {
//     const currentTotal = calculate.multiply(price, quantity);
//     console.log(currentTotal);
//     setTotal2(currentTotal);
//   }, [price, quantity]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await request.getServiceCategoryOptions();
//         if (response.success) {
//           setserviceCategoryOptions(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // --------- WORK ORDER MODULE -----------

//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response = await request.getSalesPerson();
//         if (response.success) {
//           setSalesPerson(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData1();
//   }, []);

//   useEffect(() => {
//     const fetchData2 = async () => {
//       try {
//         const response = await request.getLeadWorker();
//         if (response.success) {
//           setWorkLead(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData2();
//   }, []);

//   useEffect(() => {
//     const fetchData3 = async () => {
//       try {
//         const response = await request.getServiceCategory();
//         if (response.success) {
//           setserviceCategory(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData3();
//   }, []);

//   const [salesContactNumber, setSalesContactNumber] = useState();
//   useEffect(() => {
//     if (selectedSalesPerson) {
//       let number = SalesPerson?.find((option) => option._id === selectedSalesPerson)?.phone;
//       setSalesContactNumber(number);
//       ContactHandler({ salesContactNumber: number });
//       let saleRepConElement = document.getElementById('salesContactNumber');
//       saleRepConElement.value = number || null;
//       // console.log({ number, salesContactNumber });
//     }
//   }, [selectedSalesPerson, salesContactNumber]);

//   useEffect(() => {}, [selectedSalesPerson]);
//   const ContactHandler = ({ salesContactNumber }) => {
//     return (
//       <Form.Item
//         label={translate('Sales Person Contact')}
//         name="salesPersonContact"
//         rules={[
//           {
//             required: true,
//           },
//         ]}
//         initialValue={salesContactNumber}
//       >
//         <Input
//           style={{
//             width: '100%',
//           }}
//           placeholder=""
//           id="salesContactNumber"
//           value={salesContactNumber}
//         />
//       </Form.Item>
//     );
//   };

//   const filteredWorkLead = WorkLead?.filter((item) => item._id !== Workers);

//   const getUniqueSubscriptionNames = () => {
//     const subscriptionNames = [];
//     ShowServiceId.forEach((ele) => {
//       ele.data.forEach((item) => {
//         if (!subscriptionNames.includes(item.name)) {
//           subscriptionNames.push(item.name);
//         }
//       });
//     });
//     return subscriptionNames;
//   };

//   const generateColumns = () => {
//     const subscriptionNames = getUniqueSubscriptionNames();
//     const columns = [
//       {
//         title: 'Subscription',
//         dataIndex: 'Subscription',
//       },
//     ];

//     subscriptionNames.forEach((name) => {
//       columns.push({
//         title: <span>{name}</span>,
//         dataIndex: name,
//       });
//     });

//     return columns;
//   };

//   // const generateTableData = () => {
//   //   const subscriptionNames = getUniqueSubscriptionNames();
//   //   const tableData = [];
//   //   ShowServiceId.forEach((ele, index) => {
//   //     const rowData = {
//   //       Subscription: ele.subscription.name,
//   //     };

//   //     subscriptionNames.forEach((name) => {
//   //       const matchingItem = ele.data.find(item => item.name === name);
//   //       rowData[name] = matchingItem ? (
//   //         <Radio value="1">{`${matchingItem.price}.00 /One Time`}</Radio>
//   //       ) : null;
//   //     });

//   //     tableData.push(rowData);
//   //   });
//   //   return tableData;
//   // };

//   // EDITABLE
//   //cal handler
//   const [subscriptionIds, setSubscriptionIds] = useState([]);
//   const [subscriptionCount, setSubscriptionCount] = useState(0);

//   const handleRadioChange = (e, id) => {
//     // let temp = subscriptionIds;
//     // if (temp.includes(id)) {
//     //   temp.slice(temp.indexOf(id))
//     // } else {
//     //   temp.push(id)
//     // }
//     setSubscriptionIds(id);
//     // console.log(id)
//     localStorage.setItem('WO-RadioId', id);

//     //  let SubModule = id;

//     // setSubscriptionIds(temp);
//     // setSubscriptionIds(temp);
//     setSubscriptionCount(subscriptionIds.length);

//     const { value } = e.target;
//     setSubId((prevState) => {
//       const updatedState = { ...prevState };
//       Object.keys(updatedState).forEach((key) => {
//         if (key !== id) {
//           updatedState[key] = undefined;
//         }
//       });
//       updatedState[id] = value;
//       return updatedState;
//     });

//     for (const subscriptionObj of ShowServiceId) {
//       for (const dataObj of subscriptionObj.data) {
//         if (dataObj._id === id) {
//           return localStorage.setItem('WorkOrderSubId', subscriptionObj.subscription._id);
//           seTisMainid(subscriptionObj.subscription._id);
//         }
//       }
//     }
//     return null;
//   };

//   const [Subitems, setItems] = useState([]);
//   const [subItemIds, setSubItemId] = useState([]);
//   const [subItemCount, setSubItemCount] = useState(0);
//   const [quantityvalue, setQuantiyvalue] = useState();
//   useEffect(() => {}, [subscriptionCount, subItemCount]);
//   const [adjustmentvalue, setadjustment] = useState(null);
//   const [discountValue, setdiscount] = useState(null);
//   let subscriptionSubTotal = 0;

//   const HiddenFieldHandler = (name, value) => {
//     return (
//       <Form.Item name={name} style={{ width: 0, height: 0, margin: 0 }} initialValue={value}>
//         <Input type="hidden" id={name} value={value} />
//       </Form.Item>
//     );
//   };

//   let subscritionAmount = 0;
//   let serviceCost = {
//     servicePerWO: null,
//     discount: null,
//     subTotal: null,
//     tax: null,
//     totalPackageCost: null,
//   };
//   let additionalCost = {
//     subTotal: null,
//     tax: null,
//     totalPackageCost: null,
//   };

//   const CalculatorFilled = () => {
//     return ShowServiceList.map((element, _id) =>
//       element.subscriptions.map((subscriptions, __id) =>
//         subscriptions.data.map((subscription, ___id) => {
//           let package_divider = parseInt(subscriptions.subscription.package_divider);
//           subscritionAmount = parseInt(subscription.price / package_divider);
//           let subTotal = parseInt(subscription.price / package_divider);
//           if (active == 2) {
//             subTotal += parseInt(adjustmentvalue);
//           }
//           if (active == 3) {
//             subTotal -= parseInt(adjustmentvalue);
//           }
//           let discount = 0;
//           if (discountValue) {
//             discount = subTotal * (parseInt(discountValue) / 100);
//             subTotal -= subTotal * (parseInt(discountValue) / 100);
//           }
//           let taxValue = 0;
//           if (tax.taxValue) {
//             taxValue = subTotal * (parseInt(tax.taxValue) / 100);
//           }
//           if (subscriptionIds.includes(subscription._id)) {
//             subscriptionSubTotal = subTotal + taxValue;
//             serviceCost.servicePerWO = parseFloat(subscription.price / package_divider).toFixed(2);
//             serviceCost.discount = parseFloat(discount || 0).toFixed(2);
//             serviceCost.subTotal = parseFloat(subTotal).toFixed(2);
//             serviceCost.tax = parseFloat(taxValue).toFixed(2);
//             serviceCost.totalPackageCost = parseFloat(subTotal + taxValue).toFixed(2);
//             localStorage.setItem('jv1GYkk6plxCpgx', parseFloat(subTotal + taxValue).toFixed(2));
//             localStorage.setItem('ZeFnMqDC7ktkKDB', JSON.stringify(serviceCost));
//             return (
//               <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
//                 <ul
//                   style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
//                 >
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '-1px',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {subscription.name}:{subscriptions.subscription.name}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(subscription.price / package_divider).toFixed(2)}/Workorder
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(adjustmentvalue || 0).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(discount || 0).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(subTotal).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(taxValue).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(subTotal + taxValue).toFixed(2)}
//                   </li>
//                 </ul>
//               </td>
//             );
//           }
//         })
//       )
//     );
//   };

//   const CalculatorFilledItem = () => {
//     let itemPrice = 0;
//     let discount = 0;

//     let taxValue = 0;
//     return (
//       <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
//         <ul style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '-1px',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {Subitems.map((item, index) => {
//               itemPrice += parseFloat(item.total);
//               console.log({ aa: item.total });
//               if (discountValue) {
//                 itemPrice -= itemPrice * (parseInt(discountValue) / 100);
//                 discount = (parseFloat(item.total) * parseInt(discountValue)) / 100;
//               }
//               if (tax.taxValue) {
//                 taxValue = parseFloat(itemPrice) * (parseInt(tax.taxValue) / 100);
//               }

//               localStorage.setItem(
//                 'jv1GYkk6plxCpgx',
//                 parseFloat(subscriptionSubTotal + itemPrice + taxValue).toFixed(2)
//               );
//               additionalCost.subTotal = parseFloat(itemPrice).toFixed(2);
//               additionalCost.tax = parseFloat(taxValue).toFixed(2);
//               additionalCost.totalPackageCost = parseFloat(
//                 subscriptionSubTotal + itemPrice + taxValue
//               ).toFixed(2);
//               localStorage.setItem('BQaBocV8yvv9ELm', JSON.stringify(additionalCost));
//               return (
//                 <>
//                   item:{item.name}
//                   {index != Subitems.length && <br />}
//                 </>
//               );
//             })}
//           </li>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {itemPrice.toFixed(2)}
//           </li>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {discount.toFixed(2)}
//           </li>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {itemPrice.toFixed(2)}
//           </li>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {(taxValue || 0).toFixed(2)}
//           </li>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {(itemPrice + taxValue).toFixed(2)}
//           </li>
//           <li
//             style={{
//               borderBottom: '1px solid rgb(217,217,217)',
//               fontSize: '15px',
//               marginTop: '',
//               color: 'rgb(49,91,140)',
//             }}
//           >
//             {parseFloat(subscriptionSubTotal + itemPrice + taxValue).toFixed(2)}
//           </li>
//         </ul>
//       </td>
//     );
//   };

//   // const ItemHandler = (element) => {
//   //   console.log(element)
//   //   setCheckedId(element.price);
//   //   let tempId = subItemIds;
//   //   let temp = Subitems;
//   //   element.total = element.price * quantityvalue
//   //   element.qty = 1
//   //   if (temp.length > 0) {
//   //     if (tempId.includes(element._id)) {
//   //       temp.map((item, index) => {
//   //         if (item._id == element._id) {
//   //           temp.splice(index)
//   //         }
//   //       })
//   //     } else {
//   //       temp.push(element)
//   //     }
//   //   } else {
//   //     temp.push(element)
//   //   }
//   //   if (tempId.includes(element._id)) {
//   //     tempId.splice(tempId.indexOf(element._id))
//   //   } else {
//   //     tempId.push(element._id)
//   //   }
//   //   setSubItemId(tempId)
//   //   setItems(temp)
//   //   setSubItemCount(temp.length)
//   // }

//   //  let ItemsArray = [];
//   //  console.log(ItemsArray)

//   const [itemsArray, setItemsArray] = useState([]);
//   // console.log('Updated ItemsArray:', itemsArray);

//   const [selectedItems, setSelectedItems] = useState([]);
//   console.log(selectedItems);

//   const ItemHandler = (element) => {
//     // console.log(element)
//     // setSelectedItems((prevSelectedItems) => {
//     //   if (prevSelectedItems.some((selectedItem) => selectedItem._id === element._id)) {
//     //     // Remove item if it's already selected
//     //     return prevSelectedItems.filter((selectedItem) => selectedItem._id !== element._id);
//     //   } else {
//     //     // Add item to the selected list
//     //     return [...prevSelectedItems, element];
//     //   }
//     // });

//     setItemsArray((prevItemsArray) => {
//       const itemIndex = prevItemsArray.findIndex((item) => item._id === element._id);
//       if (itemIndex !== -1) {
//         // Item already exists, remove it
//         return prevItemsArray.filter((item) => item._id !== element._id);
//       } else {
//         // Item doesn't exist, add it
//         return [...prevItemsArray, element];
//       }
//     });

//     const tempId = [...subItemIds];
//     const temp = [...Subitems];
//     element.total = element.price * (quantityvalue || 1);
//     element.qty = 1;

//     const selectedIndex = tempId.indexOf(element._id);
//     if (selectedIndex !== -1) {
//       tempId.splice(selectedIndex, 1);
//       const itemIndex = temp.findIndex((item) => item._id === element._id);
//       if (itemIndex !== -1) {
//         temp.splice(itemIndex, 1);
//       }
//     } else {
//       tempId.push(element._id);
//       temp.push(element);
//     }
//     setSubItemId(tempId);
//     setItems(temp);
//     setSubItemCount(temp.length);
//   };

//   const priceHandler = ({ id, price }) => {};

//   const AdjustmentValueHandler = (event) => {
//     setadjustment(event.target.value);
//     let subTotal = document.getElementById('subTotal');
//     subTotal.value = parseFloat(subscritionAmount + parseFloat(event.target.value));
//     console.log({ subTotal });
//   };
//   const DiscountValueHandler = (event) => {
//     setdiscount(event);
//   };

//   const generateTableData = () => {
//     const subscriptionNames = getUniqueSubscriptionNames();
//     const tableData = [];
//     ShowServiceId.forEach((ele, index) => {
//       const rowData = {
//         Subscription: ele.subscription.name,
//       };

//       subscriptionNames.forEach((name) => {
//         const matchingItem = ele.data.find((item) => item.name === name);

//         rowData[name] = matchingItem ? (
//           <Radio.Group
//             key={matchingItem._id}
//             value={isSubId[matchingItem._id]}
//             // value={matchingItem._id === isMainid ? isMainid : undefined}
//             onChange={(e) => handleRadioChange(e, matchingItem._id)}
//           >
//             <Radio value={matchingItem._id}>{`${matchingItem.price}.00 /One Time`}</Radio>
//           </Radio.Group>
//         ) : null;
//       });

//       tableData.push(rowData);
//     });
//     return tableData;
//   };

//   // One Time Subscription

//   useEffect(() => {
//     const handleoneTimeSubscription = async () => {
//       try {
//         const response = await request.getSubscriptiononetime();
//         if (response.success) {
//           setsubscriptiononetime(response.result._id);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     handleoneTimeSubscription();
//   }, []);

//   const optionsss = ['Addition', 'Substraction'];
//   // const [form] = Form.useForm();

//   // MULTIPLY LOGIC
//   // const [checkedId, setCheckedId] = useState(null);w
//   const [prices, setPrices] = useState({});
//   const [quantities, setQuantities] = useState({});

//   const [totals, setTotals] = useState({});
//   // console.log(totals)

//   useEffect(() => {
//     const initialPrices = {};
//     const initialQuantities = {};
//     const initialTotals = {};
//     productList?.map((ele) =>
//       ele.products?.forEach((product, index) => {
//         initialPrices[product._id] = product.price;
//         initialQuantities[product._id] = 1;
//         initialTotals[product._id] = product.price;
//       })
//     );

//     setPrices(initialPrices);
//     setQuantities(initialQuantities);
//     setTotals(initialTotals);
//   }, [productList]);

//   const updateQuantity = (productId, value) => {
//     setQuantiyvalue(value);
//     const updatedQuantities = { ...quantities, [productId]: value };
//     setQuantities(updatedQuantities);

//     const updatedTotals = { ...totals };
//     updatedTotals[productId] = prices[productId] * value;
//     setTotals(updatedTotals);
//   };

//   useEffect(() => {
//     console.log({ quantities44444: quantities });
//   }, [quantities]);

//   return (
//     <>

//        {/* CUSTOMER DETAIL SECTION */}
//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-1px;', marginBottom: '20px' }}
//       >
//         {translate('Customer Detail Section')}
//       </Col>
//       <Row gutter={[12, 0]} style={{ marginTop: '30px' }}>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="client"
//             label={translate('Select Customer')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <AutoCompleteAsync
//               entity={'client'}
//               displayLabels={['name']}
//               searchFields={'name,surname'}
//               onChange={handleFirstDropdownChange}
//             />
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="clientAddress"
//             label={translate('Customer Address')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//             >
//               {customerAddress.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="billingAddress"
//             label={translate('Billing Address')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//             >
//               {customerAddress.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="sendworkorderEmail"
//             label={translate('Send work order Email')}
//             // rules={[
//             //   {
//             //     required: true,
//             //     message: 'Please select a Send work order Email:',
//             //   },
//             // ]}
//           >
//             <Radio.Group style={{ display: 'flex', gap: '20px' }}>
//               <Radio value="1" selected>
//                 Yes
//               </Radio>
//               <Radio value="0">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Divider dashed />

//         {/* BASIC WORKORDER DETAILS */}
//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//       >
//         {translate('Basic Work Order Details')}
//       </Col>
//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '30px' }}>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="startDate"
//             label={translate('Start Date')}
//             rules={[
//               {
//                 required: true,
//                 type: 'object',
//               },
//             ]}
//             initialValue={dayjs()}
//           >
//             <DatePicker style={{ width: '100%' }} format={dateFormat} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="endDate"
//             label={translate('Expire Date')}
//             rules={[
//               {
//                 required: true,
//                 type: 'object',
//               },
//             ]}
//             initialValue={dayjs().add(30, 'days')}
//           >
//             <DatePicker style={{ width: '100%' }} format={dateFormat} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="startTime"
//             label={translate('Start Time')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <TimePicker style={{ width: '100%' }} format="HH:mm" />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="expectedRequiredTime"
//             label={translate('Expected Time Required')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <TimePicker style={{ width: '100%' }} format="HH:mm" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '20px' }}>
//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="salesPerson"
//             label={translate('Sales Person')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onChange={(event) => setSelectedSalesPerson(event)}
//             >
//               {SalesPerson?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={8}>
//           <ContactHandler salesContactNumber={salesContactNumber} />
//         </Col>

//         <Col className="gutter-row" span={8}>
//           <Form.Item label={translate('Files')} name="Files">
//             <Input type="file" />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '20px' }}>

//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="LeadWorker"
//             label={translate('Lead Worker')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onChange={(event) => setWorkers(event)}
//             >
//               {WorkLead?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="SelectWorkers"
//             label={translate('Select Workers')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               mode="multiple"
//             >
//               {filteredWorkLead?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       <Divider dashed />

//        {/* WORKORDER SERVICES */}

//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//       >
//         {translate('Work Order Services')}
//       </Col>

//       {/* ---------------NEW SERVICE CATEGORY------------ */}

//       <Row gutter={[12, 12]} style={{ position: 'relative' }}>
//         <Col className="gutter-row" span={12}>
//           <Form.Item name="serviceCategory" label={translate('Service Category')}>
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onChange={getCategorySubscriptionHandler}
//             >
//               {serviceCategoryOptions?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="serviceList"
//             label={translate('Service Name')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onSelect={(value) => {
//                 if (value === 'custom') {
//                   // subscriptiononetime
//                   IsActiveness(2);
//                   IsActiveSelect(1);
//                   setSubscriptionIds([]);
//                 } else {
//                   setSubscriptionIds([]);
//                   const selectedOption = ShowServiceList.find((option) => option._id === value);
//                   if (selectedOption) {
//                     setShowServiceId(selectedOption.subscriptions);
//                     IsActiveSelect(2);
//                     IsActiveness(1);
//                   } else {
//                     IsActiveness(0);
//                     IsActiveSelect(0);
//                   }
//                 }
//               }}
//             >
//               <Select.Option key="custom" value="custom">
//                 Custom Service (One Time)
//               </Select.Option>
//               {ShowServiceList?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       {/* NEW CODE */}

//       {activeness == 2 && (
//         <>
//           <Row gutter={[12, 12]} style={{ position: 'relative' }}>
//             <Col className="gutter-row" span={12}>
//               <Form.Item
//                 label={translate('Service Name')}
//                 name="ServiceName"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col className="gutter-row" span={12}>
//               <Form.Item
//                 label={translate('Service Price')}
//                 name="ServicePrice"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>

//             <Col className="gutter-row" span={24}>
//               <Form.Item
//                 label={translate('Service Description')}
//                 name="ServiceDescription"
//                 rules={[]}
//               >
//                 <Input.TextArea />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Collapse
//             accordion
//             activeKey={accordionActiveKey}
//             onChange={handleChange}
//             style={{ marginTop: '5%' }}
//           >
//             {productList?.map((mainData, i) => (
//               <>
//                 {i == productList.length - 2 && (
//                   <Collapse.Panel header={'Custom Item'} key={'custom item'}>
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={'ci-11'}>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={6}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
//                       </Col>
//                     </Row>
//                     <Form.List
//                       name="customItems"
//                       initialValue={[
//                         {
//                           itemName: '',
//                           price: '',
//                           quantity: '',
//                           total: '',
//                           remarks: '',
//                         },
//                       ]}
//                     >
//                       {(fields, { add, remove }) => (
//                         <>
//                           {fields?.map((field, index) => (
//                             <ItemRow
//                               key={field.key}
//                               remove={remove}
//                               field={field}
//                               current={current}
//                               isFirstRow={index === 0}
//                             ></ItemRow>
//                           ))}
//                           <Form.Item>
//                             <Button
//                               type="dashed"
//                               onClick={() => add()}
//                               block
//                               icon={<PlusOutlined />}
//                               ref={addField}
//                             >
//                               {translate('Add field')}
//                             </Button>
//                           </Form.Item>
//                         </>
//                       )}
//                     </Form.List>
//                   </Collapse.Panel>
//                 )}
//                 <Collapse.Panel header={mainData.name} key={mainData._id}>
//                   <div key={`${i}`}>
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Sub-Item')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Price')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Quantity')}</p>{' '}
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '40%' }}>{translate('Total')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={6}>
//                         <p style={{ marginLeft: '15%' }}>{translate('Remarks')}</p>
//                       </Col>
//                     </Row>
//                     {/* <Form.List name="items" >
//                     <> */}

//                     {mainData.products?.map((data, index) => (

//                       <Row gutter={[12, 12]} style={{ position: 'relative' }} key={`${index}-${data._id}`}>
//                         <Col className="gutter-row mt-2">
//                           <Checkbox
//                           onChange={() => { ItemHandler(data); }}
//                           // onChange={(e) => handleCheckboxChange(data, e.target.checked)}

//                           />
//                         </Col>
//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={['items', index, 'item']}
//                             initialValue={data._id}
//                             rules={[
//                               {
//                                 validator: (_, value) => {
//                                   if (value || data.name) { // Allow the default value to pass
//                                     return Promise.resolve();
//                                   }
//                                   return Promise.reject(new Error('Item name is required'));
//                                 },
//                               },
//                             ]}
//                           >
//                          ]
//                             <span>{data.name}</span>

//                           </Form.Item>
//                         </Col>
//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={['items', index, 'price']}
//                             // initialValue={data.price}
//                             initialValue={prices[data._id]}

//                           >

//                             <InputNumber
//                               className="moneyInput"
//                               onChange={updatePrice}
//                               // onChange={(value) => updateePricee(data._id, value)}
//   // value={selectedItems[data._id]?.price || prices[data._id]}
//                               min={0}
//                               controls={false}
//                               addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
//                               addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
//                               // defaultValue={data.price}
//                               value={prices[data._id]}
//                               readOnly

//                             />
//                           </Form.Item>
//                         </Col>
//                         <Col className="gutter-row" span={3}>
//                           <Form.Item name={[`items`, `${index}`, 'quantity']}
//                           // rules={[{ required: true }]}
//                           >
//                             <InputNumber style={{ width: '100%' }} min={0}

//                               defaultValue={1}
//                               // onChange={(value) => updateeQuantityy(data._id, value)}
//                               onChange={(value) => updateQuantity(data._id, value)}
//                               // value={selectedItems[data._id]?.quantity || 1}
//                             />
//                           </Form.Item>
//                         </Col>

//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={[`items`, `${index}`, 'total']}
//                             initialValue={totals[data._id]}
//                           >
//                             <span style={{ marginLeft: "24%" }} defaultValue={totals[data.id]}>{totals[data._id]}</span>
//                             {/* <InputNumber
//                             readOnly
//                             className="moneyInput"
//                             // value={totalState}
//                             defaultValue={totals[data._id]}
//                             // value={totals[data._id]}
//                             min={0}
//                             controls={false}
//                             addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
//                             addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
//                             formatter={(value) => money.amountFormatter({ amount: value })}
//                           // initialValue={totalState}
//                           /> */}
//                           </Form.Item>
//                         </Col>

//                         <Col className="gutter-row" span={7}>
//                           <Form.Item name={[`items`, `${index}`, 'remarks']} >
//                             <Input placeholder=" Remarks for Workorder" defaultValue={data.description} />
//                           </Form.Item>
//                         </Col>
//                       </Row>
//                     ))}
//                     {/* </>
//                   </Form.List> */}
//                   </div>
//                 </Collapse.Panel>
//               </>
//             ))}
//           </Collapse>
//         </>
//       )}

//       {activeSelect == 2 && (
//         <>
//           <Col className="gutter-row" span={24}>
//             <Form.Item
//               label={translate('Service Description')}
//               name="ServiceDescription"
//               rules={[]}
//             >
//               <Input.TextArea />
//             </Form.Item>
//           </Col>

//           <Col className="gutter-row " span={24}>
//             <Row gutter={[12, 12]}>
//               <Col span={24}>
//                 <Table
//                   // columns={columns}
//                   columns={generateColumns()}
//                   dataSource={generateTableData()}
//                   pagination={false}
//                 />
//               </Col>
//             </Row>
//           </Col>

//           <Collapse
//             accordion
//             activeKey={accordionActiveKey}
//             onChange={handleChange}
//             style={{ marginTop: '5%' }}
//           >
//             {productList?.map((mainData, i) => (
//               <>
//                 {i == productList.length - 2 && (
//                   <Collapse.Panel header={'Custom Item'} key={'custom item'}>
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={'ci-11'}>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={6}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
//                       </Col>
//                     </Row>
//                     <Form.List
//                       name="customItems"
//                       initialValue={[
//                         {
//                           itemName: '',
//                           price: '',
//                           quantity: '',
//                           total: '',
//                           remarks: '',
//                         },
//                       ]}
//                     >
//                       {(fields, { add, remove }) => (
//                         <>
//                           {fields?.map((field, index) => (
//                             <ItemRow
//                               key={field.key}
//                               remove={remove}
//                               field={field}
//                               current={current}
//                               isFirstRow={index === 0}
//                             ></ItemRow>
//                           ))}
//                           <Form.Item>
//                             <Button
//                               type="dashed"
//                               onClick={() => add()}
//                               block
//                               icon={<PlusOutlined />}
//                               ref={addField}
//                             >
//                               {translate('Add field')}
//                             </Button>
//                           </Form.Item>
//                         </>
//                       )}
//                     </Form.List>
//                   </Collapse.Panel>
//                 )}
//                 <Collapse.Panel header={mainData.name} key={mainData._id}>
//                   <div key={`${i}`}>
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Sub-Item')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Price')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Quantity')}</p>{' '}
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '40%' }}>{translate('Total')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={6}>
//                         <p style={{ marginLeft: '15%' }}>{translate('Remarks')}</p>
//                       </Col>
//                     </Row>

//                     {mainData.products?.map((data, index) => (
//                       <Row
//                         gutter={[12, 12]}
//                         style={{ position: 'relative' }}
//                         key={`${index}-${data._id}`}
//                       >
//                         <Col className="gutter-row mt-2">
//                           <Checkbox
//                             onChange={() => {
//                               ItemHandler(data);
//                             }}
//                           />
//                         </Col>
//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={['items', index, 'item']}
//                             initialValue={data._id}
//                             rules={[
//                               {
//                                 validator: (_, value) => {
//                                   if (value || data.name) {
//                                     return Promise.resolve();
//                                   }
//                                   return Promise.reject(new Error('Item name is required'));
//                                 },
//                               },
//                             ]}
//                           >
//                             <span>{data.name}</span>
//                           </Form.Item>
//                         </Col>
//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={['items', index, 'price']}
//                             initialValue={prices[data._id]}
//                           >
//                             <InputNumber
//                               className="moneyInput"
//                               onChange={updatePrice}
//                               min={0}
//                               controls={false}
//                               addonAfter={
//                                 money.currency_position === 'after'
//                                   ? money.currency_symbol
//                                   : undefined
//                               }
//                               addonBefore={
//                                 money.currency_position === 'before'
//                                   ? money.currency_symbol
//                                   : undefined
//                               }
//                               value={prices[data._id]}
//                               readOnly
//                             />
//                           </Form.Item>
//                         </Col>
//                         <Col className="gutter-row" span={3}>
//                           <Form.Item name={[`items`, `${index}`, 'quantity']}>
//                             <InputNumber
//                               style={{ width: '100%' }}
//                               min={0}
//                               defaultValue={1}
//                               onChange={(value) => updateQuantity(data._id, value)}
//                             />
//                           </Form.Item>
//                         </Col>

//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={[`items`, `${index}`, 'total']}
//                             initialValue={totals[data._id]}
//                           >
//                             <span style={{ marginLeft: '24%' }} defaultValue={totals[data.id]}>
//                               {totals[data._id]}
//                             </span>
//                           </Form.Item>
//                         </Col>

//                         <Col className="gutter-row" span={7}>
//                           <Form.Item name={[`items`, `${index}`, 'remarks']}>
//                             <Input
//                               placeholder=" Remarks for Workorder"
//                               defaultValue={data.description}
//                             />
//                           </Form.Item>
//                         </Col>
//                       </Row>
//                     ))}

//                     {/* ----------NEW CODE---------- */}

//                     {/* <YourComponent mainData={mainData}/> */}
//                   </div>
//                 </Collapse.Panel>
//               </>
//             ))}
//           </Collapse>
//         </>
//       )}

//       <Divider dashed />

//          {/* WORKORDER BILLING DETAILS */}

//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//       >
//         {translate('Work Order Billing Details')}
//       </Col>

//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '30px' }}>
//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="Adjustment"
//             label={translate('Adjustment')}
//             // rules={[
//             //   {
//             //     required: true,
//             //     message: 'Please select a Adjustment Type:',
//             //   },
//             // ]}
//           >
//             <Radio.Group style={{ display: 'flex', gap: '20px' }}>
//               {optionsss.map((option, index) => (
//                 <Radio key={index} value={option} onClick={() => IsActive(index + 2)}>
//                   {option}
//                 </Radio>
//               ))}
//             </Radio.Group>
//           </Form.Item>

//           {active == 3 && (
//             <Form.Item
//               name="AdjustmentValue"
//               rules={[
//                 {
//                   // required: true,
//                 },
//               ]}
//             >
//               <Input onChange={AdjustmentValueHandler} />
//             </Form.Item>
//           )}

//           {active == 2 && (
//             <Form.Item
//               name="AdjustmentValue"
//               rules={[
//                 {
//                   // required: true,
//                 },
//               ]}
//             >
//               <Input onChange={AdjustmentValueHandler} />
//             </Form.Item>
//           )}
//         </Col>

//         <Col className="gutter-row" span={12}>
//           <Form.Item label={translate('Initial Remarks')} name="InitialRemarks">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '13px' }}>
//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="discount"
//             label={translate('Discount')}
//             // rules={[
//             //   {
//             //     required: true,
//             //   },
//             // ]}
//           >
//             <InputNumber style={{ width: '100%' }} onChange={DiscountValueHandler} />
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="PaymentMode"
//             f
//             label={translate('Payment Mode')}
//             // rules={[
//             //   {
//             //     required: true,
//             //   },
//             // ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//             >
//               {/* {SalesPerson?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
//               ))} */}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       {subscriptionIds.length > 0 && (
//         <>
//           <Divider dashed />
//           <Col
//             className="gutter-row"
//             span={12}
//             style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//           >
//             {translate('Selected Work Order Billing Details')}
//           </Col>
//           <table style={{ width: '100%', height: '220px', marginTop: '3%' }}>
//             <tbody>
//               <tr>
//                 <th
//                   style={{
//                     border: '0.2px solid #000',
//                     background: 'rgb(248,248,255)',
//                     color: 'rgb(31,31,31)',
//                     padding: '10px',
//                     borderRight: 'none',
//                   }}
//                 >
//                   <ul
//                     className="calculatorFilled"
//                     style={{
//                       listStyle: 'none',
//                       textAlign: 'start',
//                       padding: '0',
//                       lineHeight: '2.1',
//                     }}
//                   >
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Workorder For
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Per Workorder Cost
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Adjustment</li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Discount({discountValue}%)
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Subtotal</li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Tax ({tax?.taxValue || 0}%)
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Total</li>
//                   </ul>
//                 </th>
//                 {CalculatorFilled()}
//               </tr>
//               {Subitems.length > 0 && (
//                 <>
//                   <Col
//                     className="gutter-row"
//                     span={12}
//                     style={{ fontSize: '1.2rem', marginBottom: '' }}
//                   >
//                     {translate('Additional Service Items')}
//                   </Col>
//                   {/* <tr>Additional Service Items</tr> */}
//                   <tr>
//                     <th
//                       style={{
//                         border: '0.2px solid #000',
//                         background: 'rgb(248,248,255)',
//                         color: 'rgb(31,31,31)',
//                         padding: '10px',
//                         borderRight: 'none',
//                       }}
//                     >
//                       <ul
//                         className="calculatorFilled"
//                         style={{
//                           listStyle: 'none',
//                           textAlign: 'start',
//                           padding: '0',
//                           lineHeight: '2.1',
//                         }}
//                       >
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Service Items Included(per workorder)
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Item Total
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Discount({discountValue}%)
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Sub Total
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Tax ({tax?.taxValue || 0}%)
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Total Service Items Cost
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Grand Total
//                         </li>
//                       </ul>
//                     </th>
//                     {CalculatorFilledItem()}
//                   </tr>
//                 </>
//               )}
//             </tbody>
//           </table>
//         </>
//       )}

//       <div style={{ position: 'relative', width: ' 100%', float: 'right', marginTop: '23px' }}>
//         <Row gutter={[12, -5]}>
//           <Col className="gutter-row" span={5}>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
//                 {translate('Save')}
//               </Button>
//             </Form.Item>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// NEW WORK ORDER CODE

// import { useState, useEffect, useRef } from 'react';
// import dayjs from 'dayjs';
// import {
//   Collapse,
//   Form,
//   Input,
//   InputNumber,
//   Button,
//   Select,
//   Divider,
//   Row,
//   Col,
//   Radio,
//   Checkbox,
//   Table,
// } from 'antd';

// import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

// import { DatePicker, TimePicker } from 'antd';

// import AutoCompleteAsync from '@/components/AutoCompleteAsync';

// import QuoteItemRow from '@/modules/ErpPanelModule/QuoteItemRow';
// // import ItemRow from '@/modules/ErpPanelModule/ItemRow';

// import MoneyInputFormItem from '@/components/MoneyInputFormItem';
// import { selectFinanceSettings } from '@/redux/settings/selectors';
// import { useMoney, useDate } from '@/settings';
// import useLanguage from '@/locale/useLanguage';

// import calculate from '@/utils/calculate';
// import { useSelector } from 'react-redux';
// import SelectAsync from '@/components/SelectAsync';
// import { response } from './jsonResponse';
// import styles from './styles.module.css'; // Import the CSS module

// import { useForm } from 'antd/lib/form/Form';
// import { request } from '@/request';
// import ItemRow from '@/modules/ErpPanelModule/ItemRow';
// const { Option } = Select;
// const { Panel } = Collapse;

// export default function QuotionForm({ subTotal = 0, current = null }) {
//   const { last_quote_number } = useSelector(selectFinanceSettings);

//   return <LoadQuoteForm subTotal={subTotal} current={current} />;
// }
// const initialServiceCost = {
//   servicePerWO: null,
//   discount: null,
//   subTotal: null,
//   tax: null,
//   totalPackageCost: null,
// };

// const initialShowServiceId = [
//   {
//     subscription: {
//       _id: 'sub1',
//       name: 'Subscription 1',
//       package_divider: 2,
//     },
//     data: [
//       { _id: 'data1', name: 'Service 1', price: 100 },
//       { _id: 'data2', name: 'Service 2', price: 150 },
//     ],
//   },
//   {
//     subscription: {
//       _id: 'sub2',
//       name: 'Subscription 2',
//       package_divider: 3,
//     },
//     data: [
//       { _id: 'data3', name: 'Service 3', price: 200 },
//       { _id: 'data4', name: 'Service 4', price: 250 },
//     ],
//   },
// ];

// const tax = {
//   taxValue: 10, // Example tax value
// };
// function LoadQuoteForm({ subTotal = 0, current = null }) {
//   const translate = useLanguage();
//   const { dateFormat } = useDate();
//   const { last_quote_number } = useSelector(selectFinanceSettings);
//   const [lastNumber, setLastNumber] = useState(() => last_quote_number + 1);
//   const [total, setTotal] = useState(0);
//   const [taxRate, setTaxRate] = useState(0);
//   const [taxTotal, setTaxTotal] = useState(0);
//   const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
//   const [active, IsActive] = useState(1);
//   const [activeness, IsActiveness] = useState(1);
//   const [activeSelect, IsActiveSelect] = useState(1);
//   console.log(activeSelect);

//   const handelTaxChange = (value) => {
//     setTaxRate(value / 100);
//   };
//   const { TextArea } = Input;
//   const money = useMoney();
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
//   const [serviceCategory, setserviceCategory] = useState([]);
//   const [serviceCategoryNam, setserviceCategoryNam] = useState();

//   const [SalesPerson, setSalesPerson] = useState();
//   const [WorkLead, setWorkLead] = useState();
//   const [Workers, setWorkers] = useState();
//   const [CheckedId, setCheckedId] = useState();
//   // console.log(CheckedId)
//   const [customerAddress, setCustomerAddress] = useState([]);

//   const [subscriptionData, setSubscriptionData] = useState({});
//   const [accordionData, setAccordionData] = useState([]);
//   const [serviceCategoryOptions, setserviceCategoryOptions] = useState([]);
//   const [selectedSalesPerson, setSelectedSalesPerson] = useState();

//   const handleDropdownChange = async (value) => {
//     setSelectedOption(value);
//     try {
//       // const response = await axios.get(`client/search?q=${value}&fields=label`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
//       // console.log(response)
//       setAccordionData(response); // Assuming the response contains an array of accordion data
//     } catch (error) {
//       console.error('Error fetching accordion data:', error);
//     }
//   };

//   useEffect(() => {
//     if (current) {
//       const { taxRate = 0, year, number } = current;
//       setTaxRate(taxRate / 100);
//       setCurrentYear(year);
//       setLastNumber(number);
//     }
//   }, [current]);
//   useEffect(() => {
//     const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
//     setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)));
//     setTotal(Number.parseFloat(currentTotal));
//   }, [subTotal, taxRate]);

//   const addField = useRef('');

//   useEffect(() => {
//     // Check if addField.current is not null before clicking
//     if (addField.current) {
//       addField.current.click();
//     }
//   }, []); // This effect runs only once when the component mounts

//   // console.log({ serviceOptions });

//   const [productList, setProductList] = useState([]);
//   const [tax, setTax] = useState({});

//   localStorage.setItem("TaxPercentage",tax?.taxValue );

//   useEffect(() => {
//     getProductHandler();
//     // getClientHandler()
//   }, []);
//   const getProductHandler = async () => {
//     try {
//       const productListRes = await request.getProductList();
//       if (productListRes.success) {
//         const taxHandller = await request.getTax();
//         console.log(taxHandller);
//         if (taxHandller.success) {
//           setTax(taxHandller.result);
//         }
//         setProductList(productListRes.result);
//       } else {
//         setProductList([]);
//       }
//       console.log({ productList });
//     } catch (er) {
//       console.error({ er });
//     }
//   };

//   const [selectedValue, setSelectedValue] = useState('');
//   const [serviceOptions, setServiceOptions] = useState(null);
//   const [ShowServiceList, setShowServiceList] = useState(null);
//   const [subscriptionOneTime, setSubcriptionOneTime] = useState();
//   const [subscriptionCount, setSubscriptionCount] = useState(0);
//   const [subItemCount, setSubItemCount] = useState(0);
//   // const [ShowServiceId, setShowServiceId] = useState();
//   const [isFirstServiceCategorySelect, setIsFirstServiceCategorySelect] = useState(true);
//   const getCategorySubscriptionHandler = (value) => {
//     setSelectedValue(value);
//     setItems([]);
//     setSubItemId([]);
//     setSubItemCount(0);
//     setSelectedOption(true);
//     // Show all subscriptions corresponding to the selected option
//     setShowServiceId();
//     IsActiveness(0);
//     IsActiveSelect(0);

//     // Clear previous subscription selection when switching options
//     setSubscriptionIds([]);
//     setSubscriptionCount(0);
//     // setIsFirstServiceCategorySelect(false);
//     const fetchData2 = async () => {
//       try {
//         const response = await request.getServiceCategoryOptions({ id: value });
//         console.log(response);
//         if (response.success) {
//           setServiceOptions(response.result);
//           getProductHandler();
//         } else {
//           setServiceOptions(null);
//         }
//       } catch (error) {
//         setServiceOptions(null);
//         console.error('Error fetching data:', error);
//       }
//     };
//     const fetchData3 = async () => {
//       try {
//         const response = await request.getServiceListShow({ id: value });
//         console.log(response);
//         if (response.success) {
//           setShowServiceList(response.result);
//           setProductList(ShowServiceList);
//         } else {
//           setShowServiceList(null);
//         }
//       } catch (error) {
//         setShowServiceList(null);
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData2();
//     fetchData3();
//   };

//   const handleFirstDropdownChange = async (event) => {
//     console.log('event', event);
//     try {
//       const response = await request.getSearchClientAddress(event);
//       console.log('response', response);
//       if (response.success) {
//         setCustomerAddress(response.result);
//         // Set options state based on API response
//       } else {
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const getServicesSubAndItems = async (event) => {
//     // const selectedValue = event.target.value;
//     // setSelectedOption(selectedValue);

//     // Make API request with the selected value
//     try {
//       // const response = await fetch(`your_api_endpoint/${selectedValue}`);
//       const data = [
//         { value: '1', label: 'Home' },
//         { value: '3', label: 'Billing' },
//         { value: '4', label: 'Shipping' },
//       ];
//       // Extract options from the API response
//       const extractedOptions = data?.map((item) => ({
//         value: item.value,
//         label: item.label,
//       }));

//       // Update the options for the second dropdown
//       setSecondDropdownOptions(extractedOptions);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
//   const [accordionActiveKey, setAccordionActiveKey] = useState([]);
//   const handleChange = (key) => {
//     setAccordionActiveKey(key);
//   };
//   // const translate = useLanguage()
//   const [totalState, setTotal2] = useState(undefined);
//   const [price, setPrice] = useState();
//   const [name, setName] = useState('');
//   const [quantity, setQuantity] = useState(0);

//   // const money = useMoney();
//   const updateQt = (value) => {
//     setQuantity(value);
//   };
//   const updatePrice = (value) => {
//     console.log(value);
//     setPrice(value);
//   };
//   const updateName = (value) => {
//     setName(value);
//   };
//   const [form] = useForm();

//   useEffect(() => {
//     if (current) {
//       const { items, invoice } = current;
//       console.log(items);
//       if (invoice) {
//         const item = invoice[field.fieldKey];
//         if (item) {
//           setQuantity(item.quantity);
//           setPrice(item.price);
//         }
//       } else {
//         const item = items[field.fieldKey];
//         if (item) {
//           setQuantity(item.quantity);
//           setPrice(item.price);
//         }
//       }
//     }
//   }, [current]);

//   useEffect(() => {
//     const currentTotal = calculate.multiply(price, quantity);
//     console.log(currentTotal);
//     setTotal2(currentTotal);
//   }, [price, quantity]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await request.getServiceCategoryOptions();
//         console.log(response);
//         if (response.success) {
//           setserviceCategoryOptions(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // --------- WORK ORDER MODULE -----------
//   useEffect(() => {
//     const fetchData1 = async () => {
//       try {
//         const response = await request.getSalesPerson();
//         if (response.success) {
//           setSalesPerson(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData1();
//   }, []);

//   useEffect(() => {
//     const fetchData3 = async () => {
//       try {
//         const response = await request.getServiceCategory();
//         if (response.success) {
//           setserviceCategory(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData3();
//   }, []);
//   useEffect(() => {
//     const hendleOneTime = async () => {
//       try {
//         const response = await request.getSubscriptiononetime();

//         if (response.success) {
//           setSubcriptionOneTime(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     hendleOneTime();
//   }, []);

//   const handleserviceId = async (event) => {
//     try {
//       const response = await request.getServiceCategoryName(event);
//       if (response.success) {
//         setserviceCategoryNam(response.result);
//       } else {
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const [salesContactNumber, setSalesContactNumber] = useState();
//   useEffect(() => {
//     if (selectedSalesPerson) {
//       let number = SalesPerson?.find((option) => option._id === selectedSalesPerson)?.phone;
//       setSalesContactNumber(number);
//       ContactHandler({ salesContactNumber: number });
//       let saleRepConElement = document.getElementById('salesContactNumber');
//       saleRepConElement.value = number || null;
//       // console.log({ number, salesContactNumber });
//     }
//   }, [selectedSalesPerson, salesContactNumber]);
//   const [selectedIds, setSelectedIds] = useState({ itemId: null, subscriptionId: null });
//   useEffect(() => {}, [selectedSalesPerson]);
//   const ContactHandler = ({ salesContactNumber }) => {
//     return (
//       <Form.Item
//         label={translate('Sales Person Contact')}
//         name="SalesPersonContact"
//         rules={[
//           {
//             required: true,
//           },
//         ]}
//         initialValue={salesContactNumber}
//       >
//         <Input
//           style={{
//             width: '100%',
//           }}
//           placeholder=""
//           id="salesContactNumber"
//           value={salesContactNumber}
//         />
//       </Form.Item>
//     );
//   };

//   const filteredWorkLeads = WorkLead?.filter((item) => item._id !== Workers);

//   const getUniqueSubscriptionNames = () => {
//     const subscriptionNames = [];
//     ShowServiceId.forEach((ele) => {
//       // console.log(ele);
//       ele.data.forEach((item) => {
//         if (!subscriptionNames.includes(item.name)) {
//           subscriptionNames.push(item.name);
//         }
//       });
//     });
//     return subscriptionNames;
//   };

//   const generateColumns = () => {
//     const subscriptionNames = getUniqueSubscriptionNames();
//     const columns = [
//       {
//         title: 'Subscription',
//         dataIndex: 'Subscription',
//         name: 'subscriptions',
//       },
//     ];

//     subscriptionNames.forEach((name) => {
//       columns.push({
//         title: <span>{name}</span>,
//         dataIndex: name,
//       });
//     });

//     return columns;
//   };
//   // const [subscriptionIds, setSubscriptionIds] = useState([]);
//   // const [subscriptionCount, setSubscriptionCount] = useState(0);
//   const [isSubscriptionID, seTisSubscriptionID] = useState(null);

//   const [adjustmentvalue, setadjustment] = useState(null);
//   // const [discountValue, setdiscount] = useState(null);
//   // console.log(discountValue)
//   const [Subitems, setItems] = useState([]);
//   const [subItemIds, setSubItemId] = useState([]);

//   const [quantityvalue, setQuantiyvalue] = useState();
//   useEffect(() => {}, [subscriptionCount, subItemCount]);
//   let subscriptionSubTotal = 0;
//   let subscritionAmount = 0;

//   const ItemHandler = (element) => {
//     // console.log(element)
//     setCheckedId(element.price);
//     const tempId = [...subItemIds];
//     const temp = [...Subitems];
//     element.total = element.price * (quantityvalue || 1);
//     element.qty = 1;

//     const selectedIndex = tempId.indexOf(element._id);
//     if (selectedIndex !== -1) {
//       tempId.splice(selectedIndex, 1);
//       const itemIndex = temp.findIndex((item) => item._id === element._id);
//       if (itemIndex !== -1) {
//         temp.splice(itemIndex, 1);
//       }
//     } else {
//       tempId.push(element._id);
//       temp.push(element);
//     }
//     setSubItemId(tempId);
//     setItems(temp);
//     setSubItemCount(temp.length);
//   };

//   // const CustomItemNameHandler = (value, id) => {
//   //   console.log({ value, id });
//   // };

//   const initialServiceCost = {
//     servicePerWO: null,
//     discount: null,
//     subTotal: null,
//     tax: null,
//     totalPackageCost: null,
//   };
//   let additionalCost = {
//     subTotal: null,
//     tax: null,
//     totalPackageCost: null,
//   };

//   const [subscriptionIds, setSubscriptionIds] = useState([]);

//   const [discountValue, setdiscount] = useState(0);
//   // const [subItemCount, setSubItemCount] = useState(0);
//   const [serviceCost, setServiceCost] = useState(initialServiceCost);
//   const [ShowServiceId, setShowServiceId] = useState(initialShowServiceId);

//   const handleCheckboxClick = (id) => {
//     console.log(id);
//     let temp = [...subscriptionIds];
//     if (temp.includes(id)) {
//       temp = temp.filter((item) => item !== id);
//     } else {
//       temp.push(id);
//     }
//     setSubscriptionIds(temp);
//     setSubscriptionCount(temp.length);
//     localStorage.setItem('WorkOrderSubId', id);
//   };

//   useEffect(() => {
//     const calculateCosts = () => {
//       const discountValueParsed = parseFloat(discountValue) || 0;
//       let subscriptionsArray = [];
//       let newServiceCost = { ...initialServiceCost };

//       ShowServiceId?.forEach((subscriptionObj) => {
//         subscriptionObj.data.forEach((dataObj) => {
//           if (subscriptionIds.includes(dataObj._id)) {
//             const servicePerWO = parseFloat(
//               dataObj.price / subscriptionObj.subscription.package_divider
//             ).toFixed(2);
//             const discount = parseFloat(servicePerWO * (discountValueParsed / 100)).toFixed(2);
//             const subTotal = parseFloat(servicePerWO - discount).toFixed(2);
//             const taxValueParsed = parseFloat(tax.taxValue) || 0;
//             const taxAmount = parseFloat(subTotal * (taxValueParsed / 100)).toFixed(2);
//             const totalPackageCost = parseFloat(subTotal + taxAmount).toFixed(2);

//             newServiceCost = {
//               servicePerWO,
//               discount,
//               subTotal,
//               tax: taxAmount,
//               totalPackageCost,
//             };

//             subscriptionsArray.push({
//               subscription: subscriptionObj.subscription._id,
//               subModule: dataObj._id,
//               serviceCost: newServiceCost,
//             });
//           }
//         });
//       });

//       setServiceCost(newServiceCost);
//       localStorage.setItem('Subscriptions', JSON.stringify(subscriptionsArray));
//     };

//     calculateCosts();
//   }, [subscriptionIds, discountValue, ShowServiceId, tax]);

//   const DiscountValueHandler = (value) => {
//     setdiscount(value ?? 0);
//   };

//   const generateTableData = () => {
//     const subscriptionNames = getUniqueSubscriptionNames();
//     const tableData = [];
//     ShowServiceId?.forEach((ele) => {
//       const rowData = {
//         Subscription: ele.subscription.name,
//       };

//       subscriptionNames?.forEach((name) => {
//         const matchingItem = ele.data.find((item) => item.name === name);

//         rowData[name] = matchingItem ? (
//           <Checkbox.Group
//             key={matchingItem._id}
//             onChange={() => handleCheckboxClick(matchingItem._id)}
//           >
//             <Checkbox value={matchingItem._id}>
//               {`${matchingItem.price}.00 /${ele.subscription.name}`}
//             </Checkbox>
//           </Checkbox.Group>
//         ) : null;
//       });

//       tableData.push(rowData);
//     });
//     return tableData;
//   };

//   const CalculatorFilled = () => {
//     return ShowServiceList.map((element, _id) =>
//       element.subscriptions.map((subscriptions, __id) =>
//         subscriptions.data.map((subscription, ___id) => {
//           let package_divider = parseFloat(subscriptions.subscription.package_divider);
//           subscritionAmount = parseFloat(subscription.price / package_divider);
//           let subTotal = parseFloat(subscription.price / package_divider);
//           if (active == 2) {
//             subTotal += parseFloat(adjustmentvalue);
//           }
//           if (active == 3) {
//             subTotal -= parseFloat(adjustmentvalue);
//           }
//           let discount = 0;
//           if (discountValue) {
//             discount = subTotal * (parseFloat(discountValue) / 100);
//             subTotal -= subTotal * (parseFloat(discountValue) / 100);
//           }
//           let taxValue = 0;
//           if (tax.taxValue) {
//             taxValue = subTotal * (parseFloat(tax.taxValue) / 100);
//           }
//           if (subscriptionIds.includes(subscription._id)) {
//             subscriptionSubTotal = subTotal + taxValue;
//             // serviceCost.servicePerWO = parseFloat(subscription.price / package_divider).toFixed(2);
//             // serviceCost.discount = parseFloat(discount || 0).toFixed(2);
//             // serviceCost.subTotal = parseFloat(subTotal).toFixed(2);
//             // serviceCost.tax = parseFloat(taxValue).toFixed(2);
//             // serviceCost.totalPackageCost = parseFloat(subTotal + taxValue).toFixed(2);
//             // localStorage.setItem("jv1GYkk6plxCpgx", parseFloat(subTotal + taxValue).toFixed(2))
//             // localStorage.setItem("ZeFnMqDC7ktkKDB", JSON.stringify(serviceCost))
//             return (
//               <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
//                 <ul
//                   style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
//                 >
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '-1px',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {subscription.name}:{subscriptions.subscription.name}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(subscription.price / package_divider).toFixed(2)}/Workorder
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(adjustmentvalue || 0).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(discount || 0).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(subTotal).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(taxValue).toFixed(2)}
//                   </li>
//                   <li
//                     style={{
//                       borderBottom: '1px solid rgb(217,217,217)',
//                       fontSize: '15px',
//                       marginTop: '',
//                       color: 'rgb(49,91,140)',
//                     }}
//                   >
//                     {parseFloat(subTotal + taxValue).toFixed(2)}
//                   </li>
//                 </ul>
//               </td>
//             );
//           }
//         })
//       )
//     );
//   };

//   // const CalculatorFilledItem = () => {
//   //   return ShowServiceList.map((element, _id) =>
//   //     element.subscriptions.map((subscriptions, __id) =>
//   //       subscriptions.data.map((subscription, ___id) => {
//   //         let package_divider = parseFloat(subscriptions.subscription.package_divider);
//   //         subscritionAmount = parseFloat(subscription.price / package_divider);
//   //         let subTotal = parseFloat(subscription.price / package_divider);
//   //         if (active == 2) {
//   //           subTotal += parseFloat(adjustmentvalue);
//   //         }
//   //         if (active == 3) {
//   //           subTotal -= parseFloat(adjustmentvalue);
//   //         }
//   //         let discount1 = 0;
//   //         if (discountValue) {
//   //           discount1 = subTotal * (parseFloat(discountValue) / 100);
//   //           subTotal -= subTotal * (parseFloat(discountValue) / 100);
//   //         }
//   //         let taxValue = 0;
//   //         if (tax.taxValue) {
//   //           taxValue = subTotal * (parseFloat(tax.taxValue) / 100);
//   //         }
//   //         if (subscriptionIds.includes(subscription._id)) {
//   //           subscriptionSubTotal = subTotal + taxValue;
//   //           let itemPrice = 0;
//   //           let itemMPrice = 0;
//   //           let discount = 0;
//   //           let taxValue1 = 0;
//   //           let subITotal = 0;

//   //           return (
//   //             <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
//   //               <ul
//   //                 style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
//   //               >
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '-1px',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >
//   //                   {Subitems.map((item, index) => {
//   //                     itemMPrice += parseFloat(item.total) * package_divider * item.qty;
//   //                     itemPrice += parseFloat(item.total) * package_divider * item.qty;
//   //                     subITotal = itemPrice;
//   //                     if (discountValue) {
//   //                       discount = (parseFloat(itemMPrice) * parseInt(discountValue)) / 100;
//   //                       subITotal = subITotal - discount;
//   //                     }
//   //                     else {
//   //                     }
//   //                     if (tax.taxValue) {
//   //                       taxValue1 = parseFloat(itemPrice) * (parseInt(tax.taxValue) / 100);
//   //                     }
//   //                     localStorage.setItem(
//   //                       'jv1GYkk6plxCpgx',
//   //                       parseFloat(subscriptionSubTotal + subITotal + taxValue1).toFixed(2)
//   //                     );
//   //                     additionalCost.subTotal = parseFloat(subITotal).toFixed(2);
//   //                     additionalCost.tax = parseFloat(taxValue).toFixed(2);
//   //                     additionalCost.totalPackageCost = parseFloat(itemPrice + taxValue1).toFixed(
//   //                       2
//   //                     );
//   //                     localStorage.setItem('BQaBocV8yvv9ELm', JSON.stringify(additionalCost));
//   //                     return (
//   //                       <>
//   //                         item:{item.name} (x{item.qty}){index != Subitems.length && <br />}
//   //                       </>
//   //                     );
//   //                   })}
//   //                 </li>
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >

//   //                   {/* { console.log(itemMPrice)} */}
//   //                   {itemMPrice.toFixed(2)}
//   //                 </li>
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >
//   //                   {discount.toFixed(2)}
//   //                 </li>
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >
//   //                   {subITotal.toFixed(2)}
//   //                 </li>
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >
//   //                   {(taxValue || 0).toFixed(2)}
//   //                 </li>
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >
//   //                   {(subITotal + taxValue).toFixed(2)}
//   //                 </li>
//   //                 <li
//   //                   style={{
//   //                     borderBottom: '1px solid rgb(217,217,217)',
//   //                     fontSize: '15px',
//   //                     marginTop: '',
//   //                     color: 'rgb(49,91,140)',
//   //                   }}
//   //                 >
//   //                   {parseFloat(subscriptionSubTotal + subITotal + taxValue).toFixed(2)}
//   //                 </li>
//   //               </ul>
//   //             </td>
//   //           );
//   //         }
//   //       })
//   //     )
//   //   );
//   // };

//   const CalculatorFilledItem = () => {
//     return (
//       ShowServiceList?.map((element, _id) => (
//         element.subscriptions?.map((subscriptions, __id) => (
//           subscriptions.data?.map((subscription, ___id) => {
//             let package_divider = parseFloat(subscriptions.subscription.package_divider);
//             subscritionAmount = parseFloat(subscription.price / package_divider)
//             let subTotal = parseFloat(subscription.price / package_divider);
//             if (active == 2) {
//               subTotal += parseFloat(adjustmentvalue);
//             }
//             if (active == 3) {
//               subTotal -= parseFloat(adjustmentvalue);
//             }
//             let discount1 = 0;
//             if (discountValue) {
//               discount1 = (subTotal * (parseFloat(discountValue) / 100))
//               subTotal -= (subTotal * (parseFloat(discountValue) / 100))
//             }
//             let taxValue = 0;
//             if (tax.taxValue) {
//               taxValue = (subTotal * (parseFloat(tax.taxValue) / 100))
//             }
//             if (subscriptionIds.includes(subscription._id)) {
//               subscriptionSubTotal = subTotal + taxValue;
//               let itemPrice = 0;
//               let itemMPrice = 0;
//               let discount = 0;
//               let taxValue1 = 0;
//               let subITotal = 0;
//               return (
//                 <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
//                   <ul style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: "2.3" }}>
//                     <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "-1px", color: "rgb(49,91,140)", }}>

//                       {Subitems.map((item, index) => {
//                         itemMPrice += parseFloat(item.price) * package_divider * item.qty;

//                         itemPrice += (parseFloat(item.price) * package_divider * item.qty);
//                         subITotal = itemPrice
//                         if (discountValue) {
//                           discount = (parseFloat(itemMPrice) * parseInt(discountValue) / 100)
//                           subITotal = subITotal - discount
//                         } else {
//                         }
//                         if (tax.taxValue) {
//                           taxValue1 = (parseFloat(itemPrice) * (parseInt(tax.taxValue) / 100))
//                         }

//                         localStorage.setItem("jv1GYkk6plxCpgx", parseFloat(subscriptionSubTotal + subITotal + taxValue1).toFixed(2));
//                         additionalCost.subTotal = parseFloat(subITotal).toFixed(2);
//                         additionalCost.tax = parseFloat(taxValue).toFixed(2)
//                         additionalCost.totalPackageCost = parseFloat(itemPrice + taxValue1).toFixed(2);
//                         localStorage.setItem("BQaBocV8yvv9ELm", JSON.stringify(additionalCost));
//                         return (
//                           <>
//                             item:{item.name} (x{item.qty ?? 0})
//                             {index != Subitems.length && <br />}
//                           </>
//                         )
//                       })
//                       }
//                     </li>
//                     <li
//                       style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "", color: "rgb(49,91,140)" }}
//                     >{itemMPrice.toFixed(2)}</li>
//                     <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "", color: "rgb(49,91,140)", }}>{discount.toFixed(2)}</li>
//                     <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "", color: "rgb(49,91,140)" }}>{subITotal.toFixed(2)}</li>
//                     <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "", color: "rgb(49,91,140)" }}>{(taxValue || 0).toFixed(2)}</li>
//                     <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "", color: "rgb(49,91,140)" }}>{(subITotal + taxValue).toFixed(2)}</li>
//                     <li style={{ borderBottom: '1px solid rgb(217,217,217)', fontSize: "15px", marginTop: "", color: "rgb(49,91,140)" }}>{(parseFloat(subscriptionSubTotal + subITotal + taxValue)).toFixed(2)}</li>
//                   </ul></td>
//               )
//             }
//           }
//           )
//         ))
//       ))
//     )
//   }

//   const AdjustmentValueHandler = (event) => {
//     setadjustment(event.target.value || 0);
//     let subTotal = document.getElementById('subTotal');
//     subTotal.value = parseFloat(subscritionAmount + parseFloat(event.target.value));
//     // console.log({ subTotal });
//   };

//   const handleSelectChange = (value) => {
//     // setadjustment(null);
//     // setdiscount(null);
//     setSubscriptionIds([]);
//     setSubscriptionCount(0);
//     setSubItemId([]);
//     setItems([]);
//     if (value === 'custom') {
//       // Handle custom option selection
//       IsActiveness(2);
//       IsActiveSelect(1);
//     } else {
//       const option = ShowServiceList?.find((option) => option._id === value);
//       if (option) {
//         // Show all subscriptions corresponding to the selected option
//         setShowServiceId(option.subscriptions);
//         IsActiveSelect(2);
//         IsActiveness(1);
//       } else {
//         IsActiveness(0);
//         IsActiveSelect(0);
//       }

//       // Clear previous subscription selection when switching options
//       setSubscriptionIds([]);
//       setSubscriptionCount(0);
//       // setadjustment(null);
//       // setdiscount(null);
//     }
//   };

//   // const handleSelectChange = async (value) => {
//   //   // setadjustment(null);
//   //   // setdiscount(null);
//   //   setSubscriptionIds([]);
//   //   setSubscriptionCount(0);
//   //   setSubItemId([]);
//   //   setItems([]);
//   //   if (value === 'custom') {
//   //     // Handle custom option selection
//   //     IsActiveness(2);
//   //     IsActiveSelect(1);
//   //     setIsCustom(true);
//   //   } else {
//   //     setIsCustom(false);
//   //     // setShowServiceList([])
//   //     try {
//   //       const response = await request.getServiceListShows({ id: selectedValue });
//   //       console.log(response);
//   //       if (response.success) {
//   //         setShowServiceList(response.result);
//   //         setProductList(ShowServiceList);
//   //       } else {
//   //         setShowServiceList(null);
//   //       }
//   //     } catch (error) {
//   //       setShowServiceList(null);
//   //       console.error('Error fetching data:', error);
//   //     }
//   //     const option = ShowServiceList?.find((option) => option._id === value);
//   //     if (option) {
//   //       // Show all subscriptions corresponding to the selected option
//   //       setShowServiceId(option.subscriptions);
//   //       IsActiveSelect(2);
//   //       IsActiveness(1);
//   //     } else {
//   //       IsActiveness(0);
//   //       IsActiveSelect(0);
//   //     }
//   //     // Clear previous subscription selection when switching options
//   //     // setadjustment(null);
//   //     // setdiscount(null);
//   //   }
//   // };

//   const [prices, setPrices] = useState({});
//   const [quantities, setQuantities] = useState({});
//   const [totals, setTotals] = useState({});

//   useEffect(() => {
//     const initialPrices = {};
//     const initialQuantities = {};
//     const initialTotals = {};
//     productList?.map((ele) =>
//       ele.products?.forEach((product, index) => {
//         initialPrices[product._id] = product.price;
//         initialQuantities[product._id] = 1;
//         initialTotals[product._id] = product.price;
//       })
//     );

//     setPrices(initialPrices);
//     setQuantities(initialQuantities);
//     setTotals(initialTotals);
//   }, [productList]);

//   const updateQuantity = (productId, value) => {
//     if (Subitems.length) {
//       Subitems.map((item) => {
//         if (item._id == productId) {
//           item.qty = parseInt(value);
//           return item;
//         }
//       });

//       const MyiTems = Subitems.map((items)=> (
//         {
//           item: items._id,
//           qty: items.qty,
//           price: items.price,
//           total: items.total,
//           remarks: items.remarks
//         }
//       ))
//       // console.log(MyiTems)
//       localStorage.setItem('myItems', JSON.stringify(MyiTems));
//       // console.log({ Subitems, productId });
//     }
//     setQuantiyvalue(value);
//     const updatedQuantities = { ...quantities, [productId]: value };
//     setQuantities(updatedQuantities);

//     const updatedTotals = { ...totals };
//     updatedTotals[productId] = prices[productId] * value;
//     setTotals(updatedTotals);
//   };

//   const optionsss = ['Addition', 'Substraction'];

//   useEffect(() => {
//     const fetchData2 = async () => {
//       try {
//         const response = await request.getLeadWorker();
//         if (response.success) {
//           setWorkLead(response.result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData2();
//   }, []);

//   const filteredWorkLead = WorkLead?.filter((item) => item._id !== Workers);

//   return (
//     <>
//       {/* CUSTOMER DETAIL SECTION */}
//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-1px;', marginBottom: '20px' }}
//       >
//         {translate('Customer Detail Section')}
//       </Col>
//       <Row gutter={[12, 0]} style={{ marginTop: '30px' }}>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="client"
//             label={translate('Select Customer')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <AutoCompleteAsync
//               entity={'client'}
//               displayLabels={['name']}
//               searchFields={'name,surname'}
//               onChange={handleFirstDropdownChange}
//             />
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="clientAddress"
//             label={translate('Customer Address')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//             >
//               {customerAddress?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="billingAddress"
//             label={translate('Billing Address')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//             >
//               {customerAddress.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.label}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="sendQuotationEmail"
//             label={translate('Send WorkOrder Email')}
//             // rules={[
//             //   {
//             //     required: true,
//             //     message: 'Please select a Send Quotation Email:',
//             //   },
//             // ]}
//           >
//             <Radio.Group style={{ display: 'flex', gap: '20px' }}>
//               <Radio value="1" selected>
//                 Yes
//               </Radio>
//               <Radio value="0">No</Radio>
//             </Radio.Group>
//           </Form.Item>
//         </Col>
//       </Row>
//       <Divider dashed />

//       {/* BASIC WORKORDER DETAILS */}

//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//       >
//         {translate('Basic Work Order Details')}
//       </Col>
//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '30px' }}>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="startDate"
//             label={translate('Start Date')}
//             rules={[
//               {
//                 required: true,
//                 type: 'object',
//               },
//             ]}
//             initialValue={dayjs()}
//           >
//             <DatePicker style={{ width: '100%' }} format={dateFormat} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="endDate"
//             label={translate('Expire Date')}
//             rules={[
//               {
//                 required: true,
//                 type: 'object',
//               },
//             ]}
//             initialValue={dayjs().add(30, 'days')}
//           >
//             <DatePicker style={{ width: '100%' }} format={dateFormat} />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="startTime"
//             label={translate('Start Time')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <TimePicker style={{ width: '100%' }} format="HH:mm" />
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={6}>
//           <Form.Item
//             name="expectedRequiredTime"
//             label={translate('Expected Time Required')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <TimePicker style={{ width: '100%' }} format="HH:mm" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '20px' }}>
//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="salesPerson"
//             label={translate('Sales Person')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onChange={(event) => setSelectedSalesPerson(event)}
//             >
//               {SalesPerson?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={8}>
//           <ContactHandler salesContactNumber={salesContactNumber} />
//         </Col>

//         <Col className="gutter-row" span={8}>
//           <Form.Item label={translate('Files')} name="Files">
//             <Input type="file" />
//           </Form.Item>
//         </Col>
//       </Row>
//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '20px' }}>
//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="LeadWorker"
//             label={translate('Lead Worker')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onChange={(event) => setWorkers(event)}
//             >
//               {WorkLead?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={8}>
//           <Form.Item
//             name="SelectWorkers"
//             label={translate('Select Workers')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               mode="multiple"
//             >
//               {filteredWorkLead?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>
//       <Divider dashed />

//       {/* WORKORDER SERVICES */}

//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//       >
//         {translate('Work Order Services')}
//       </Col>

//       {/* ---------------NEW SERVICE CATEGORY------------ */}

//       <Row gutter={[12, 12]} style={{ position: 'relative' }}>
//         <Col className="gutter-row" span={12}>
//           <Form.Item name="serviceCategory" label={translate('Service Category')}>
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onChange={getCategorySubscriptionHandler}
//             >
//               {serviceCategoryOptions?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="serviceList"
//             label={translate('Service Name')}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//               onSelect={(value) => {
//                 if (value === 'custom') {
//                   // subscriptiononetime
//                   IsActiveness(2);
//                   IsActiveSelect(1);
//                   setSubscriptionIds([]);
//                 } else {
//                   setSubscriptionIds([]);
//                   const selectedOption = ShowServiceList.find((option) => option._id === value);
//                   if (selectedOption) {
//                     setShowServiceId(selectedOption.subscriptions);
//                     IsActiveSelect(2);
//                     IsActiveness(1);
//                   } else {
//                     IsActiveness(0);
//                     IsActiveSelect(0);
//                   }
//                 }
//               }}
//             >
//               <Select.Option key="custom" value="custom">
//                 Custom Service (One Time)
//               </Select.Option>
//               {ShowServiceList?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>
//                   {option.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       {/* NEW CODE */}

//       {activeness == 2 && (
//         <>
//           <Row gutter={[12, 12]} style={{ position: 'relative' }}>
//             <Col className="gutter-row" span={12}>
//               <Form.Item
//                 label={translate('Service Name')}
//                 name="ServiceName"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col className="gutter-row" span={12}>
//               <Form.Item
//                 label={translate('Service Price')}
//                 name="ServicePrice"
//                 rules={[
//                   {
//                     required: true,
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>

//             <Col className="gutter-row" span={24}>
//               <Form.Item
//                 label={translate('Service Description')}
//                 name="ServiceDescription"
//                 rules={[]}
//               >
//                 <Input.TextArea />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Collapse
//             accordion
//             activeKey={accordionActiveKey}
//             onChange={handleChange}
//             style={{ marginTop: '5%' }}
//           >
//             {productList?.map((mainData, i) => (
//               <>
//                 {i == productList.length - 2 && (
//                   <Collapse.Panel header={'Custom Item'} key={'custom item'}>
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={'ci-11'}>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={6}>
//                         <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
//                       </Col>
//                     </Row>
//                     <Form.List
//                       name="customItems"
//                       initialValue={[
//                         {
//                           itemName: '',
//                           price: '',
//                           quantity: '',
//                           total: '',
//                           remarks: '',
//                         },
//                       ]}
//                     >
//                       {(fields, { add, remove }) => (
//                         <>
//                           {fields?.map((field, index) => (
//                             <ItemRow
//                               key={field.key}
//                               remove={remove}
//                               field={field}
//                               current={current}
//                               isFirstRow={index === 0}
//                             ></ItemRow>
//                           ))}
//                           <Form.Item>
//                             <Button
//                               type="dashed"
//                               onClick={() => add()}
//                               block
//                               icon={<PlusOutlined />}
//                               ref={addField}
//                             >
//                               {translate('Add field')}
//                             </Button>
//                           </Form.Item>
//                         </>
//                       )}
//                     </Form.List>
//                   </Collapse.Panel>
//                 )}
//                 <Collapse.Panel header={mainData.name} key={mainData._id}>
//                   <div key={`${i}`}>
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Sub-Item')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Price')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <p style={{ marginLeft: '20%' }}>{translate('Quantity')}</p>{' '}
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <p style={{ marginLeft: '40%' }}>{translate('Total')}</p>
//                       </Col>
//                       <Col className="gutter-row" span={6}>
//                         <p style={{ marginLeft: '15%' }}>{translate('Remarks')}</p>
//                       </Col>
//                     </Row>
//                     {/* <Form.List name="items" >
//                     <> */}

//                     {mainData.products?.map((data, index) => (
//                       <Row
//                         gutter={[12, 12]}
//                         style={{ position: 'relative' }}
//                         key={`${index}-${data._id}`}
//                       >
//                         <Col className="gutter-row mt-2">
//                           <Checkbox
//                             onChange={() => {
//                               ItemHandler(data);
//                             }}
//                             // onChange={(e) => handleCheckboxChange(data, e.target.checked)}
//                           />
//                         </Col>
//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={['items', index, 'item']}
//                             initialValue={data._id}
//                             rules={[
//                               {
//                                 validator: (_, value) => {
//                                   if (value || data.name) {
//                                     // Allow the default value to pass
//                                     return Promise.resolve();
//                                   }
//                                   return Promise.reject(new Error('Item name is required'));
//                                 },
//                               },
//                             ]}
//                           >
//                             ]<span>{data.name}</span>
//                           </Form.Item>
//                         </Col>
//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={['items', index, 'price']}
//                             // initialValue={data.price}
//                             initialValue={prices[data._id]}
//                           >
//                             <InputNumber
//                               className="moneyInput"
//                               onChange={updatePrice}
//                               // onChange={(value) => updateePricee(data._id, value)}
//                               // value={selectedItems[data._id]?.price || prices[data._id]}
//                               min={0}
//                               controls={false}
//                               addonAfter={
//                                 money.currency_position === 'after'
//                                   ? money.currency_symbol
//                                   : undefined
//                               }
//                               addonBefore={
//                                 money.currency_position === 'before'
//                                   ? money.currency_symbol
//                                   : undefined
//                               }
//                               // defaultValue={data.price}
//                               value={prices[data._id]}
//                               readOnly
//                             />
//                           </Form.Item>
//                         </Col>
//                         <Col className="gutter-row" span={3}>
//                           <Form.Item
//                             name={[`items`, `${index}`, 'quantity']}
//                             // rules={[{ required: true }]}
//                           >
//                             <InputNumber
//                               style={{ width: '100%' }}
//                               min={0}
//                               defaultValue={1}
//                               // onChange={(value) => updateeQuantityy(data._id, value)}
//                               onChange={(value) => updateQuantity(data._id, value)}
//                               // value={selectedItems[data._id]?.quantity || 1}
//                             />
//                           </Form.Item>
//                         </Col>

//                         <Col className="gutter-row" span={4}>
//                           <Form.Item
//                             name={[`items`, `${index}`, 'total']}
//                             initialValue={totals[data._id]}
//                           >
//                             <span style={{ marginLeft: '24%' }} defaultValue={totals[data.id]}>
//                               {totals[data._id]}
//                             </span>
//                             {/* <InputNumber
//                             readOnly
//                             className="moneyInput"
//                             // value={totalState}
//                             defaultValue={totals[data._id]}
//                             // value={totals[data._id]}
//                             min={0}
//                             controls={false}
//                             addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
//                             addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
//                             formatter={(value) => money.amountFormatter({ amount: value })}
//                           // initialValue={totalState}
//                           /> */}
//                           </Form.Item>
//                         </Col>

//                         <Col className="gutter-row" span={7}>
//                           <Form.Item name={[`items`, `${index}`, 'remarks']}>
//                             <Input
//                               placeholder=" Remarks for Workorder"
//                               defaultValue={data.description}
//                             />
//                           </Form.Item>
//                         </Col>
//                       </Row>
//                     ))}
//                     {/* </>
//                   </Form.List> */}
//                   </div>
//                 </Collapse.Panel>
//               </>
//             ))}
//           </Collapse>
//         </>
//       )}

//       {activeSelect == 2 && (
//         <>
//           <Col className="gutter-row" span={24}>
//             <Form.Item label={translate('Service Description')} name="ServiceDescription">
//               <Input.TextArea />
//             </Form.Item>
//           </Col>
//           <Col className="gutter-row" span={24}>
//             <Row gutter={[12, 12]}>
//               <Col span={24}>
//                 <Table
//                   columns={generateColumns()}
//                   dataSource={generateTableData()}
//                   pagination={false}
//                 />
//               </Col>
//             </Row>
//           </Col>
//           <Collapse
//             accordion
//             activeKey={accordionActiveKey}
//             onChange={handleChange}
//             style={{ marginTop: '5%' }}
//           >
//             <Collapse.Panel header="Custom Item" key="custom-item">
//               <Row gutter={[12, 12]} style={{ position: 'relative' }} key="ci-11">
//                 <Col className="gutter-row" span={4}>
//                   <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
//                 </Col>
//                 <Col className="gutter-row" span={4}>
//                   <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
//                 </Col>
//                 <Col className="gutter-row" span={3}>
//                   <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
//                 </Col>
//                 <Col className="gutter-row" span={4}>
//                   <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
//                 </Col>
//                 <Col className="gutter-row" span={6}>
//                   <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
//                 </Col>
//               </Row>
//               <Form.List
//                 name="customItems"
//                 initialValue={[
//                   {
//                     itemName: '',
//                     price: '',
//                     quantity: 1, // Ensure initial quantity is set to 1
//                     total: '',
//                     remarks: '',
//                   },
//                 ]}
//               >
//                 {(fields, { add, remove }) => (
//                   <>
//                     {fields?.map((field, index) => (
//                       <ItemRow
//                         key={field.key}
//                         remove={remove}
//                         field={field}
//                         current={current}
//                         isFirstRow={index === 0}
//                         onChange={{
//                           // CustomItemNameHandler,
//                           // CustomItemPriceHandler,
//                           // CustomItemQTYHandler,
//                         }}
//                       />
//                     ))}
//                     <Form.Item>
//                       <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         block
//                         icon={<PlusOutlined />}
//                         ref={addField}
//                       >
//                         {translate('Add field')}
//                       </Button>
//                     </Form.Item>
//                   </>
//                 )}
//               </Form.List>
//             </Collapse.Panel>
//             {productList?.map((mainData, i) => (
//               <Collapse.Panel header={mainData.name} key={mainData._id}>
//                 <div key={`${i}`}>
//                   <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
//                     {/* Column headers */}
//                   </Row>
//                   {mainData.products?.map((data, index) => (
//                     <Row gutter={[12, 12]} style={{ position: 'relative' }} key={`${data._id}`}>
//                       <Col className="gutter-row mt-2">
//                         <Checkbox
//                           onChange={() => {
//                             ItemHandler(data);
//                           }}
//                         />
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <Form.Item
//                           name={['items', index, 'item']}
//                           initialValue={data._id}
//                           rules={[
//                             {
//                               validator: (_, value) => {
//                                 if (value || data.name) {
//                                   return Promise.resolve();
//                                 }
//                                 return Promise.reject(new Error('Item name is required'));
//                               },
//                             },
//                           ]}
//                         >
//                           <span>{data.name}</span>
//                         </Form.Item>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <Form.Item
//                           // name={['items', index, 'price']}
//                           initialValue={prices[data._id]}
//                         >
//                           <InputNumber
//                             className="moneyInput"
//                             onChange={updatePrice}
//                             min={0}
//                             controls={false}
//                             addonAfter={
//                               money.currency_position === 'after'
//                                 ? money.currency_symbol
//                                 : undefined
//                             }
//                             addonBefore={
//                               money.currency_position === 'before'
//                                 ? money.currency_symbol
//                                 : undefined
//                             }
//                             value={prices[data._id]}
//                             readOnly
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col className="gutter-row" span={3}>
//                         <Form.Item
//                           // name={['items', index, 'quantity']}
//                           initialValue={1}
//                         >
//                           <InputNumber
//                             style={{ width: '100%' }}
//                             min={0}
//                             defaultValue={1}
//                             value={data.quantity}
//                             onChange={(value) => updateQuantity(data._id, value)}
//                           />
//                         </Form.Item>
//                       </Col>
//                       <Col className="gutter-row" span={4}>
//                         <Form.Item name={['items', index, 'total']} initialValue={totals[data._id]}>
//                           <span style={{ marginLeft: '24%' }}>{totals[data._id]}</span>
//                         </Form.Item>
//                       </Col>
//                       <Col className="gutter-row" span={7}>
//                         <Form.Item
//                         //  name={['items', index, 'remarks']}
//                         >
//                           <Input
//                             placeholder=" Remarks for Workorder"
//                             defaultValue={data.description}
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                   ))}
//                 </div>
//               </Collapse.Panel>
//             ))}
//           </Collapse>
//         </>
//       )}

//       <Divider dashed />

//       {/* WORKORDER BILLING DETAILS */}

//       <Col
//         className="gutter-row"
//         span={12}
//         style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//       >
//         {translate('Work Order Billing Details')}
//       </Col>

//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '30px' }}>
//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="Adjustment"
//             label={translate('Adjustment')}
//             // rules={[
//             //   {
//             //     required: true,
//             //     message: 'Please select a Adjustment Type:',
//             //   },
//             // ]}
//           >
//             <Radio.Group style={{ display: 'flex', gap: '20px' }}>
//               {optionsss.map((option, index) => (
//                 <Radio key={index} value={option} onClick={() => IsActive(index + 2)}>
//                   {option}
//                 </Radio>
//               ))}
//             </Radio.Group>
//           </Form.Item>

//           {active == 3 && (
//             <Form.Item
//               name="AdjustmentValue"
//               rules={[
//                 {
//                   // required: true,
//                 },
//               ]}
//             >
//               <Input onChange={AdjustmentValueHandler} />
//             </Form.Item>
//           )}

//           {active == 2 && (
//             <Form.Item
//               name="AdjustmentValue"
//               rules={[
//                 {
//                   // required: true,
//                 },
//               ]}
//             >
//               <Input onChange={AdjustmentValueHandler} />
//             </Form.Item>
//           )}
//         </Col>

//         <Col className="gutter-row" span={12}>
//           <Form.Item label={translate('Initial Remarks')} name="InitialRemarks">
//             <Input />
//           </Form.Item>
//         </Col>
//       </Row>

//       <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '13px' }}>
//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="discount"
//             label={translate('Discount')}
//             // rules={[
//             //   {
//             //     required: true,
//             //   },
//             // ]}
//           >
//             <InputNumber style={{ width: '100%' }} onChange={DiscountValueHandler} />
//           </Form.Item>
//         </Col>

//         <Col className="gutter-row" span={12}>
//           <Form.Item
//             name="PaymentMode"
//             f
//             label={translate('Payment Mode')}
//             // rules={[
//             //   {
//             //     required: true,
//             //   },
//             // ]}
//           >
//             <Select
//               style={{
//                 width: '100%',
//               }}
//             >
//               {/* {SalesPerson?.map((option, index) => (
//                 <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
//               ))} */}
//             </Select>
//           </Form.Item>
//         </Col>
//       </Row>

//       {subscriptionIds.length > 0 && (
//         <>
//           <Divider dashed />
//           <Col
//             className="gutter-row"
//             span={12}
//             style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
//           >
//             {translate('Selected WorkOrder Billing Details')}
//           </Col>
//           <table style={{ width: '100%', height: '220px', marginTop: '3%' }}>
//             <tbody>
//               <tr>
//                 <th
//                   style={{
//                     border: '0.2px solid #000',
//                     background: 'rgb(248,248,255)',
//                     color: 'rgb(31,31,31)',
//                     padding: '10px',
//                     borderRight: 'none',
//                   }}
//                 >
//                   <ul
//                     className="calculatorFilled"
//                     style={{
//                       listStyle: 'none',
//                       textAlign: 'start',
//                       padding: '0',
//                       lineHeight: '2.1',
//                       borderRight: 'none',
//                     }}
//                   >
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Workorder For
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Per Workorder Cost
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Adjustment</li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Discount({discountValue}%)
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Subtotal</li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                       Tax ({tax?.taxValue || 0}%)
//                     </li>
//                     <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Total</li>
//                   </ul>
//                 </th>
//                 {CalculatorFilled()}
//               </tr>
//               {Subitems.length > 0 && (
//                 <>
//                   <tr>{translate('Additional Service Items')}</tr>
//                   {/* <tr>Additional Service Items</tr> */}
//                   <tr>
//                     <th
//                       style={{
//                         border: '0.2px solid #000',
//                         background: 'rgb(248,248,255)',
//                         color: 'rgb(31,31,31)',
//                         padding: '10px',
//                         borderRight: 'none',
//                       }}
//                     >
//                       <ul
//                         className="calculatorFilled"
//                         style={{
//                           listStyle: 'none',
//                           textAlign: 'start',
//                           padding: '0',
//                           lineHeight: '2.1',
//                         }}
//                       >
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Service Items Included(per workorder)
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Item Total
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Discount({discountValue}%)
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Sub Total
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Tax ({tax?.taxValue || 0}%)
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Total Service Items Cost
//                         </li>
//                         <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
//                           Grand Total
//                         </li>
//                       </ul>
//                     </th>
//                     {CalculatorFilledItem()}
//                   </tr>
//                 </>
//               )}
//             </tbody>
//           </table>
//         </>
//       )}

//       <div style={{ position: 'relative', width: ' 100%', float: 'right', marginTop: '23px' }}>
//         <Row gutter={[12, -5]}>
//           <Col className="gutter-row" span={5}>
//             <Form.Item>
//               <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
//                 {translate('Save')}
//               </Button>
//             </Form.Item>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// NEW CUSTOM ITEM WORK ORDER CODE

import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import {
  Collapse,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Divider,
  Row,
  Col,
  Radio,
  Checkbox,
  Table,
} from 'antd';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { DatePicker, TimePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import QuoteItemRow from '@/modules/ErpPanelModule/QuoteItemRow';
// import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useMoney, useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import { response } from './jsonResponse';
import styles from './styles.module.css'; // Import the CSS module

import { useForm } from 'antd/lib/form/Form';
import { request } from '@/request';
import ItemRow from '@/modules/ErpPanelModule/ItemRow';
const { Option } = Select;
const { Panel } = Collapse;

export default function QuotionForm({ subTotal = 0, current = null }) {
  const { last_quote_number } = useSelector(selectFinanceSettings);

  return <LoadQuoteForm subTotal={subTotal} current={current} />;
}
const initialServiceCost = {
  servicePerWO: null,
  discount: null,
  subTotal: null,
  tax: null,
  totalPackageCost: null,
};

const initialShowServiceId = [
  {
    subscription: {
      _id: 'sub1',
      name: 'Subscription 1',
      package_divider: 2,
    },
    data: [
      { _id: 'data1', name: 'Service 1', price: 100 },
      { _id: 'data2', name: 'Service 2', price: 150 },
    ],
  },
  {
    subscription: {
      _id: 'sub2',
      name: 'Subscription 2',
      package_divider: 3,
    },
    data: [
      { _id: 'data3', name: 'Service 3', price: 200 },
      { _id: 'data4', name: 'Service 4', price: 250 },
    ],
  },
];

const tax = {
  taxValue: 10, // Example tax value
};
function LoadQuoteForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { last_quote_number } = useSelector(selectFinanceSettings);
  const [lastNumber, setLastNumber] = useState(() => last_quote_number + 1);
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [active, IsActive] = useState(1);
  const [activeness, IsActiveness] = useState(1);
  const [activeSelect, IsActiveSelect] = useState(1);

  const handelTaxChange = (value) => {
    setTaxRate(value / 100);
  };
  const { TextArea } = Input;
  const money = useMoney();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [serviceCategory, setserviceCategory] = useState([]);
  const [serviceCategoryNam, setserviceCategoryNam] = useState();

  const [SalesPerson, setSalesPerson] = useState();
  const [WorkLead, setWorkLead] = useState();
  const [Workers, setWorkers] = useState();
  const [CheckedId, setCheckedId] = useState();
  // console.log(CheckedId)
  const [customerAddress, setCustomerAddress] = useState([]);

  const [subscriptionData, setSubscriptionData] = useState({});
  const [accordionData, setAccordionData] = useState([]);
  const [serviceCategoryOptions, setserviceCategoryOptions] = useState([]);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState();

  const handleDropdownChange = async (value) => {
    setSelectedOption(value);
    try {
      // const response = await axios.get(`client/search?q=${value}&fields=label`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
      // console.log(response)
      setAccordionData(response); // Assuming the response contains an array of accordion data
    } catch (error) {
      console.error('Error fetching accordion data:', error);
    }
  };

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year, number } = current;
      setTaxRate(taxRate / 100);
      setCurrentYear(year);
      setLastNumber(number);
    }
  }, [current]);
  useEffect(() => {
    const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)));
    setTotal(Number.parseFloat(currentTotal));
  }, [subTotal, taxRate]);

  const addField = useRef('');

  useEffect(() => {
    // Check if addField.current is not null before clicking
    if (addField.current) {
      addField.current.click();
    }
  }, []); // This effect runs only once when the component mounts

  // console.log({ serviceOptions });

  const [productList, setProductList] = useState([]);

  const [tax, setTax] = useState({});

  localStorage.setItem('TaxPercentage', tax?.taxValue);

  useEffect(() => {
    getProductHandler();
    // getClientHandler()
  }, []);
  const getProductHandler = async () => {
    try {
      const productListRes = await request.getProductList();
      if (productListRes.success) {
        const taxHandller = await request.getTax();

        if (taxHandller.success) {
          setTax(taxHandller.result);
        }
        setProductList(productListRes.result);
      } else {
        setProductList([]);
      }
    } catch (er) {
      console.error({ er });
    }
  };

  const [selectedValue, setSelectedValue] = useState('');
  const [serviceOptions, setServiceOptions] = useState(null);
  const [ShowServiceList, setShowServiceList] = useState(null);
  const [subscriptionOneTime, setSubcriptionOneTime] = useState();

  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [subItemCount, setSubItemCount] = useState(0);
  // const [ShowServiceId, setShowServiceId] = useState();
  const [isFirstServiceCategorySelect, setIsFirstServiceCategorySelect] = useState(true);
  const getCategorySubscriptionHandler = (value) => {
    setSelectedValue(value);
    setItems([]);
    setSubItemId([]);
    setSubItemCount(0);
    setSelectedOption(true);
    // Show all subscriptions corresponding to the selected option
    setShowServiceId();
    IsActiveness(0);
    IsActiveSelect(0);

    // Clear previous subscription selection when switching options
    setSubscriptionIds([]);
    setSubscriptionCount(0);
    // setIsFirstServiceCategorySelect(false);
    const fetchData2 = async () => {
      try {
        const response = await request.getServiceCategoryOptions({ id: value });
        console.log(response);
        if (response.success) {
          setServiceOptions(response.result);
          getProductHandler();
        } else {
          setServiceOptions(null);
        }
      } catch (error) {
        setServiceOptions(null);
        console.error('Error fetching data:', error);
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await request.getServiceListShow({ id: value });
        console.log(response);
        if (response.success) {
          setShowServiceList(response.result);
          setProductList(ShowServiceList);
        } else {
          setShowServiceList(null);
        }
      } catch (error) {
        setShowServiceList(null);
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();
    fetchData3();
  };

  const handleFirstDropdownChange = async (event) => {
    console.log('event', event);
    try {
      const response = await request.getSearchClientAddress(event);
      console.log('response', response);
      if (response.success) {
        setCustomerAddress(response.result);
        // Set options state based on API response
      } else {
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getServicesSubAndItems = async (event) => {
    // const selectedValue = event.target.value;
    // setSelectedOption(selectedValue);

    // Make API request with the selected value
    try {
      // const response = await fetch(`your_api_endpoint/${selectedValue}`);
      const data = [
        { value: '1', label: 'Home' },
        { value: '3', label: 'Billing' },
        { value: '4', label: 'Shipping' },
      ];
      // Extract options from the API response
      const extractedOptions = data?.map((item) => ({
        value: item.value,
        label: item.label,
      }));

      // Update the options for the second dropdown
      setSecondDropdownOptions(extractedOptions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [accordionActiveKey, setAccordionActiveKey] = useState([]);
  const handleChange = (key) => {
    setAccordionActiveKey(key);
  };
  // const translate = useLanguage()
  const [totalState, setTotal2] = useState(undefined);
  const [price, setPrice] = useState();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  // const money = useMoney();
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    console.log(value);
    setPrice(value);
  };
  const updateName = (value) => {
    setName(value);
  };
  const [form] = useForm();

  useEffect(() => {
    if (current) {
      const { items, invoice } = current;
      console.log(items);
      if (invoice) {
        const item = invoice[field.fieldKey];
        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      } else {
        const item = items[field.fieldKey];
        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);

    setTotal2(currentTotal);
  }, [price, quantity]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.getServiceCategoryOptions();

        if (response.success) {
          setserviceCategoryOptions(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // --------- WORK ORDER MODULE -----------
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await request.getSalesPerson();
        if (response.success) {
          setSalesPerson(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData1();
  }, []);

  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await request.getServiceCategory();
        if (response.success) {
          setserviceCategory(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData3();
  }, []);
  useEffect(() => {
    const hendleOneTime = async () => {
      try {
        const response = await request.getSubscriptiononetime();
        // console.log(response)
        if (response.success) {
          //  console.log(response.result._id)
          setSubcriptionOneTime(response.result._id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    hendleOneTime();
  }, []);

  const handleserviceId = async (event) => {
    try {
      const response = await request.getServiceCategoryName(event);
      if (response.success) {
        setserviceCategoryNam(response.result);
      } else {
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [salesContactNumber, setSalesContactNumber] = useState();
  useEffect(() => {
    if (selectedSalesPerson) {
      let number = SalesPerson?.find((option) => option._id === selectedSalesPerson)?.phone;
      setSalesContactNumber(number);
      ContactHandler({ salesContactNumber: number });
      let saleRepConElement = document.getElementById('salesContactNumber');
      saleRepConElement.value = number || null;
      // console.log({ number, salesContactNumber });
    }
  }, [selectedSalesPerson, salesContactNumber]);
  const [selectedIds, setSelectedIds] = useState({ itemId: null, subscriptionId: null });
  useEffect(() => {}, [selectedSalesPerson]);
  const ContactHandler = ({ salesContactNumber }) => {
    return (
      <Form.Item
        label={translate('Sales Person Contact')}
        name="SalesPersonContact"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue={salesContactNumber}
      >
        <Input
          style={{
            width: '100%',
          }}
          placeholder=""
          id="salesContactNumber"
          value={salesContactNumber}
        />
      </Form.Item>
    );
  };

  const filteredWorkLeads = WorkLead?.filter((item) => item._id !== Workers);

  const getUniqueSubscriptionNames = () => {
    const subscriptionNames = [];
    ShowServiceId.forEach((ele) => {
      // console.log(ele);
      ele.data.forEach((item) => {
        if (!subscriptionNames.includes(item.name)) {
          subscriptionNames.push(item.name);
        }
      });
    });
    return subscriptionNames;
  };

  const generateColumns = () => {
    const subscriptionNames = getUniqueSubscriptionNames();
    const columns = [
      {
        title: 'Subscription',
        dataIndex: 'Subscription',
        name: 'subscriptions',
      },
    ];

    subscriptionNames?.forEach((name) => {
      columns.push({
        title: <span>{name}</span>,
        dataIndex: name,
      });
    });

    return columns;
  };
  // const [subscriptionIds, setSubscriptionIds] = useState([]);
  // const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [isSubscriptionID, seTisSubscriptionID] = useState(null);

  const [adjustmentvalue, setadjustment] = useState(null);
  // const [discountValue, setdiscount] = useState(null);
  // console.log(discountValue)

  const [Subitems, setItems] = useState([]);
  const [subItemIds, setSubItemId] = useState([]);
  const [NewSubitems, setNewItems] = useState([]);
  const [NewsubItemIds, NewsetSubItemId] = useState([]);
  const [Newiitems, setNewiitems] = useState([]);
  const [remarks, setRemarks] = useState([]);
  // console.log(remarks)

  //  const MyiTems = Newiitems.map((items)=> (

  //   {
  //     item: items._id,
  //     qty: items.qty,
  //     price: items.price,
  //     total: items.total,
  //     remarks: remarks
  //   }
  // ))
  const MyiTems = Newiitems.map((item) => {
    const itemRemark = remarks.find((remark) => remark.id === item._id);
    return {
      item: item._id,
      qty: item.qty,
      price: item.price,
      total: item.total,
      remarks: itemRemark ? itemRemark.remarks : '',
    };
  });

  localStorage.setItem('myItems', JSON.stringify(MyiTems));

  const [quantityvalue, setQuantiyvalue] = useState();
  const [remarkvalue, setremarkvalue] = useState();

  useEffect(() => {}, [subscriptionCount, subItemCount]);
  let subscriptionSubTotal = 0;
  let subscritionAmount = 0;

  // const handleRemarkChange = (id, value) => {
  //   console.log(value)
  //   localStorage.setItem('Reamarksitem', value);
  // }

  const handleRemarkChange = (id, value) => {
    setRemarks((prevRemarks) => {
      // Create a copy of the previous remarks
      const updatedRemarks = [...prevRemarks];
      // Find the index of the object with the matching id
      const itemIndex = updatedRemarks.findIndex((item) => item.id === id);

      if (itemIndex > -1) {
        // If the item exists, update the remark
        updatedRemarks[itemIndex].remarks = value;
      } else {
        // If the item doesn't exist, add a new object
        updatedRemarks.push({ id, remarks: value });
      }

      // Save the updated array back to localStorage
      localStorage.setItem('RemarksItem', JSON.stringify(updatedRemarks));
      return updatedRemarks;
    });
  };

  const ItemHandler = (element) => {
    setNewiitems((prevItems) => [...prevItems, element]);

    setCheckedId(element.price);
    const tempId = [...subItemIds];
    const temp = [...Subitems];

    const NewtempId = [...NewsubItemIds];
    const Newtemp = [...NewSubitems];

    element.total = element.price * (quantityvalue || 1);
    element.qty = 1;

    // element.remarks = remarkvalue || "";

    const selectedIndex = tempId.indexOf(element._id);
    if (selectedIndex !== -1) {
      tempId.splice(selectedIndex, 1);
      const itemIndex = temp.findIndex((item) => item._id === element._id);
      if (itemIndex !== -1) {
        temp.splice(itemIndex, 1);
      }
    } else {
      tempId.push(element._id);
      temp.push(element);
      NewtempId.push(element._id);
      Newtemp.push(element);
    }
    setSubItemId(tempId);
    NewsetSubItemId(tempId);
    setItems(temp);
    setNewItems(temp);
    setSubItemCount(temp.length);
  };

  const initialServiceCost = {
    servicePerWO: null,
    discount: null,
    subTotal: null,
    tax: null,
    totalPackageCost: null,
  };

  let additionalCost = {
    subTotal: null,
    tax: null,
    totalPackageCost: null,
    itemTotal: null,
    discount: null,
  };

  // console.log({ additionalCost });

  const [subscriptionIds, setSubscriptionIds] = useState([]);

  const [discountValue, setdiscount] = useState(0);
  console.log(discountValue);

  const [serviceCost, setServiceCost] = useState(initialServiceCost);
  const [ShowServiceId, setShowServiceId] = useState(initialShowServiceId);

  const handleCheckboxClick = (id) => {
    let temp = [...subscriptionIds];
    if (temp.includes(id)) {
      temp = temp.filter((item) => item !== id);
    } else {
      temp.push(id);
    }
    setSubscriptionIds(temp);
    setSubscriptionCount(temp.length);
    localStorage.setItem('WorkOrderSubId', id);
  };

  // useEffect(() => {
  //   const calculateCosts = () => {
  //     const discountValueParsed = parseFloat(discountValue) || 0;
  //     let subscriptionsArray = [];
  //     let newServiceCost = { ...initialServiceCost };

  //     ShowServiceId?.forEach((subscriptionObj) => {
  //       subscriptionObj.data.forEach((dataObj) => {
  //         if (subscriptionIds.includes(dataObj._id)) {
  //           const servicePerWO = parseFloat(
  //             dataObj.price / subscriptionObj.subscription.package_divider
  //           ).toFixed(2);
  //           const discount = parseFloat(servicePerWO * (discountValueParsed / 100)).toFixed(2);
  //           const subTotal = parseFloat(servicePerWO - discount).toFixed(2);
  //           const taxValueParsed = parseFloat(tax.taxValue) || 0;
  //           const taxAmount = parseFloat(subTotal * (taxValueParsed / 100)).toFixed(2);
  //           const totalPackageCost = parseFloat(subTotal + taxAmount).toFixed(2);

  //           newServiceCost = {
  //             servicePerWO,
  //             discount,
  //             subTotal,
  //             tax: taxAmount,
  //             totalPackageCost,
  //           };

  //           subscriptionsArray.push({
  //             subscription: subscriptionObj.subscription._id,
  //             subModule: dataObj._id,
  //             serviceCost: newServiceCost,
  //           });
  //         }
  //       });
  //     });

  //     setServiceCost(newServiceCost);
  //     localStorage.setItem('Subscriptions', JSON.stringify(subscriptionsArray));
  //   };

  //   calculateCosts();
  // }, [subscriptionIds, discountValue, ShowServiceId, tax]);

  useEffect(() => {
    const calculateCosts = () => {
      const discountValueParsed = parseFloat(discountValue) || 0;
      let subscriptionsArray = [];

      let newServiceCost = { ...initialServiceCost };
      ShowServiceId?.forEach((subscriptionObj) => {
        // console.log(subscriptionObj)
        subscriptionObj.data?.forEach((dataObj) => {
          if (subscriptionIds.includes(dataObj._id)) {
            const servicePerWO = parseFloat(
              dataObj.price / subscriptionObj.subscription.package_divider
            ).toFixed(2);
            const discount = parseFloat(servicePerWO * (discountValueParsed / 100)).toFixed(2);
            const subTotal = parseFloat(servicePerWO - discount).toFixed(2);
            const taxValueParsed = parseFloat(tax.taxValue) || 0;
            const taxAmount = parseFloat(subTotal * (taxValueParsed / 100)).toFixed(2);
            const totalPackageCost = parseFloat(subTotal + taxAmount).toFixed(2);

            newServiceCost = {
              servicePerWO,
              discount,
              subTotal,
              tax: taxAmount,
              totalPackageCost,
            };

            subscriptionsArray.push({
              subscription: subscriptionObj.subscription._id,
              // subModule: dataObj._id,
              subModule: dataObj._id,
              // serviceCost: newServiceCost,
            });
          }
        });
      });

      const CustomsubscriptionArray = [
        {
          subscription: subscriptionOneTime,
        },
      ];

      setServiceCost(newServiceCost);
      localStorage.setItem(
        'Subscriptions',
        JSON.stringify(subscriptionsArray.length > 0 ? subscriptionsArray : CustomsubscriptionArray)
      );
    };

    calculateCosts();
  }, [subscriptionIds, discountValue, ShowServiceId, tax]);

  const DiscountValueHandler = (value) => {
    setdiscount(value ?? 0);
  };

  const generateTableData = () => {
    const subscriptionNames = getUniqueSubscriptionNames();
    const tableData = [];
    ShowServiceId?.forEach((ele) => {
      const rowData = {
        Subscription: ele.subscription.name,
      };

      subscriptionNames?.forEach((name) => {
        const matchingItem = ele.data.find((item) => item.name === name);

        rowData[name] = matchingItem ? (
          <Checkbox.Group
            key={matchingItem._id}
            onChange={() => handleCheckboxClick(matchingItem._id)}
          >
            <Checkbox value={matchingItem._id}>
              {`${matchingItem.price}.00 /${ele.subscription.name}`}
            </Checkbox>
          </Checkbox.Group>
        ) : null;
      });

      tableData.push(rowData);
    });
    return tableData;
  };

  // const CalculatorFilled = () => {
  //   return ShowServiceList.map((element, _id) =>
  //     element.subscriptions.map((subscriptions, __id) =>
  //       subscriptions.data.map((subscription, ___id) => {
  //         let package_divider = parseFloat(subscriptions.subscription.package_divider);
  //         subscritionAmount = parseFloat(subscription.price / package_divider);
  //         let subTotal = parseFloat(subscription.price / package_divider);
  //         if (active == 2) {
  //           subTotal += parseFloat(adjustmentvalue);
  //         }
  //         if (active == 3) {
  //           subTotal -= parseFloat(adjustmentvalue);
  //         }
  //         let discount = 0;
  //         if (discountValue) {
  //           discount = subTotal * (parseFloat(discountValue) / 100);
  //           subTotal -= subTotal * (parseFloat(discountValue) / 100);
  //         }
  //         let taxValue = 0;
  //         if (tax.taxValue) {
  //           taxValue = subTotal * (parseFloat(tax.taxValue) / 100);
  //         }
  //         if (subscriptionIds.includes(subscription._id)) {
  //           subscriptionSubTotal = subTotal + taxValue;
  //           // serviceCost.servicePerWO = parseFloat(subscription.price / package_divider).toFixed(2);
  //           // serviceCost.discount = parseFloat(discount || 0).toFixed(2);
  //           // serviceCost.subTotal = parseFloat(subTotal).toFixed(2);
  //           // serviceCost.tax = parseFloat(taxValue).toFixed(2);
  //           // serviceCost.totalPackageCost = parseFloat(subTotal + taxValue).toFixed(2);
  //           // localStorage.setItem("jv1GYkk6plxCpgx", parseFloat(subTotal + taxValue).toFixed(2))
  //           // localStorage.setItem("ZeFnMqDC7ktkKDB", JSON.stringify(serviceCost))
  //           return (
  //             <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
  //               <ul
  //                 style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
  //               >
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '-1px',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {subscription.name}:{subscriptions.subscription.name}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(subscription.price / package_divider).toFixed(2)}/Workorder
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(adjustmentvalue || 0).toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(discount || 0).toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(subTotal).toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(taxValue).toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(subTotal + taxValue).toFixed(2)}
  //                 </li>
  //               </ul>
  //             </td>
  //           );
  //         }
  //       })
  //     )
  //   );
  // };

  // const CalculatorFilledItem = () => {
  //   return ShowServiceList.map((element, _id) =>
  //     element.subscriptions.map((subscriptions, __id) =>
  //       subscriptions.data.map((subscription, ___id) => {
  //         let package_divider = parseFloat(subscriptions.subscription.package_divider);
  //         subscritionAmount = parseFloat(subscription.price / package_divider);
  //         let subTotal = parseFloat(subscription.price / package_divider);
  //         if (active == 2) {
  //           subTotal += parseFloat(adjustmentvalue);
  //         }
  //         if (active == 3) {
  //           subTotal -= parseFloat(adjustmentvalue);
  //         }
  //         let discount1 = 0;
  //         if (discountValue) {
  //           discount1 = subTotal * (parseFloat(discountValue) / 100);
  //           subTotal -= subTotal * (parseFloat(discountValue) / 100);
  //         }
  //         let taxValue = 0;
  //         if (tax.taxValue) {
  //           taxValue = subTotal * (parseFloat(tax.taxValue) / 100);
  //         }
  //         if (subscriptionIds.includes(subscription._id)) {
  //           subscriptionSubTotal = subTotal + taxValue;
  //           let itemPrice = 0;
  //           let itemMPrice = 0;
  //           let discount = 0;
  //           let taxValue1 = 0;
  //           let subITotal = 0;

  //           return (
  //             <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
  //               <ul
  //                 style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
  //               >
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '-1px',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {Subitems.map((item, index) => {
  //                     itemMPrice += parseFloat(item.total) * package_divider * item.qty;
  //                     itemPrice += parseFloat(item.total) * package_divider * item.qty;
  //                     subITotal = itemPrice;
  //                     if (discountValue) {
  //                       discount = (parseFloat(itemMPrice) * parseInt(discountValue)) / 100;
  //                       subITotal = subITotal - discount;
  //                     }
  //                     else {
  //                     }
  //                     if (tax.taxValue) {
  //                       taxValue1 = parseFloat(itemPrice) * (parseInt(tax.taxValue) / 100);
  //                     }
  //                     localStorage.setItem(
  //                       'jv1GYkk6plxCpgx',
  //                       parseFloat(subscriptionSubTotal + subITotal + taxValue1).toFixed(2)
  //                     );
  //                     additionalCost.subTotal = parseFloat(subITotal).toFixed(2);
  //                     additionalCost.tax = parseFloat(taxValue).toFixed(2);
  //                     additionalCost.totalPackageCost = parseFloat(itemPrice + taxValue1).toFixed(
  //                       2
  //                     );
  //                     localStorage.setItem('BQaBocV8yvv9ELm', JSON.stringify(additionalCost));
  //                     return (
  //                       <>
  //                         item:{item.name} (x{item.qty}){index != Subitems.length && <br />}
  //                       </>
  //                     );
  //                   })}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >

  //                   {/* { console.log(itemMPrice)} */}
  //                   {itemMPrice.toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {discount.toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {subITotal.toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {(taxValue || 0).toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {(subITotal + taxValue).toFixed(2)}
  //                 </li>
  //                 <li
  //                   style={{
  //                     borderBottom: '1px solid rgb(217,217,217)',
  //                     fontSize: '15px',
  //                     marginTop: '',
  //                     color: 'rgb(49,91,140)',
  //                   }}
  //                 >
  //                   {parseFloat(subscriptionSubTotal + subITotal + taxValue).toFixed(2)}
  //                 </li>
  //               </ul>
  //             </td>
  //           );
  //         }
  //       })
  //     )
  //   );
  // };

  const CalculatorFilled = () => {
    return ShowServiceList.map((element, _id) =>
      element.subscriptions.map((subscriptions, __id) =>
        subscriptions.data.map((subscription, ___id) => {
          console.log({ subscriptions });

          let package_divider = parseFloat(subscriptions.subscription.package_divider);
          subscritionAmount = parseFloat(subscription.price / package_divider);
          let subTotal = parseFloat(subscription.price / package_divider);
          if (active == 2) {
            subTotal += parseFloat(adjustmentvalue);
          }
          if (active == 3) {
            subTotal -= parseFloat(adjustmentvalue);
          }
          let discount = 0;
          if (discountValue) {
            discount = subTotal * (parseFloat(discountValue) / 100);
            subTotal -= subTotal * (parseFloat(discountValue) / 100);
          }
          let taxValue = 0;
          if (tax.taxValue) {
            taxValue = subTotal * (parseFloat(tax.taxValue) / 100);
          }
          if (subscriptionIds.includes(subscription._id)) {
            subscriptionSubTotal = subTotal + taxValue;
            // serviceCost.servicePerWO = parseFloat(subscription.price / package_divider).toFixed(2);
            // serviceCost.discount = parseFloat(discount || 0).toFixed(2);
            // serviceCost.subTotal = parseFloat(subTotal).toFixed(2);
            // serviceCost.tax = parseFloat(taxValue).toFixed(2);
            // serviceCost.totalPackageCost = parseFloat(subTotal + taxValue).toFixed(2);
            // localStorage.setItem("jv1GYkk6plxCpgx", parseFloat(subTotal + taxValue).toFixed(2))

            const ServiceCostitem = {
              servicePerWO: parseFloat(subscription.price / package_divider).toFixed(2),
              discount: parseFloat(discount || 0).toFixed(2),
              subTotal: parseFloat(subTotal).toFixed(2),
              tax: parseFloat(taxValue).toFixed(2),
              totalPackageCost: parseFloat(subTotal + taxValue).toFixed(2),
            };

            //  console.log({ServiceCostitem})
            localStorage.setItem('ServiceCostitem', JSON.stringify(ServiceCostitem));

            localStorage.setItem('ZeFnMqDC7ktkKDB', JSON.stringify(serviceCost));
            return (
              <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
                <ul
                  style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
                >
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '-1px',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {subscription.name}:{subscriptions.subscription.name}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(subscription.price / package_divider).toFixed(2)}/Workorder
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(adjustmentvalue || 0).toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(discount || 0).toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(subTotal).toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(taxValue).toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(subTotal + taxValue).toFixed(2)}
                  </li>
                </ul>
              </td>
            );
          }
        })
      )
    );
  };

  const CalculatorFilledItem = () => {
    return ShowServiceList?.map((element, _id) =>
      element.subscriptions?.map((subscriptions, __id) =>
        subscriptions.data?.map((subscription, ___id) => {
          let package_divider = parseFloat(subscriptions.subscription.package_divider);
          subscritionAmount = parseFloat(subscription.price / package_divider);
          let subTotal = parseFloat(subscription.price / package_divider);
          if (active == 2) {
            subTotal += parseFloat(adjustmentvalue);
          }
          if (active == 3) {
            subTotal -= parseFloat(adjustmentvalue);
          }
          let discount1 = 0;
          if (discountValue) {
            discount1 = subTotal * (parseFloat(discountValue) / 100);
            subTotal -= subTotal * (parseFloat(discountValue) / 100);
          }
          let taxValue = 0;
          if (tax.taxValue) {
            taxValue = subTotal * (parseFloat(tax.taxValue) / 100);
          }
          if (subscriptionIds.includes(subscription._id)) {
            subscriptionSubTotal = subTotal + taxValue;
            let itemPrice = 0;
            let itemMPrice = 0;
            let discount = 0;
            let taxValue1 = 0;
            let subITotal = 0;
            console.log(subITotal);
            return (
              <td style={{ border: '0.2px solid #000', padding: '10px', borderLeft: 'none' }}>
                <ul
                  style={{ listStyle: 'none', textAlign: 'start', padding: '0', lineHeight: '2.3' }}
                >
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '-1px',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {Subitems.map((item, index) => {
                      itemMPrice += parseFloat(item.price) * package_divider * item.qty;
                      itemPrice += parseFloat(item.price) * package_divider * item.qty;
                      subITotal = itemPrice;
                      if (discountValue) {
                        discount = (parseFloat(itemMPrice) * parseInt(discountValue)) / 100;
                        subITotal = subITotal - discount;
                      } else {
                      }
                      if (tax.taxValue) {
                        taxValue1 = parseFloat(itemPrice) * (parseInt(tax.taxValue) / 100);
                      }
                      // subITotal + taxValue
                      localStorage.setItem(
                        'jv1GYkk6plxCpgx',
                        parseFloat(subscriptionSubTotal + subITotal + taxValue).toFixed(2)
                      );
                      additionalCost.subTotal = parseFloat(subITotal).toFixed(2);
                      additionalCost.tax = parseFloat(taxValue).toFixed(2);
                      // additionalCost.totalPackageCost = parseFloat(itemPrice + taxValue1).toFixed(2);
                      additionalCost.totalPackageCost = parseFloat(subITotal + taxValue).toFixed(2);
                      additionalCost.itemTotal = parseFloat(itemMPrice).toFixed(2);
                      additionalCost.discount = parseFloat(discount).toFixed(2);
                      localStorage.setItem('BQaBocV8yvv9ELm', JSON.stringify(additionalCost));
                      return (
                        <>
                          item:{item.name} (x{item.qty ?? 0}){index != Subitems.length && <br />}
                        </>
                      );
                    })}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {itemMPrice.toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {discount.toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {subITotal.toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {(taxValue || 0).toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {(subITotal + taxValue).toFixed(2)}
                  </li>
                  <li
                    style={{
                      borderBottom: '1px solid rgb(217,217,217)',
                      fontSize: '15px',
                      marginTop: '',
                      color: 'rgb(49,91,140)',
                    }}
                  >
                    {parseFloat(subscriptionSubTotal + subITotal + taxValue).toFixed(2)}
                  </li>
                </ul>
              </td>
            );
          }
        })
      )
    );
  };

  const AdjustmentValueHandler = (event) => {
    setadjustment(event.target.value || 0);
    let subTotal = document.getElementById('subTotal');
    subTotal.value = parseFloat(subscritionAmount + parseFloat(event.target.value));
    // console.log({ subTotal });
  };

  // const handleSelectChange = (value) => {
  //   // setadjustment(null);
  //   // setdiscount(null);
  //   setSubscriptionIds([]);
  //   setSubscriptionCount(0);
  //   setSubItemId([]);
  //   setItems([]);
  //   if (value === 'custom') {
  //     // Handle custom option selection
  //     IsActiveness(2);
  //     IsActiveSelect(1);
  //   } else {
  //     const option = ShowServiceList?.find((option) => option._id === value);
  //     if (option) {
  //       // Show all subscriptions corresponding to the selected option
  //       setShowServiceId(option.subscriptions);
  //       IsActiveSelect(2);
  //       IsActiveness(1);
  //     } else {
  //       IsActiveness(0);
  //       IsActiveSelect(0);
  //     }

  //     // Clear previous subscription selection when switching options
  //     setSubscriptionIds([]);
  //     setSubscriptionCount(0);
  //     // setadjustment(null);
  //     // setdiscount(null);
  //   }
  // };
  const [isCustom, setIsCustom] = useState(false);
  localStorage.setItem('IssCustomm', JSON.stringify(isCustom));

  const handleSelectChange = (value) => {
    // setadjustment(null);
    // setdiscount(null);
    setSubscriptionIds([]);
    setSubscriptionCount(0);
    setSubItemId([]);
    setItems([]);
    if (value === 'custom') {
      // Handle custom option selection
      IsActiveness(2);
      IsActiveSelect(1);
      setIsCustom(true);
    } else {
      setIsCustom(false);
      // setShowServiceList([])
      const option = ShowServiceList?.find((option) => option._id === value);
      if (option) {
        // Show all subscriptions corresponding to the selected option
        setShowServiceId(option.subscriptions);
        IsActiveSelect(2);
        IsActiveness(1);
      } else {
        IsActiveness(0);
        IsActiveSelect(0);
      }

      // Clear previous subscription selection when switching options
      // setadjustment(null);
      // setdiscount(null);
    }
    // console.log({ ShowServiceList });
  };

  const [prices, setPrices] = useState({});
  const [quantities, setQuantities] = useState({});
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const initialPrices = {};
    const initialQuantities = {};
    const initialTotals = {};
    productList?.map((ele) =>
      ele.products?.forEach((product, index) => {
      ele.products?.forEach((product, index) => {
        initialPrices[product._id] = product.price;
        initialQuantities[product._id] = 1;
        initialTotals[product._id] = product.price;
      })
    );

    setPrices(initialPrices);
    setQuantities(initialQuantities);
    setTotals(initialTotals);
  }, [productList]);

  const updateQuantity = (productId, value) => {
    if (Subitems.length) {
      Subitems.map((item) => {
        if (item._id == productId) {
          item.qty = parseInt(value);
          return item;
        }
      });

      // const MyiTems = Subitems.map((items)=> (
      //   {
      //     item: items._id,
      //     qty: items.qty,
      //     price: items.price,
      //     total: items.total,
      //     remarks: items.remarks
      //   }
      // ))
      // localStorage.setItem('myItems', JSON.stringify(MyiTems));
    }
    setQuantiyvalue(value);
    const updatedQuantities = { ...quantities, [productId]: value };
    setQuantities(updatedQuantities);

    const updatedTotals = { ...totals };
    updatedTotals[productId] = prices[productId] * value;
    setTotals(updatedTotals);
  };

  const optionsss = ['Addition', 'Substraction'];

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await request.getLeadWorker();
        if (response.success) {
          setWorkLead(response.result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();
  }, []);

  const filteredWorkLead = WorkLead?.filter((item) => item._id !== Workers);

  // CUSTOM ITEM

  // localStorage.setItem('CustomItems', JSON.stringify(CustomItems));
  const [customItems, setCustomItems] = useState([]);
  const [Iscustomm, setIscustomm] = useState(false);
  console.log(Iscustomm);

  localStorage.setItem('CustomItems', JSON.stringify(customItems));

  // const CustomItemNameHandler = (_id, name, price = 0, qty = 1, remove = false) => {
  //   console.log(_id, name, price = 0, qty = 1, remove = false)
  //   const tempId = [...subItemIds];
  //   const temp = [...Subitems];

  //   if (remove && _id) {
  //     const selectedIndex = tempId.indexOf(_id);
  //     if (selectedIndex) {
  //       tempId.splice(selectedIndex, 1);
  //       const itemIndex = temp.findIndex(item => item._id === _id);
  //       if (itemIndex !== -1) {
  //         temp.splice(itemIndex, 1);
  //       }
  //     }
  //   } else {
  //     const selectedIndex = tempId.indexOf(_id);
  //     if (selectedIndex !== -1) {
  //       temp.map((item) => {
  //         if (item._id === _id) {
  //           item.name = name
  //         }
  //       })
  //     } else {
  //       let element = {
  //         _id, price, name,
  //         total: price * (qty),
  //         qty
  //       }

  //       console.warn({ element });
  //       tempId.push(_id);
  //       temp.push(element);
  //       tempcustom.push(element)

  //     }
  //   }
  //   setSubItemId(tempId);
  //   setItems(temp);
  //   setSubItemCount(temp.length);
  // }
  const CustomItemNameHandler = (_id, name, price = 0, qty = 1, remove = false, remarks = '') => {
    console.log(_id, name, (price = 0), (qty = 1), (remove = false), remarks);
    const tempId = [...subItemIds];
    const temp = [...Subitems];
    let tempcustom = [...customItems]; // Assuming you have a state or variable to hold custom items

    if (remove && _id) {
      const selectedIndex = tempId.indexOf(_id);
      if (selectedIndex !== -1) {
        tempId.splice(selectedIndex, 1);
        const itemIndex = temp.findIndex((item) => item._id === _id);
        if (itemIndex !== -1) {
          temp.splice(itemIndex, 1);
        }
        const customItemIndex = tempcustom.findIndex((item) => item._id === _id);
        if (customItemIndex !== -1) {
          tempcustom.splice(customItemIndex, 1);
        }
      }
    } else {
      const selectedIndex = tempId.indexOf(_id);
      if (selectedIndex !== -1) {
        temp.map((item) => {
          if (item._id === _id) {
            item.name = name;
            item.remarks = remarks;
          }
        });
      } else {
        let element = {
          _id,
          price,
          name,
          total: price * qty,
          qty,
          remarks,
        };

        console.warn({ element });
        tempId.push(_id);
        temp.push(element);
        tempcustom.push(element);
      }
    }
    setSubItemId(tempId);
    setItems(temp);
    setCustomItems(tempcustom);
    setSubItemCount(temp.length);
  };

  const CustomItemQTYHandler = (_id, qty, price = 0) => {
    const tempId = [...subItemIds];
    const temp = [...Subitems];

    const selectedIndex = tempId.indexOf(_id);
    if (selectedIndex !== -1) {
      temp.map((item) => {
        if (item._id === _id) {
          item.qty = qty;
          item.total = item.price * qty;
        }
      });
    } else {
      let element = {
        _id,
        price,
        name: null,
        total: price * qty,
        qty,
      };
      tempId.push(_id);
      temp.push(element);
    }
    setSubItemId(tempId);
    setItems(temp);
    setSubItemCount(temp.length);
  };
  const CustomItemPriceHandler = (_id, price = 0) => {
    const tempId = [...subItemIds];
    const temp = [...Subitems];
    const selectedIndex = tempId.indexOf(_id);
    if (selectedIndex !== -1) {
      temp.map((item) => {
        if (item._id === _id) {
          item.price = price;
          item.total = item.price * item.qty;
        }
      });
    } else {
      let element = {
        _id,
        price,
        name: null,
        total: price * 1,
        qty: 1,
      };
      tempId.push(_id);
      temp.push(element);
    }
    setSubItemId(tempId);
    setItems(temp);
    setSubItemCount(temp.length);
  };

  const CustomItemRemarksHandler = (_id, remarks) => {
    const tempId = [...subItemIds];
    const temp = [...Subitems];

    const selectedIndex = tempId.indexOf(_id);
    if (selectedIndex !== -1) {
      temp.map((item) => {
        if (item._id === _id) {
          item.remarks = remarks;
        }
      });
    } else {
      let element = {
        _id,
        price: 0,
        name: null,
        total: 0,
        qty: 1,
        remarks,
      };
      tempId.push(_id);
      temp.push(element);
    }
    setSubItemId(tempId);
    setItems(temp);
    setSubItemCount(temp.length);
  };

  const handleCustomServiceInput = (name) => {
    let temp = isCustom ? [] : ShowServiceList;
    if (temp.length > 0) {
      setSubscriptionCount(0);
      temp.map((element, _id) => {
        element.subscriptions.map((subscriptions, __id) => {
          subscriptions.data.map((subscription, ___id) => {
            console.log({ subscription });
            subscription.name = name;
          });
        });
      });
    } else {
      setSubscriptionCount(0);
      setShowServiceList([
        {
          subscriptions: [
            {
              subscription: {
                name: 'One Time',
                package_divider: 1,
              },
              data: [
                {
                  _id: 'CS-1',
                  name: name ?? 'Custom Service',
                  price: 0,
                },
              ],
            },
          ],
        },
      ]);
    }
    setSubscriptionIds(['CS-1']);
    setSubscriptionCount(1);
  };

  const handleCustomServicePriceInput = (price) => {
    let temp = [];
    setSubscriptionCount(0);

    ShowServiceList.map((element, _id) => {
      element.subscriptions.map((subscriptions, __id) => {
        subscriptions.data.map((subscription, ___id) => {
          subscription.price = price;
        });
      });
      temp.push(element);
    });
    setSubscriptionCount(1);
    setShowServiceList(temp);
  };

  return (
    <>
      {/* CUSTOMER DETAIL SECTION */}
      <Col
        className="gutter-row"
        span={12}
        style={{ fontSize: '1.2rem', marginTop: '-1px;', marginBottom: '20px' }}
      >
        {translate('Customer Detail Section')}
      </Col>
      <Row gutter={[12, 0]} style={{ marginTop: '30px' }}>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="client"
            label={translate('Select Customer')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'client'}
              displayLabels={['name']}
              searchFields={'name,surname'}
              onChange={handleFirstDropdownChange}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            name="clientAddress"
            label={translate('Customer Address')}
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
            >
              {customerAddress?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            name="billingAddress"
            label={translate('Billing Address')}
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
            >
              {customerAddress.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            name="sendQuotationEmail"
            label={translate('Send WorkOrder Email')}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please select a Send Quotation Email:',
            //   },
            // ]}
          >
            <Radio.Group style={{ display: 'flex', gap: '20px' }}>
              <Radio value="1" selected>
                Yes
              </Radio>
              <Radio value="0">No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />

      {/* BASIC WORKORDER DETAILS */}

      <Col
        className="gutter-row"
        span={12}
        style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
      >
        {translate('Basic Work Order Details')}
      </Col>
      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '30px' }}>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="startDate"
            label={translate('Start Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="endDate"
            label={translate('Expire Date')}
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="startTime"
            label={translate('Start Time')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            name="expectedRequiredTime"
            label={translate('Expected Time Required')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '20px' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="salesPerson"
            label={translate('Sales Person')}
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
              onChange={(event) => setSelectedSalesPerson(event)}
            >
              {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <ContactHandler salesContactNumber={salesContactNumber} />
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item label={translate('Files')} name="Files">
            <Input type="file" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '20px' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="LeadWorker"
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
                <Select.Option key={option._id} value={option._id}>
                  {option.name}
                </Select.Option>
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
                <Select.Option key={option._id} value={option._id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />

      {/* WORKORDER SERVICES */}

      <Col
        className="gutter-row"
        span={12}
        style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
      >
        {translate('Work Order Services')}
      </Col>

      {/* ---------------NEW SERVICE CATEGORY------------ */}

      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="serviceCategory" label={translate('Service Category')}>
            <Select
              style={{
                width: '100%',
              }}
              onChange={getCategorySubscriptionHandler}
            >
              {serviceCategoryOptions?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="serviceList"
            label={translate('Service Name')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <Select
              style={{
                width: '100%',
              }}
              onSelect={(value) => {
                if (value === 'custom') {
                  // subscriptiononetime
                  IsActiveness(2);
                  IsActiveSelect(1);
                  setSubscriptionIds([]);
                } else {
                  setSubscriptionIds([]);
                  const selectedOption = ShowServiceList.find((option) => option._id === value);
                  if (selectedOption) {
                    setShowServiceId(selectedOption.subscriptions);
                    IsActiveSelect(2);
                    IsActiveness(1);
                  } else {
                    IsActiveness(0);
                    IsActiveSelect(0);
                  }
                }
              }}
            >
              <Select.Option key="custom" value="custom">
                Custom Service (One Time)
              </Select.Option>
              {ShowServiceList?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select> */}
            <Select
              style={{
                width: '100%',
              }}
              value={selectedOption}
              onChange={handleSelectChange}
              subscriptionOneTime
            >
              <Select.Option value="custom" onClick={() => setIscustomm(true)}>
                Custom Service (One Time)
              </Select.Option>

              {isFirstServiceCategorySelect &&
                ShowServiceList?.map((option) => (
                  <Select.Option key={option._id} value={option._id}>
                    {option.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* NEW CODE */}

      {activeness == 2 && (
        <>
          <Row gutter={[12, 12]} style={{ position: 'relative' }}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label={translate('Service Name')}
                name="ServiceName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                {/* <Input /> */}
                <Input
                  onKeyUp={(e) => {
                    handleCustomServiceInput(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label={translate('Service Price')}
                name="ServicePrice"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                {/* <Input /> */}
                <Input
                  onKeyUp={(e) => {
                    handleCustomServicePriceInput(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={24}>
              <Form.Item
                label={translate('Service Description')}
                name="ServiceDescription"
                rules={[]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>

          <Collapse
            accordion
            activeKey={accordionActiveKey}
            onChange={handleChange}
            style={{ marginTop: '5%' }}
          >
            <Collapse.Panel header="Custom Item" key="custom-item">
              <Row gutter={[12, 12]} style={{ position: 'relative' }} key="ci-11">
                <Col className="gutter-row" span={4}>
                  <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
                </Col>
                <Col className="gutter-row" span={4}>
                  <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                  <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
                </Col>
                <Col className="gutter-row" span={4}>
                  <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
                </Col>
                <Col className="gutter-row" span={6}>
                  <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
                </Col>
              </Row>
              <Form.List
                name="customItems"
                initialValue={[
                  {
                    itemName: '',
                    price: '',
                    quantity: 1, // Ensure initial quantity is set to 1
                    total: '',
                    remarks: '',
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields?.map((field, index) => (
                      <ItemRow
                        key={field.key}
                        remove={remove}
                        field={field}
                        current={current}
                        isFirstRow={index === 0}
                        onChange={{
                          CustomItemNameHandler,
                          CustomItemPriceHandler,
                          CustomItemQTYHandler,
                          CustomItemRemarksHandler,
                        }}
                      />
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        ref={addField}
                      >
                        {translate('Add field')}
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Collapse.Panel>
            {productList?.map((mainData, i) => (
              <Collapse.Panel header={mainData.name} key={mainData._id}>
                <div key={`${i}`}>
                  <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                    {/* Column headers */}
                  </Row>
                  {mainData.products?.map((data, index) => (
                    <Row gutter={[12, 12]} style={{ position: 'relative' }} key={`${data._id}`}>
                      <Col className="gutter-row mt-2">
                        <Checkbox
                          onChange={() => {
                            ItemHandler(data);
                          }}
                        />
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          name={['items', index, 'item']}
                          initialValue={data._id}
                          rules={[
                            {
                              validator: (_, value) => {
                                if (value || data.name) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Item name is required'));
                              },
                            },
                          ]}
                        >
                          <span>{data.name}</span>
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          // name={['items', index, 'price']}
                          initialValue={prices[data._id]}
                        >
                          <InputNumber
                            className="moneyInput"
                            onChange={updatePrice}
                            min={0}
                            controls={false}
                            addonAfter={
                              money.currency_position === 'after'
                                ? money.currency_symbol
                                : undefined
                            }
                            addonBefore={
                              money.currency_position === 'before'
                                ? money.currency_symbol
                                : undefined
                            }
                            value={prices[data._id]}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          // name={['items', index, 'quantity']}
                          initialValue={1}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            defaultValue={1}
                            value={data.quantity}
                            onChange={(value) => updateQuantity(data._id, value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item name={['items', index, 'total']} initialValue={totals[data._id]}>
                          <span style={{ marginLeft: '24%' }}>{totals[data._id]}</span>
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={7}>
                        <Form.Item
                        //  name={[`items`, `${index}`, 'remarks']}
                        >
                          <Input
                            placeholder=" Remarks for Workorder"
                            // defaultValue={data.description}
                            // onChange={(e) => {
                            //   const remarks = e.target.value;
                            //   ItemHandler(data, remarks);
                            // }}
                            onChange={(e) => handleRemarkChange(data._id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </div>
              </Collapse.Panel>
            ))}
          </Collapse>
        </>
      )}

      {activeSelect == 2 && (
        <>
          <Col className="gutter-row" span={24}>
            <Form.Item label={translate('Service Description')} name="ServiceDescription">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={[12, 12]}>
              <Col span={24}>
                <Table
                  columns={generateColumns()}
                  dataSource={generateTableData()}
                  pagination={false}
                />
              </Col>
            </Row>
          </Col>
          <Collapse
            accordion
            activeKey={accordionActiveKey}
            onChange={handleChange}
            style={{ marginTop: '5%' }}
          >
            <Collapse.Panel header="Custom Item" key="custom-item">
              <Row gutter={[12, 12]} style={{ position: 'relative' }} key="ci-11">
                <Col className="gutter-row" span={4}>
                  <p style={{ marginLeft: '6px' }}>{translate('Sub-Item')}</p>
                </Col>
                <Col className="gutter-row" span={4}>
                  <p style={{ marginLeft: '6px' }}>{translate('Price')}</p>
                </Col>
                <Col className="gutter-row" span={3}>
                  <p style={{ marginLeft: '6px' }}>{translate('Quantity')}</p>{' '}
                </Col>
                <Col className="gutter-row" span={4}>
                  <p style={{ marginLeft: '6px' }}>{translate('Total')}</p>
                </Col>
                <Col className="gutter-row" span={6}>
                  <p style={{ marginLeft: '6px' }}>{translate('Remarks')}</p>
                </Col>
              </Row>
              <Form.List
                name="customItems"
                initialValue={[
                  {
                    itemName: '',
                    price: '',
                    quantity: 1, // Ensure initial quantity is set to 1
                    total: '',
                    remarks: '',
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields?.map((field, index) => (
                      <ItemRow
                        key={field.key}
                        remove={remove}
                        field={field}
                        current={current}
                        isFirstRow={index === 0}
                        onChange={{
                          CustomItemNameHandler,
                          CustomItemPriceHandler,
                          CustomItemQTYHandler,
                          CustomItemRemarksHandler,
                        }}
                      />
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        ref={addField}
                      >
                        {translate('Add field')}
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Collapse.Panel>
            {productList?.map((mainData, i) => (
              <Collapse.Panel header={mainData.name} key={mainData._id}>
                <div key={`${i}`}>
                  <Row gutter={[12, 12]} style={{ position: 'relative' }} key={i}>
                    {/* Column headers */}
                  </Row>
                  {mainData.products?.map((data, index) => (
                    <Row gutter={[12, 12]} style={{ position: 'relative' }} key={`${data._id}`}>
                      <Col className="gutter-row mt-2">
                        <Checkbox
                          onChange={() => {
                            ItemHandler(data);
                          }}
                        />
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          name={['items', index, 'item']}
                          initialValue={data._id}
                          rules={[
                            {
                              validator: (_, value) => {
                                if (value || data.name) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Item name is required'));
                              },
                            },
                          ]}
                        >
                          <span>{data.name}</span>
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item
                          // name={['items', index, 'price']}
                          initialValue={prices[data._id]}
                        >
                          <InputNumber
                            className="moneyInput"
                            onChange={updatePrice}
                            min={0}
                            controls={false}
                            addonAfter={
                              money.currency_position === 'after'
                                ? money.currency_symbol
                                : undefined
                            }
                            addonBefore={
                              money.currency_position === 'before'
                                ? money.currency_symbol
                                : undefined
                            }
                            value={prices[data._id]}
                            readOnly
                          />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          // name={['items', index, 'quantity']}
                          initialValue={1}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            defaultValue={1}
                            value={data.quantity}
                            onChange={(value) => updateQuantity(data._id, value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <Form.Item name={['items', index, 'total']} initialValue={totals[data._id]}>
                          <span style={{ marginLeft: '24%' }}>{totals[data._id]}</span>
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={7}>
                        <Form.Item
                        //  name={[`items`, `${index}`, 'remarks']}
                        >
                          <Input
                            placeholder=" Remarks for Workorder"
                            // defaultValue={data.description}
                            // onChange={(e) => {
                            //   const remarks = e.target.value;
                            //   ItemHandler(data, remarks);
                            // }}
                            onChange={(e) => handleRemarkChange(data._id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                </div>
              </Collapse.Panel>
            ))}
          </Collapse>
        </>
      )}

      <Divider dashed />

      {/* WORKORDER BILLING DETAILS */}

      <Col
        className="gutter-row"
        span={12}
        style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
      >
        {translate('Work Order Billing Details')}
      </Col>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '30px' }}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="Adjustment"
            label={translate('Adjustment')}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please select a Adjustment Type:',
            //   },
            // ]}
          >
            <Radio.Group style={{ display: 'flex', gap: '20px' }}>
              {optionsss.map((option, index) => (
                <Radio key={index} value={option} onClick={() => IsActive(index + 2)}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          {active == 3 && (
            <Form.Item
              name="AdjustmentValue"
              rules={[
                {
                  // required: true,
                },
              ]}
            >
              <Input onChange={AdjustmentValueHandler} />
            </Form.Item>
          )}

          {active == 2 && (
            <Form.Item
              name="AdjustmentValue"
              rules={[
                {
                  // required: true,
                },
              ]}
            >
              <Input onChange={AdjustmentValueHandler} />
            </ Form.Item >
          )}
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item label={translate('Initial Remarks')} name="InitialRemarks">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 12]} style={{ position: 'relative', marginTop: '13px' }}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            name="discount"
            label={translate('Discount')}
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <InputNumber style={{ width: '100%' }} onChange={DiscountValueHandler} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={12}>
          <Form.Item
            name="PaymentMode"
            f
            label={translate('Payment Mode')}
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <Select
              style={{
                width: '100%',
              }}
            >
              {/* {SalesPerson?.map((option, index) => (
                <Select.Option key={option._id} value={option._id}>{option.name}</Select.Option>
              ))} */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {subscriptionIds.length > 0 && (
        <>
          <Divider dashed />
          <Col
            className="gutter-row"
            span={12}
            style={{ fontSize: '1.2rem', marginTop: '-9px;', marginBottom: '20px' }}
          >
            {translate('Selected WorkOrder Billing Details')}
          </Col>
          <table style={{ width: '100%', height: '220px', marginTop: '3%' }}>
            <tbody>
              <tr>
                <th
                  style={{
                    border: '0.2px solid #000',
                    background: 'rgb(248,248,255)',
                    color: 'rgb(31,31,31)',
                    padding: '10px',
                    borderRight: 'none',
                  }}
                >
                  <ul
                    className="calculatorFilled"
                    style={{
                      listStyle: 'none',
                      textAlign: 'start',
                      padding: '0',
                      lineHeight: '2.1',
                      borderRight: 'none',
                    }}
                  >
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                      Workorder For
                    </li>
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                      Per Workorder Cost
                    </li>
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Adjustment</li>
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                      Discount({discountValue}%)
                    </li>
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Subtotal</li>
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                      Tax ({tax?.taxValue || 0}%)
                    </li>
                    <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>Total</li>
                  </ul>
                </th>
                {CalculatorFilled()}
              </tr>
              {Subitems.length > 0 && (
                <>
                  <tr>{translate('Additional Service Items')}</tr>
                  {/* <tr>Additional Service Items</tr> */}
                  <tr>
                    <th
                      style={{
                        border: '0.2px solid #000',
                        background: 'rgb(248,248,255)',
                        color: 'rgb(31,31,31)',
                        padding: '10px',
                        borderRight: 'none',
                      }}
                    >
                      <ul
                        className="calculatorFilled"
                        style={{
                          listStyle: 'none',
                          textAlign: 'start',
                          padding: '0',
                          lineHeight: '2.1',
                        }}
                      >
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Service Items Included(per workorder)
                        </li>
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Item Total
                        </li>
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Discount({discountValue}%)
                        </li>
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Sub Total
                        </li>
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Tax ({tax?.taxValue || 0}%)
                        </li>
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Total Service Items Cost
                        </li>
                        <li style={{ borderBottom: '1px solid #fff', fontSize: '16px' }}>
                          Grand Total
                        </li>
                      </ul>
                    </th>
                    {CalculatorFilledItem()}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </>
      )}

      <div style={{ position: 'relative', width: ' 100%', float: 'right', marginTop: '23px' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
