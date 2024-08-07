import { lazy, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Customer = lazy(() => import('@/pages/Customer'));
const Inventory = lazy(() => import('@/pages/Inventory'));
const Order = lazy(() => import('@/pages/Order'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));
const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));
const Quote = lazy(() => import('@/pages/Quote/index'));
const QuoteCreate = lazy(() => import('@/pages/Quote/QuoteCreate'));
const QuoteRead = lazy(() => import('@/pages/Quote/QuoteRead'));
const QuoteUpdate = lazy(() => import('@/pages/Quote/QuoteUpdate'));
const Payment = lazy(() => import('@/pages/Payment/index'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));
const Employee = lazy(() => import('@/pages/Employee'));
const Admin = lazy(() => import('@/pages/Admin'));
const Settings = lazy(() => import('@/pages/Settings/Settings'));
const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));
const Email = lazy(() => import('@/pages/Email/index'));
const EmailRead = lazy(() => import('@/pages/Email/EmailRead'));
const EmailUpdate = lazy(() => import('@/pages/Email/EmailUpdate'));
const AdvancedSettings = lazy(() => import('@/pages/AdvancedSettings'));
const Profile = lazy(() => import('@/pages/Profile'));
const Lead = lazy(() => import('@/pages/Lead/index'));
const Offer = lazy(() => import('@/pages/Offer/index'));
const OfferCreate = lazy(() => import('@/pages/Offer/OfferCreate'));
const OfferRead = lazy(() => import('@/pages/Offer/OfferRead'));
const OfferUpdate = lazy(() => import('@/pages/Offer/OfferUpdate'));
const ExpenseCategory = lazy(() => import('@/pages/ExpenseCategory'));
const Expense = lazy(() => import('@/pages/Expense'));
const ProductCategory = lazy(() => import('@/pages/ProductCategory'));
const Product = lazy(() => import('@/pages/Product'));
const Roles = lazy(() => import('@/pages/Roles'));
const RoleCreate = lazy(() => import('@/pages/Roles/RoleCreate'));
const RoleRead = lazy(() => import('@/pages/Roles/RoleRead'));
const RoleUpdate = lazy(() => import('@/pages/Roles/RoleUpdate'));
const People = lazy(() => import('@/pages/People'));
const Worker = lazy(() => import('@/pages/Worker'));
const Company = lazy(() => import('@/pages/Company'));
const CompanyCreate = lazy(() => import('@/pages/Company/CompanyCreate'));
const CompanyRead = lazy(() => import('@/pages/Company/CompanyRead'));
const CompanyUpdate = lazy(() => import('@/pages/Company/CompanyUpdate'));
const About = lazy(() => import('@/pages/About'));
const Verify = lazy(() => import('@/pages/Verify'));
const CompanyRoleSelector = lazy(() => import('@/pages/CompanyRoleSelector'));
const CustomerAddresses = lazy(() => import('@/pages/Address'));
const PricingModel = lazy(() => import('@/pages/PricingModel'));
const SubscriptionType = lazy(() => import('@/pages/SubscriptionType'));
const ServiceCategory = lazy(() => import('@/pages/ServiceCategory'));
const ServiceList = lazy(() => import('@/pages/ServiceList'));
const ServiceListCreate = lazy(() => import('@/pages/ServiceList/Create'));
const ServiceListRead = lazy(() => import('@/pages/ServiceList/Read'));
const ServiceListUpdate = lazy(() => import('@/pages/ServiceList/Update'));
const PublicHoliday = lazy(() => import('@/pages/PublicHoliday'));
const WorkOrder = lazy(() => import('@/pages/WorkOrder'));
const WorkCreate = lazy(() => import('@/pages/WorkOrder/WorkCreate'));
const WorkRead = lazy(() => import('@/pages/WorkOrder/WorkRead'));
const Contracts = lazy(() => import('@/pages/Contracts'));
const ContractCreate = lazy(() => import('@/pages/Contracts/ContractCreate'));
const ContractRead = lazy(() => import('@/pages/Contracts/ContractRead'));
const ConvertQt_To_Contract = lazy(() => import('@/pages/Convert_QT_to_Contract/CreateContract'));
// import { checkLoginDuration } from '../auth/auth.service';
import {  request } from '@/request';
import { useNavigate } from 'react-router-dom';


