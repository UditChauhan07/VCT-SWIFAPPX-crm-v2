import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, Dropdown, Layout } from 'antd';

// import Notifications from '@/components/Notification';

import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import { checkImage, request } from '@/request';
   
import { selectCurrentAdmin } from '@/redux/auth/selectors';

import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '@/config/serverApiConfig';

import useLanguage from '@/locale/useLanguage';
import SelectLanguage from '@/components/SelectLanguage';

import UpgradeButton from './UpgradeButton';

export default function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const { Header } = Layout;
  const navigate = useNavigate();

  const translate = useLanguage();

  const [hasPhotoprofile, setHasPhotoprofile] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (currentAdmin?.photo) {
        const result = await checkImage(BASE_URL + currentAdmin?.photo);
        setHasPhotoprofile(result);
      }
    }
    fetchData();
    return () => {
      return false;
    };
  }, []);

  const ProfileDropdown = () => {
  
    return (
      <div className="profileDropdown" onClick={() => navigate('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={hasPhotoprofile ? BASE_URL + currentAdmin?.photo : null}
          style={{ color: '#f56a00', backgroundColor: !hasPhotoprofile ? '#fde3cf' : '#f9fafc' }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p>{currentAdmin?.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }) => {
    return <span style={{}}>{text}</span>;
  };

  const settings = {
    method: 'POST',
  
  };

const Loogout = async () =>{

  const res = await fetch(`http://localhost:8001/api/logout`, settings )
   console.log(res)
  localStorage.clear();
  navigate('/logout')
}

  const items = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <SettingOutlined  style={{ width: "23px" }}/>,
      key: 'settingProfile',
      label: (
        <Link to={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    {
      icon: <SettingOutlined />,
      key: 'settingApp',
      label: <Link to={'/settings'}>{translate('app_settings')}</Link>,
    },

    {
      type: 'divider',
    },

    {
      icon: <LogoutOutlined />,
      key: 'logout',
      // label: <Link to={'/logout'}>{translate('logout')}</Link>,
      label:  translate('logout') ,
      onClick: () => Loogout() 
    },
  ];
  return (
    <Header
      style={{
        padding: '20px',
        background: '#f9fafc',
        display: ' flex',
        flexDirection: ' row-reverse',
        justifyContent: ' flex-start',
        gap: ' 15px',
      //  width:"100%",
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
        placement="bottomRight"
        stye={{ width: '280px', float: 'right'  }}
      >
        {/* <Badge dot> */}
        <Avatar
          className="last"
          src={hasPhotoprofile ? BASE_URL + currentAdmin?.photo : null}
          style={{
            color: '#f56a00',
            backgroundColor: !hasPhotoprofile ? '#fde3cf' : '#f9fafc',
            float: 'right',
            cursor: 'pointer',
          }}
          size="large"
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {/* </Badge> */}
      </Dropdown>

      <UpgradeButton />

      <SelectLanguage />
    </Header>
  );
}

//  console.log(
//    '🚀 Welcome to IDURAR ERP CRM! Did you know that we also offer commercial customization services? Contact us at hello@idurarapp.com for more information.'
//  );
