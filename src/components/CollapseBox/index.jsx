import React from 'react';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';

let data = JSON.parse(localStorage.getItem('auth'))
let user = data.current

var role
var permissions
var isSAAS

const CollapseBoxButton = ({ onChange, title, config }) => {
  let { entity } = config;
  const [admin, setAdmin] = useState([]);
  const [authUser, setAuthUser] = useState({});
  useEffect(() => {
    data = JSON.parse(localStorage.getItem('auth'))
    user = data.current
    setAuthUser(user)
    setAdmin(user?.role_id)
  }, [])


  role = user?.role_id
  permissions = role?.permissions
  isSAAS = role?.is_saas

  let create = permissions?.[entity + '_create']
  let condition = create || isSAAS == true ? true : false

  console.log({ create, isSAAS })
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