export default function AppRouter() {

  const navigate = useNavigate();

  const checkLoginDuration = () => {
  const loginTime = localStorage.getItem('loginTime');
  if (!loginTime) {
    return;
  }
  const currentTime = new Date().getTime();
  const timeElapsed = currentTime - loginTime;

  if (timeElapsed >= 86400000) {
     request.Loogout(navigate)
    // window.location.href = '/login';
  }
};

  useEffect(() => {
    const interval = setInterval(checkLoginDuration, 30000); // Check every minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  let element = useRoutes([
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/verify/*',
      element: <Verify />,
    },
    {
      path: '/role-select',
      element: <CompanyRoleSelector />,
    },
    {
      path: '/resetpassword/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/customer',
      element: <Customer />,
    },
    {
      path: '/people',
      element: <People />,
    },
    {
      path: '/worker',
      element: <Worker />,
    },
    {
      path: '/pricingmodel',
      element: <PricingModel />,
    },
    {
      path: '/publicholiday',
      element: <PublicHoliday />,
    },
    {
      path: '/subscriptiontype',
      element: <SubscriptionType />,
    },
    {
      path: '/servicecategory',
      element: <ServiceCategory />,
    },
    {
      path: '/servicelist',
      element: <ServiceList />,
    },
    {
      path: '/servicelist/create',
      element: <ServiceListCreate />,
    },
    {
      path: '/servicelist/update/:id',
      element: <ServiceListUpdate />,
    },
    {
      path: '/servicelist/read/:id',
      element: <ServiceListRead />,
    },
    {
      path: '/roles',
      element: <Roles />,
    },
    {
      path: '/roles/create',
      element: <RoleCreate />,
    },
    // {
    //   path: '/roles/read/:id',
    //   element: <RoleRead />,
    // },
    {
      path: '/roles/update/:id',
      element: <RoleUpdate />,
    },
    {
      path: '/company',
      element: <Company />,
    },
    {
      path: '/company/create',
      element: <CompanyCreate />,
    },
    {
      path: '/company/update/:id',
      element: <CompanyUpdate />,
    },
    {
      path: '/expenses',
      element: <Expense />,
    },
    {
      path: '/product',
      element: <Product />,
    },
    {
      path: '/category/product',
      element: <ProductCategory />,
    },
    {
      path: 'category/expenses',
      element: <ExpenseCategory />,
    },
    {
      path: '/inventory',
      element: <Inventory />,
    },
    {
      path: '/order',
      element: <Order />,
    },
    {
      path: '/invoice',
      element: <Invoice />,
    },
    {
      path: '/invoice/create',
      element: <InvoiceCreate />,
    },
    {
      path: '/invoice/read/:id',
      element: <InvoiceRead />,
    },
    {
      path: '/invoice/update/:id',
      element: <InvoiceUpdate />,
    },
    {
      path: '/invoice/pay/:id',
      element: <InvoiceRecordPayment />,
    },
    {
      path: '/quote',
      element: <Quote />,
    },
    {
      path: '/quote/create',
      element: <QuoteCreate />,
    },
    {
      path: '/quote/read/:id',
      element: <QuoteRead />,
    },
    {
      path: '/quote/update/:id',
      element: <QuoteUpdate />,
    },
    {
      path: '/payment',
      element: <Payment />,
    },
    {
      path: '/payment/read/:id',
      element: <PaymentRead />,
    },
    {
      path: '/payment/update/:id',
      element: <PaymentUpdate />,
    },
    {
      path: '/employee',
      element: <Employee />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },
    {
      path: '/payment/mode',
      element: <PaymentMode />,
    },
    {
      path: '/taxes',
      element: <Taxes />,
    },
    {
      path: '/email',
      element: <Email />,
    },
    {
      path: '/email/read/:id',
      element: <EmailRead />,
    },
    {
      path: '/email/update/:id',
      element: <EmailUpdate />,
    },

    {
      path: '/settings/advanced',
      element: <AdvancedSettings />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/lead',
      element: <Lead />,
    },
    {
      path: '/offer',
      element: <Offer />,
    },
    {
      path: '/offer/create',
      element: <OfferCreate />,
    },
    {
      path: '/offer/read/:id',
      element: <OfferRead />,
    },
    {
      path: '/offer/update/:id',
      element: <OfferUpdate />,
    },
    {
      path: '/customer/address/:id',
      element: <CustomerAddresses />,
    },
    {
      path: '/workorder',
      element: <WorkOrder />,
    },
    {
      path: '/workorder/create',
      element: <WorkCreate />,
    },
    {
      path: '/workorder/read/:id',
      element: <WorkRead />,
    },
    {
      path: '/contract',
      element: <Contracts />,
    },
    {
      path: '/contract/create',
      element: <ContractCreate />,
    },
    {
      path: '/contract/read/:id',
      element: <ContractRead />,
    },
    {
      path: '/quote/edit/:id',
      element: <ConvertQt_To_Contract/>,
    },
    

    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return element;
}
