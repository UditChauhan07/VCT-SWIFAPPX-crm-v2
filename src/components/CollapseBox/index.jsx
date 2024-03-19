import React from 'react';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/config/serverApiConfig';
let user = JSON.parse(window.localStorage.getItem('auth'))
let user_id = user.current._id



const CollapseBoxButton = ({ onChange, title, config }) => {
  let { entity } = config;
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    GetAdminDataHandler().then((res) => {
      // console.log('result data colllll --- ', res);
      setAdmin(res.result)
    }).catch((err) => {
      console.error({ err });
    })
  }, [])
  const GetAdminDataHandler = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let response = await fetch(`${API_BASE_URL}admin/read/${user_id}`, {
      method: "GET",
      headers: headersList
    });

    let data = JSON.parse(await response.text());
    return data
  }

  // console.log({ admin });
  let role = admin?.role_id
  // console.log({ role });
  let adminLevel = role?.admin_level
  let permissions = role?.permissions
  let isSAAS = role?.is_saas

  let create = permissions?.[entity + '_create']
  let condition = create || isSAAS == true ? true : false
  return (
    <div>
      {permissions?.[entity + '_create'] || isSAAS == true ?
        <div className="collapseBoxHeader" onClick={onChange}>
          {title}
        </div>
        : ""}
    </div>
  );

};

const TopCollapseBox = ({ isOpen, children, config }) => {
  const show = isOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return (
    <div className="TopCollapseBox bbb">
      <div style={show}>
        <Row>
          <Col span={24}> {children}</Col>
        </Row>
      </div>
    </div>
  );
};

const BottomCollapseBox = ({ isOpen, children }) => {
  const show = isOpen ? { display: 'none', opacity: 0 } : { display: 'block', opacity: 1 };
  return (
    <div className="BottomCollapseBox">
      <div style={show}>
        <Row>
          <Col span={24}> {children}</Col>
        </Row>
      </div>
    </div>
  );
};

export default function CollapseBox({
  topContent,
  bottomContent,
  buttonTitle,
  isCollapsed,
  onCollapse,
}) {
  const collapsed = isCollapsed ? 'collapsed' : '';
  let config = topContent.props.config
  return (
    <>
      <TopCollapseBox isOpen={isCollapsed}>{topContent}</TopCollapseBox>
      <div className={'collapseBox ' + collapsed}>
        <CollapseBoxButton title={buttonTitle} onChange={onCollapse} config={config} />
        <div className="whiteBg"></div>
        <BottomCollapseBox isOpen={isCollapsed}>{bottomContent}</BottomCollapseBox>
      </div>
    </>
  );
}
