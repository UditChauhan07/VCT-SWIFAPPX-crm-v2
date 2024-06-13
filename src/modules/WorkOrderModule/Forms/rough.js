useEffect(() => {
  const handleoneTimeSubscription = async () => {
    try {
      const response = await request.getSubscriptiononetime();
      if (response.success) {
        setsubscriptiononetime(response.result._id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  handleoneTimeSubscription();
}, []);


const [subscriptiononetime, setsubscriptiononetime] = useState([]);




// RADIO CHANGER 

const handleRadioChange = (e, id) => {
  // let temp = subscriptionIds;
  // if (temp.includes(id)) {
  //   temp.slice(temp.indexOf(id))
  // } else {
  //   temp.push(id)
  // }
  setSubscriptionIds(id);
  // console.log(id)
  localStorage.setItem('WO-RadioId', id);

  //  let SubModule = id;

  // setSubscriptionIds(temp);
  // setSubscriptionIds(temp);
  setSubscriptionCount(subscriptionIds.length);

  const { value } = e.target;
  setSubId((prevState) => {
    const updatedState = { ...prevState };
    Object.keys(updatedState).forEach((key) => {
      if (key !== id) {
        updatedState[key] = undefined;
      }
    });
    updatedState[id] = value;
    return updatedState;
  });

  for (const subscriptionObj of ShowServiceId) {
    for (const dataObj of subscriptionObj.data) {
      if (dataObj._id === id) {
        return localStorage.setItem('WorkOrderSubId', subscriptionObj.subscription._id);
        seTisMainid(subscriptionObj.subscription._id);
      }
    }
  }
  return null;
};