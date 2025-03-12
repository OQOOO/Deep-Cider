import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import ValidateLogic from './pages/ValidateLogic.jsx'
import Dashboard from './pages/Dashboard.jsx';
import logo from './assets/react.svg'

const componentsMap = {
  "dashboard": <Dashboard></Dashboard>,
  "validateLogic": <ValidateLogic/>
}



const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [
  {
    key: 'sub1', // 첫 번째 항목의 key
    icon: React.createElement(UserOutlined),
    label: '소개', // 첫 번째 서브 메뉴 이름
    children: [
      { key: 'dashboard', label: 'dashboard' }, // 첫 번째 서브 메뉴의 첫 번째 항목
      { key: '1-2', label: '2' } // 첫 번째 서브 메뉴의 두 번째 항목
    ]
  },
  {
    key: 'sub2', // 두 번째 항목의 key
    icon: React.createElement(LaptopOutlined),
    label: '인공지능 서비스', // 두 번째 서브 메뉴 이름
    children: [
      { key: 'validateLogic', label: '논리적 오류 찾기' }, // 두 번째 서브 메뉴의 첫 번째 항목
      { key: '2-2', label: 'test' }, // 두 번째 서브 메뉴의 두 번째 항목
    ]
  },
  {
    key: 'sub3', // 세 번째 항목의 key
    icon: React.createElement(NotificationOutlined),
    label: 'c', // 세 번째 서브 메뉴 이름
    children: [
      { key: '3-1', label: '6' } // 세 번째 서브 메뉴의 첫 번째 항목
    ]
  }
];

const App = () => {

  const [selectedComponentKey, setSelectedComponentKey] = useState("dashboard");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo">
          <img src={logo} alt="logo"></img>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            onClick={(e) => setSelectedComponentKey(e.key)}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            items={[
              {
                title: 'Deep Cider',
              },
              {
                title: 'List',
              },
              {
                title: selectedComponentKey,
              },
            ]}
            style={{
              margin: '16px 0',
            }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {
              componentsMap[selectedComponentKey]
            }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;